'use client';

import { useState } from 'react';
import CTAButton from '@/components/CTAButton';

const contactInfo = [
  { icon: '📞', label: 'Phone', value: '(619) 555-0182' },
  { icon: '✉️', label: 'Email', value: 'rey@reysevservice.com' },
  { icon: '📍', label: 'Service Area', value: 'San Diego County, CA' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 7am – 6pm' },
];

const styles = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' },
  header: { textAlign: 'center', marginBottom: '3.5rem' },
  eyebrow: {
    display: 'inline-block',
    color: '#22c55e',
    fontWeight: 600,
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.75rem',
  },
  title: { fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' },
  subtitle: { color: '#94a3b8', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
    alignItems: 'start',
  },
  form: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formTitle: { fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.875rem', fontWeight: 600, color: '#cbd5e1' },
  input: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    padding: '0.65rem 0.875rem',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
  },
  textarea: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    padding: '0.65rem 0.875rem',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    minHeight: '130px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  success: {
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '0.5rem',
    padding: '0.875rem 1rem',
    color: '#22c55e',
    fontSize: '0.9rem',
  },
  infoCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
  },
  infoTitle: { fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' },
  infoItem: {
    display: 'flex',
    gap: '0.875rem',
    alignItems: 'flex-start',
    marginBottom: '1.25rem',
  },
  infoIcon: { fontSize: '1.25rem', lineHeight: 1.4 },
  infoLabel: { fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem' },
  infoValue: { fontSize: '0.95rem', color: '#f8fafc' },
  note: {
    marginTop: '2rem',
    padding: '1rem',
    background: 'rgba(34,197,94,0.08)',
    border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: '0.5rem',
    color: '#cbd5e1',
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={styles.eyebrow}>Get In Touch</span>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Ready to go electric? Reach out for a free quote or to schedule a consultation.
        </p>
      </div>

      <div style={styles.layout}>
        {/* Form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.formTitle}>Send a Message</h2>

          {submitted && (
            <div style={styles.success}>
              ✅ Thanks! We'll be in touch within one business day.
            </div>
          )}

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="name">Full Name</label>
            <input
              style={styles.input}
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <input
              style={styles.input}
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="phone">Phone Number</label>
            <input
              style={styles.input}
              id="phone"
              name="phone"
              type="tel"
              placeholder="(619) 555-0100"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="message">Message</label>
            <textarea
              style={styles.textarea}
              id="message"
              name="message"
              required
              placeholder="Tell us about your EV charging needs..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <CTAButton onClick={handleSubmit}>Send Message</CTAButton>
        </form>

        {/* Contact Info */}
        <div style={styles.infoCard}>
          <h2 style={styles.infoTitle}>Contact Information</h2>
          {contactInfo.map((c) => (
            <div key={c.label} style={styles.infoItem}>
              <span style={styles.infoIcon}>{c.icon}</span>
              <div>
                <p style={styles.infoLabel}>{c.label}</p>
                <p style={styles.infoValue}>{c.value}</p>
              </div>
            </div>
          ))}
          <div style={styles.note}>
            🌿 We serve all of San Diego County including Chula Vista, El Cajon,
            La Mesa, National City, Coronado, and surrounding areas.
          </div>
        </div>
      </div>
    </div>
  );
}
