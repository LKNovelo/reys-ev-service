# Infrastructure as Code: Terraform vs CloudFormation vs Pulumi

Infrastructure as Code (IaC) treats infrastructure like software: version-controlled, reviewed, tested, deployed through pipelines. Managing infrastructure through the AWS console is now professionally indefensible—you lose history, introduce drift, and can't reproduce environments.

The three leading IaC tools differ fundamentally: Terraform is declarative and cloud-agnostic; CloudFormation is AWS-native and verbose; Pulumi lets you write infrastructure in general-purpose languages. Choosing wrong locks you into years of technical debt.

## Terraform: Declarative and Multi-Cloud

Terraform uses HCL (HashiCorp Configuration Language) to describe desired infrastructure. You write *what* you want; Terraform figures out *how* to build it.

```hcl
# Example: Create an S3 bucket and DynamoDB table
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "app_data" {
  bucket = "my-app-data-bucket-${data.aws_caller_identity.current.account_id}"
}

resource "aws_s3_bucket_versioning" "app_data" {
  bucket = aws_s3_bucket.app_data.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "users" {
  name           = "users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "user_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

data "aws_caller_identity" "current" {}

output "bucket_name" {
  value = aws_s3_bucket.app_data.id
}
```

**Advantages:**
- Cloud-agnostic (same syntax for AWS, GCP, Azure, etc.)
- Declarative (you describe the desired state; Terraform handles diff)
- Mature ecosystem (thousands of providers)
- State file enables drift detection (infrastructure diverged from code?)
- Works well for multi-cloud deployments

**Disadvantages:**
- State file must be managed carefully (should live in S3/remote backend, not locally)
- HCL learning curve (not a familiar programming language)
- Complex scenarios require advanced patterns (modules, locals, conditionals)
- Plan output can be hard to read for large changes

**When to use:** Multi-cloud strategy, teams wanting language independence, large infrastructure projects.

## CloudFormation: AWS-Native and Verbose

CloudFormation is AWS's native IaC tool. You write YAML/JSON describing AWS resources; CloudFormation creates them. CloudFormation-only resources get support faster than Terraform providers.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Create S3 bucket and DynamoDB table'

Resources:
  AppDataBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub 'my-app-data-bucket-${AWS::AccountId}'
      VersioningConfiguration:
        Status: Enabled
      Tags:
        - Key: Environment
          Value: production

  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: users
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: user_id
          AttributeType: S
      KeySchema:
        - AttributeName: user_id
          KeyType: HASH
      Tags:
        - Key: Environment
          Value: production

Outputs:
  BucketName:
    Value: !Ref AppDataBucket
```

**Advantages:**
- Native AWS support (every new AWS service available immediately)
- Stack dependencies and outputs (referencing other stacks)
- Change sets let you preview changes before applying
- No state file to manage (AWS manages state)
- Better for AWS-only teams

**Disadvantages:**
- YAML/JSON is verbose (more lines of code than Terraform)
- AWS-only (can't use for GCP or Azure)
- Learning curve (CloudFormation-specific concepts, intrinsic functions)
- Harder to test (no local simulation)

**When to use:** AWS-only shops, teams leveraging CloudFormation-only features, regulatory requirements for AWS-managed state.

## Pulumi: Programming Language Freedom

Pulumi lets you write infrastructure in Python, Go, TypeScript, C#, Java, or YAML. Use your language of choice instead of learning HCL.

```python
import pulumi
import pulumi_aws as aws

# Create S3 bucket
app_data_bucket = aws.s3.Bucket(
    "app-data",
    bucket=f"my-app-data-bucket-{aws.get_caller_identity_output().account_id}",
    versioning=aws.s3.BucketVersioningArgs(
        enabled=True,
    ),
    tags={
        "Environment": "production",
        "ManagedBy": "pulumi",
    }
)

# Create DynamoDB table
users_table = aws.dynamodb.Table(
    "users",
    name="users",
    billing_mode="PAY_PER_REQUEST",
    hash_key="user_id",
    attributes=[
        aws.dynamodb.TableAttributeArgs(
            name="user_id",
            type="S",
        ),
    ],
    tags={
        "Environment": "production",
    }
)

