"use client";

import { useState, useRef } from "react";
import ZipChecker from "./ZipChecker";

const serviceOptions = [
  "Diagnostic",
  "Repair",
  "Remote pre-diagnostic",
  "Pre-purchase inspection",
  "Not sure — describe it",
];

const modelOptions = ["Model 3", "Model Y", "Model S", "Model X", "Not sure"];
const yearOptions = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
const contactPrefs = ["Phone call", "Text message", "Email"];

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [warrantyChecked, setWarrantyChecked] = useState(false);
  const [showWarrantyAlert, setShowWarrantyAlert] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ── Warranty checkbox validation ──
    if (!warrantyChecked) {
      setShowWarrantyAlert(true);
      return;
    }

    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const service = data.get("service") as string || "Not specified";
    const name = data.get("name") as string || "";
    const phone = data.get("phone") as string || "";
    const email = data.get("email") as string || "";
    const model = data.get("model") as string || "";
    const year = data.get("year") as string || "";
    const location = data.get("location") as string || "";
    const faultcodes = data.get("faultcodes") as string || "";
    const issue = data.get("issue") as string || "";
    const contactpref = data.get("contactpref") as string || "Phone call";

    // ── Build subject line ──
    const subjectParts = ["Service Request"];
    if (model) subjectParts.push(model);
    if (year) subjectParts.push(year);
    subjectParts.push(`— ${service}`);
    const subject = subjectParts.join(" ");

    // ── Build body ──
    const lines = [
      `Service Request from raysevservice.com`,
      ``,
      `Service needed: ${service}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      ``,
      `Tesla: ${model || "Not specified"} ${year || ""}`.trim(),
      location ? `Location/Zip: ${location}` : null,
      `Preferred contact: ${contactpref}`,
      ``,
      faultcodes ? `Fault codes / alerts:\n${faultcodes}` : null,
      faultcodes ? `` : null,
      issue ? `Issue description:\n${issue}` : null,
      issue ? `` : null,
      `---`,
      `Warranty acknowledgment: Customer confirmed they have reviewed warranty coverage information.`,
    ].filter((line): line is string => line !== null);

    const body = lines.join("\n");

    // ── Open mailto ──
    const mailto = `mailto:RaysEVService@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
    >

      {/* Coverage check */}
      <div className="bg-brand-surface border border-brand-border rounded-card p-4">
        <p className="font-body text-sm font-semibold text-brand-dark mb-1">Check if you&apos;re in our service area</p>
        <p className="font-body text-xs text-brand-muted mb-3 leading-relaxed">
          Enter your zip to see your zone and any travel fee before booking.
        </p>
        <ZipChecker compact showCoverageLink />
      </div>

      {/* Service type */}
      <div>
        <label className="font-body text-sm font-semibold text-brand-dark block mb-2">What do you need?</label>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((s) => (
            <label key={s} className="font-body text-sm cursor-pointer">
              <input type="radio" name="service" value={s} className="sr-only peer" defaultChecked={s === "Diagnostic"} />
              <span className="block px-3.5 py-2 rounded-full border border-brand-border text-brand-muted peer-checked:bg-brand-green peer-checked:text-white peer-checked:border-brand-green transition-all">
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="font-body text-sm font-semibold text-brand-dark block mb-1.5">
            Name <span className="font-normal text-brand-muted">required</span>
          </label>
          <input
            id="name" name="name" type="text" required
            placeholder="Your name"
            className="font-body w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green"
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-body text-sm font-semibold text-brand-dark block mb-1.5">
            Phone <span className="font-normal text-brand-muted">required</span>
          </label>
          <input
            id="phone" name="phone" type="tel" required
            placeholder="(555) 000-0000"
            className="font-body w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="font-body text-sm font-semibold text-brand-dark block mb-1.5">
          Email <span className="font-normal text-brand-muted">optional</span>
        </label>
        <input
          id="email" name="email" type="email"
          placeholder="you@example.com"
          className="font-body w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green"
        />
      </div>

      {/* Model + Year */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="model" className="font-body text-sm font-semibold text-brand-dark block mb-1.5">Tesla model</label>
          <select id="model" name="model" className="font-body w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-green bg-white">
            <option value="">Select model</option>
            {modelOptions.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="font-body text-sm font-semibold text-brand-dark block mb-1.5">Year</label>
          <select id="year" name="year" className="font-body w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-green bg-white">
            <option value="">Select year</option>
            {yearOptions.map((y) => <option key={y}>{y}</option>)}
            <option>2017 or earlier</option>
          </select>
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="font-body text-sm font-semibold text-brand-dark block mb-1.5">
          Your city or zip code <span className="font-normal text-brand-muted">— we confirm coverage before dispatch</span>
        </label>
        <input
          id="location" name="location" type="text"
          placeholder="e.g. Anaheim, CA or 92801"
          className="font-body w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green"
        />
      </div>

      {/* Fault codes */}
      <div className="bg-brand-surface border border-brand-border rounded-card p-4">
        <p className="font-body text-sm font-semibold text-brand-dark mb-1">
          Fault codes or alert messages
          <span className="font-normal text-brand-muted ml-1">— optional but helpful</span>
        </p>
        <p className="font-body text-xs text-brand-muted mb-3 leading-relaxed">
          Find them in the Tesla app under Safety &amp; Security → Service Alerts, or on the touchscreen. Even a partial code helps Ray prepare before arriving.
        </p>
        <textarea
          name="faultcodes" rows={3}
          placeholder="e.g. BMS_a066, CP_a146, or paste the full alert message..."
          className="font-mono w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-blue bg-white resize-none"
        />
      </div>

      {/* Issue description */}
      <div>
        <label htmlFor="issue" className="font-body text-sm font-semibold text-brand-dark block mb-1.5">
          Describe the issue <span className="font-normal text-brand-muted">— plain language is fine</span>
        </label>
        <textarea
          id="issue" name="issue" rows={4}
          placeholder="e.g. Car won't charge past 60%, started three weeks ago. No error codes showing but range has dropped noticeably..."
          className="font-body w-full border border-brand-border rounded-lg px-3.5 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green resize-none"
        />
      </div>

      {/* Contact pref */}
      <div>
        <label className="font-body text-sm font-semibold text-brand-dark block mb-2">Preferred contact</label>
        <div className="flex gap-5">
          {contactPrefs.map((p) => (
            <label key={p} className="font-body text-sm text-brand-muted flex items-center gap-2 cursor-pointer">
              <input type="radio" name="contactpref" value={p} defaultChecked={p === "Phone call"} className="accent-brand-green" />
              {p}
            </label>
          ))}
        </div>
      </div>

      {/* Warranty reminder — REQUIRED */}
      <div className={`rounded-card p-4 flex items-start gap-3 transition-colors ${
        showWarrantyAlert && !warrantyChecked
          ? "bg-red-50 border-2 border-red-400"
          : "bg-amber-50 border border-amber-200"
      }`}>
        <input
          type="checkbox"
          id="warranty"
          className="mt-1 accent-brand-green"
          checked={warrantyChecked}
          onChange={(e) => {
            setWarrantyChecked(e.target.checked);
            if (e.target.checked) setShowWarrantyAlert(false);
          }}
        />
        <label htmlFor="warranty" className="font-body text-sm text-brand-dark leading-relaxed cursor-pointer">
          <strong className="font-semibold">Warranty check</strong> — I understand that if my Tesla is under 50k miles, the bumper-to-bumper warranty may cover this issue. Under 120k miles with HV battery issues, the battery warranty likely applies. I should check my warranty coverage before booking independent service.{" "}
          <span className="text-brand-muted">Ray will remind you either way.</span>
        </label>
      </div>

      {showWarrantyAlert && !warrantyChecked && (
        <div className="bg-red-50 border border-red-300 rounded-lg px-4 py-3 flex items-start gap-2">
          <span className="text-red-500 shrink-0 mt-0.5">!</span>
          <p className="font-body text-sm text-red-700 leading-relaxed">
            Please read and check the warranty acknowledgment above before submitting. This ensures you&apos;ve considered whether your Tesla&apos;s factory warranty may cover the issue.
          </p>
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="font-body font-semibold text-sm bg-brand-green text-white px-7 py-3 rounded-lg hover:bg-brand-green-dk transition-colors"
        >
          Send request
        </button>
        <p className="font-body text-xs text-brand-muted leading-relaxed max-w-xs">
          Opens your email app with the request pre-filled. Ray typically responds within 1–2 hours during business hours.
        </p>
      </div>
    </form>
  );
}
