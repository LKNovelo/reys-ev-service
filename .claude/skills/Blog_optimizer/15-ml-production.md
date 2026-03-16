# Machine Learning in Production: From Model to Serving

## Promise
Training a model that scores 95% accuracy in Jupyter is easy. Getting that model into production without breaking everything is hard. Teams deploy models and watch them slowly degrade (data drift), fail silently (wrong predictions), or crash under load (unoptimized inference). The result: wasted ML investment and lost user trust. This post teaches you the complete pipeline from model training to monitoring: how to version models, serve them at scale, detect when they break, and rollback instantly. You'll leave with a production-ready ML system architecture and know exactly what can go wrong.

## Why This Matters

ML in production is different from ML in notebooks. Notebooks assume static data, perfect inputs, and unlimited computation. Production has noisy data, edge cases, and strict latency budgets. Teams that ignore this difference ship broken models. Teams that design for production's constraints ship models that stay accurate and serve millions of requests reliably.

## 1. The ML Production Pipeline (End-to-End)

```
Data → Training → Validation → Deployment → Serving → Monitoring
                              ↓
                      (Rollback if needed)
```

**Phase 1: Data Preparation**
```python
import pandas as pd
from sklearn.model_selection import train_test_split

# Load raw data
data = pd.read_csv('transactions.csv')

# Clean and validate
data = data.dropna()  # Remove nulls
assert data['amount'] > 0, "Invalid transaction amount"
assert len(data) > 1000, "Not enough training data"

# Split (60% train, 20% val, 20% test)
train, temp = train_test_split(data, test_size=0.4, random_state=42)
val, test = train_test_split(temp, test_size=0.5, random_state=42)

print(f"Train: {len(train)}, Val: {len(val)}, Test: {len(test)}")
```

**Phase 2: Model Training**
```python
from sklearn.ensemble import RandomForestClassifier
import joblib

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(train[features], train['label'])

# Save model for later
joblib.dump(model, 'model_v1.pkl')
```

**Phase 3: Validation**
```python
from sklearn.metrics import accuracy_score, precision_score, recall_score

predictions = model.predict(val[features])
accuracy = accuracy_score(val['label'], predictions)
precision = precision_score(val['label'], predictions)
recall = recall_score(val['label'], predictions)

print(f"Validation - Accuracy: {accuracy:.3f}, Precision: {precision:.3f}, Recall: {recall:.3f}")

# Only deploy if metrics meet thresholds
assert accuracy > 0.90, "Accuracy too low"
assert precision > 0.85, "Precision too low"
```

**Phase 4-5: Deployment and Serving (See Section 2)**

**Phase 6: Monitoring (See Section 3)**

## 2. Model Serving at Scale

**Option 1: Batch Inference (Offline Predictions)**
Good for: Non-urgent predictions, one-time scoring

```python
# Score all users' risk profiles once per day
import joblib
import pandas as pd

model = joblib.load('model_v1.pkl')
users = pd.read_sql("SELECT * FROM users", db)

predictions = model.predict(users[features])

# Save results
results_df = pd.DataFrame({
    'user_id': users['id'],
    'risk_score': predictions
})
results_df.to_sql('risk_scores', db, if_exists='replace')
```

**Option 2: Real-Time API (Online Predictions)**
Good for: Per-request predictions, low-latency requirements

```python
from flask import Flask, request
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('model_v1.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Extract features
    features = np.array([[
        data['amount'],
        data['user_age'],
        data['days_customer']
    ]])

    prediction = model.predict(features)[0]
    confidence = model.predict_proba(features)[0].max()

    return {
        'prediction': int(prediction),
        'confidence': float(confidence)
    }

if __name__ == '__main__':
    app.run(port=5000)
```

**Option 3: Streaming Inference**
Good for: Real-time data processing, high-throughput

```python
# Kafka consumer → Model → Kafka producer
from kafka import KafkaConsumer, KafkaProducer
import joblib
import json

model = joblib.load('model_v1.pkl')

consumer = KafkaConsumer('transactions', bootstrap_servers=['localhost:9092'])
producer = KafkaProducer(bootstrap_servers=['localhost:9092'])

for message in consumer:
    transaction = json.loads(message.value)

    # Predict
    features = [[transaction['amount'], transaction['age']]]
    prediction = model.predict(features)[0]

    # Publish result
    producer.send('predictions', json.dumps({
        'transaction_id': transaction['id'],
        'prediction': int(prediction)
    }).encode())
```