# Export outputs
pulumi.export("bucket_name", app_data_bucket.id)
```

**Advantages:**
- Write infrastructure in your programming language (loop, conditionals, functions)
- Cloud-agnostic like Terraform (supports AWS, GCP, Azure, etc.)
- Easier testing (code-based testing with standard test frameworks)
- Powerful abstractions (classes, reusable components)
- Rich IDE support (autocomplete, type checking)

**Disadvantages:**
- Smaller ecosystem than Terraform (fewer community providers)
- Learning curve (different paradigm: imperative instead of declarative)
- Requires Pulumi CLI and account (commercial offering, but open-source core)
- Less familiar to ops teams trained on declarative IaC

**When to use:** Teams with strong programming backgrounds, complex infrastructure logic, multi-cloud strategies, need for sophisticated testing.

## Comparison at a Glance

| Aspect | Terraform | CloudFormation | Pulumi |
|--------|-----------|----------------|--------|
| **Language** | HCL (declarative) | YAML/JSON (declarative) | Python, Go, TypeScript, etc. |
| **Cloud Support** | Multi-cloud | AWS-only | Multi-cloud |
| **Learning Curve** | Moderate | Moderate | Steep (requires programming) |
| **State Management** | Manual (S3/remote backend) | AWS-managed | Pulumi-managed or self-hosted |
| **Testing** | Limited | Limited | Rich (use standard test frameworks) |
| **Ecosystem** | Largest (thousands of providers) | Good (AWS-native resources) | Growing (good coverage for major clouds) |
| **Best For** | Multi-cloud, large infrastructure | AWS-only, CloudFormation-specific features | Programmers, complex logic |

## Practical Patterns

### State Management (Terraform)

Never store state files locally. Use remote backends:

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

This prevents team members from stepping on each other's changes and protects sensitive data in state files (encrypted at rest, access controlled).

### Modular Infrastructure (Terraform)

Write reusable modules:

```hcl
# modules/vpc/main.tf
variable "cidr_block" {
  type = string
}

resource "aws_vpc" "main" {
  cidr_block = var.cidr_block

  tags = {
    Name = "main-vpc"
  }
}

output "vpc_id" {
  value = aws_vpc.main.id
}

# main.tf
module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
}

module "vpc_prod" {
  source = "./modules/vpc"
  cidr_block = "10.1.0.0/16"
}
```

Modules enable reuse and reduce code duplication.

### Testing Infrastructure (Pulumi)

Pulumi enables tests in your language:

```python
# __main__.py
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket("test-bucket", versioning={...})
pulumi.export("bucket_name", bucket.id)

# test_infrastructure.py
import pulumi
from pulumi.automation import select_stack, create_stack, Stack
import tempfile
import os

def test_bucket_versioning():
    stack = select_stack("test-stack")
    with stack.up() as up_result:
        assert up_result.outputs["bucket_name"].value is not None
```

You can test infrastructure before deploying, catch errors early.

## Avoiding Common Mistakes

**Mistake:** Storing state files locally or in git.
**Fix:** Use remote backends (S3, Terraform Cloud, Pulumi Service).

**Mistake:** Making infrastructure changes manually after deployment.
**Fix:** All changes must go through code review and IaC deployment. Enable drift detection.

**Mistake:** Huge monolithic configuration files.
**Fix:** Break into modules (Terraform/Pulumi) or nested stacks (CloudFormation).

**Mistake:** No version control for infrastructure.
**Fix:** Commit all IaC to git, tag releases, track history.

**Mistake:** No testing before deployment.
**Fix:** Plan/preview changes, test in dev environment first, use automated testing (especially with Pulumi).

## Implementation Checklist

- [ ] **State management:** Remote backend configured (S3 for Terraform, Pulumi Cloud, etc.)
- [ ] **Version control:** All IaC committed to git with meaningful commit messages
- [ ] **Code organization:** Modules/components for reusability
- [ ] **Drift detection:** Run `terraform plan` / `pulumi up --preview-only` regularly
- [ ] **Secrets management:** Sensitive values in secret manager, not in code
- [ ] **CI/CD integration:** Infrastructure deploys through pipeline, not manually
- [ ] **Testing:** Plan/preview changes before applying (Pulumi: write actual tests)
- [ ] **Documentation:** README explaining how to deploy and modify infrastructure

## Next Steps

Choose one tool for your next project. If you're AWS-only and want simplicity, start with [CloudFormation](https://aws.amazon.com/cloudformation/). If you want multi-cloud or team standardization, go with [Terraform](https://www.terraform.io/)—clone the [Terraform AWS examples repository](https://github.com/hashicorp/terraform-aws-examples) and follow along with a basic VPC + EC2 setup. If your team is strong in programming, try [Pulumi](https://www.pulumi.com/) in Python—the interactive tutorial walks you through deploying a full application. Regardless of choice, set up a remote state backend immediately and enforce all infrastructure changes through code review.