**Optimization: Model Quantization**

Raw model is slow and memory-intensive. Compress it.

```python
import onnx
import onnxruntime as rt
from skl2onnx import convert_sklearn

# Convert to ONNX (optimized format)
onnx_model = convert_sklearn(model, initial_types=[
    ('float_input', FloatTensorType([None, len(features)]))
])
onnx.save_model(onnx_model, 'model_v1.onnx')

# Load and use (10x faster!)
sess = rt.InferenceSession('model_v1.onnx')
input_name = sess.get_inputs()[0].name
output_name = sess.get_outputs()[0].name

result = sess.run([output_name], {input_name: features.astype(np.float32)})
```

## 3. Model Monitoring: Detecting Drift

**The Problem: Data Drift**
The data in production differs from training data. Model accuracy slowly degrades.

```
Training data: User ages 18-65, average $500 transactions
Production data (Month 1): User ages 18-65, average $520 transactions (similar)
Production data (Month 6): User ages 16-75, average $2000 transactions
                           Model accuracy: 92% → 78% (drift!)
```

**Solution: Monitor Input and Output Distributions**

```python
import numpy as np
from scipy import stats

# Training data statistics
train_mean = np.mean(training_data['amount'])
train_std = np.std(training_data['amount'])

# Monitor production data
production_batch = get_recent_predictions(hours=24)
prod_mean = np.mean(production_batch['amount'])
prod_std = np.std(production_batch['amount'])

# Kolmogorov-Smirnov test: Do distributions match?
statistic, p_value = stats.ks_2samp(training_data['amount'], production_batch['amount'])

if p_value < 0.05:  # Distributions are different
    alert("Data drift detected: Input distribution changed")
    logger.warning(f"Train mean: {train_mean:.2f}, Prod mean: {prod_mean:.2f}")
```

**Monitor Prediction Drift (Is the Model Still Accurate?)**

```python
# Periodically score predictions against ground truth
from sklearn.metrics import accuracy_score

# Get recent predictions
recent_preds = pd.read_sql("""
    SELECT prediction, true_label FROM predictions
    WHERE created_at > NOW() - INTERVAL 7 DAY
""", db)

accuracy = accuracy_score(recent_preds['true_label'], recent_preds['prediction'])

# Track over time
metrics = pd.read_sql("SELECT date, accuracy FROM model_metrics", db)

if metrics['accuracy'].iloc[-1] < metrics['accuracy'].iloc[-30] - 0.05:
    alert("Model accuracy degraded 5% in 30 days")
```

## 4. Model Versioning and Rollback

**Version Everything**

```
models/
├── model_v1.pkl        # Initial production model (Feb 1)
├── model_v2.pkl        # Improved model (Feb 15)
├── model_v3.pkl        # Latest model (Mar 1)
└── metadata.json       # Which version is live?

metadata.json:
{
  "current_version": "v3",
  "previous_version": "v2",
  "v3": {
    "accuracy": 0.945,
    "precision": 0.920,
    "recall": 0.935,
    "deployed_date": "2024-03-01",
    "commit_hash": "abc123def456"
  },
  "v2": {
    "accuracy": 0.935,
    "precision": 0.910,
    "recall": 0.925,
    "deployed_date": "2024-02-15"
  }
}
```

**Instant Rollback (Feature Flag)**

```python
import json

# Load metadata
with open('models/metadata.json') as f:
    config = json.load(f)

current_version = config['current_version']
model = joblib.load(f'models/model_{current_version}.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Uses whatever version is in metadata.json
    # Change metadata.json instantly to rollback
    return model.predict(request.json)

# To rollback:
# 1. Change metadata.json: current_version = "v2"
# 2. All new requests use v2
# 3. No code changes, no restart needed
```

## 5. Production Checklist: What Can Go Wrong

| Issue | Detection | Solution |
|-------|-----------|----------|
| **Wrong Inputs** | Model gets NaN, negative, out-of-range values | Validate inputs before prediction; reject invalid requests |
| **Model Not Loaded** | FileNotFoundError on startup | Use health checks; ensure model files exist before serving |
| **Prediction Latency** | p99 latency > SLA | Profile inference; use quantization; cache predictions |
| **Memory Leak** | RAM usage grows over time | Monitor memory; reload model periodically; use connection pooling |
| **Data Drift** | Accuracy slowly degrading | Monitor input distributions; alert if drift detected |
| **Batch vs Real-Time Mismatch** | Batch predictions score differently than real-time | Use same preprocessing code; version preprocessing |
| **Dependency Failure** | External API down, model can't fetch features | Use fallback; cache features; timeout external calls |

**Example: Defensive Serving Code**

```python
from functools import lru_cache
import logging
import time

logger = logging.getLogger(__name__)

class PredictionService:
    def __init__(self, model_path):
        try:
            self.model = joblib.load(model_path)
            self.loaded_at = time.time()
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise

    def predict(self, features):
        # Validate inputs
        if not all(isinstance(f, (int, float)) for f in features):
            raise ValueError("All features must be numeric")

        if any(np.isnan(f) for f in features):
            raise ValueError("Features contain NaN")

        # Timeout prediction (don't hang)
        try:
            prediction = self.model.predict([features])
        except Exception as e:
            logger.error(f"Prediction failed: {e}")
            raise

        # Check sanity
        if not isinstance(prediction[0], (int, float)):
            raise ValueError(f"Invalid prediction: {prediction}")

        return prediction[0]

# Health check
@app.route('/health')
def health():
    try:
        # Test prediction
        test_features = [0.0] * num_features
        service.predict(test_features)
        return {'status': 'healthy'}, 200
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {'status': 'unhealthy', 'error': str(e)}, 503
```

## 6. Continuous Improvement: Retraining

**Monthly Retraining Loop**

```
Month 1:
- Train model on Jan data
- Validate on Jan data
- Deploy to production

Month 2:
- Collect Jan + Feb data
- Retrain on new data
- Compare Feb validation accuracy to previous model
- If better: deploy
- If worse: keep current model, investigate why

Month 3:
- Collect Jan + Feb + Mar data
- Repeat
```

**Automated Retraining Pipeline**

```python
# Daily job: Retrain if metrics degrade
import subprocess
import pandas as pd

# Get recent accuracy
recent_accuracy = get_model_accuracy(days=7)
baseline_accuracy = get_model_accuracy(days=30)  # Baseline

if recent_accuracy < baseline_accuracy - 0.03:  # 3% drop
    logger.info("Accuracy degraded. Retraining...")

    # 1. Collect new data
    new_data = pd.read_sql("""
        SELECT * FROM training_data
        WHERE created_at > NOW() - INTERVAL 90 DAY
    """, db)

    # 2. Retrain
    new_model = train_model(new_data)

    # 3. Validate
    new_accuracy = validate_model(new_model)

    # 4. Compare
    if new_accuracy > recent_accuracy:
        logger.info(f"New model better: {new_accuracy:.3f} > {recent_accuracy:.3f}")
        # Deploy (see Section 4)
    else:
        logger.warning("New model not better. Keeping current.")
```

## Concrete Action Steps

1. **This week:** Document your current model. Where is it trained? How is it served? What happens when it breaks?
2. **Next week:** Add input validation to your serving code. Reject NaN, out-of-range, or invalid inputs.
3. **Week 3:** Implement monitoring. Track accuracy, data drift, prediction latency.
4. **Week 4:** Version your model. Store metadata about which version is live.
5. **Month 2:** Set up rollback capability (feature flag or configuration file).
6. **Month 3:** Implement automated retraining. Alert when accuracy degrades.

Models aren't done when they ship. They require ongoing monitoring and retraining. Build the infrastructure now, before it becomes a crisis.

## Resources

- [MLOps Best Practices](https://ml-ops.systems/)
- [TensorFlow Serving](https://www.tensorflow.org/tfx/guide/serving)
- [Model Monitoring and Observability](https://www.evidentlyai.com/)
- [Feature Drift Detection](https://github.com/evidentlyai/evidently)
- [ONNX Model Format](https://onnx.ai/)
- [Continuous Integration for ML](https://github.com/iterative/dvc)
- [Model Registry (MLflow)](https://mlflow.org/)
