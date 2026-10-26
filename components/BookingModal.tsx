"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { EMAIL } from "@/lib/pages";

export const OPEN_BOOKING_EVENT = "open-booking";
export const openBooking = () => window.dispatchEvent(new Event(OPEN_BOOKING_EVENT));

const SERVICES = [
  { id: "rcm", title: "Revenue Cycle", sub: "Billing & AR" },
  { id: "va", title: "Medical VA", sub: "Front Desk & Intake" },
  { id: "coding", title: "Coding & CDI", sub: "Chart Audits" },
  { id: "growth", title: "Marketing", sub: "Patient Acquisition" },
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("rcm");
  const [date, setDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_BOOKING_EVENT, show);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (done) { setDone(false); setName(""); setEmail(""); setMessage(""); setDate(null); setService("rcm"); }
  };

  const cells = useMemo(() => {
    const first = month.getDay();
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  }, [month]);
  const canGoBack = month > new Date(today.getFullYear(), today.getMonth(), 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Please enter a valid email";
    if (!date) err.date = "Pick a preferred date";
    setErrors(err);
    if (Object.keys(err).length) return;
    const svc = SERVICES.find((s) => s.id === service)!;
    const body = [`Name: ${name}`, `Email: ${email}`, `Interested in: ${svc.title} (${svc.sub})`, `Preferred date: ${fmt(date!)}`, "", message].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Practice consultation request")}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };

  if (!open) return null;

  return (
    <div className="bk-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="bk" role="dialog" aria-modal="true" aria-labelledby="bk-title">
        <aside className="bk-side">
          <Image src="/logo.png" alt="MedLink RCM" width={640} height={528} className="bk-logo" />
          <div>
            <span className="eyebrow">Live practice portal</span>
            <p className="bk-tag">Connected practice intelligence, revenue cycle solutions and tailored virtual support.</p>
          </div>
          <div className="bk-stat"><b>98%</b><span>first-pass clean claims</span></div>
        </aside>

        <div className="bk-main">
          <button type="button" className="bk-x" aria-label="Close" onClick={close}>×</button>
          {done ? (
            <div className="bk-done">
              <div className="bk-check" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M4 8.4l2.6 2.6L12 5.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <h2 id="bk-title">Consultation request ready</h2>
              <p>Your email app opened with the details for {date && fmt(date)}. Send it and our team will confirm the time.</p>
              <button type="button" className="btn pri" onClick={close}>Done</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 id="bk-title">Book a Practice Consultation</h2>
              <p className="bk-sub">Our clinical and revenue specialists craft custom operational support for your organization.</p>

              <div className="bk-row">
                <label className="bk-f">
                  <span>Your name</span>
                  <input ref={nameRef} type="text" placeholder="Dr. Sarah Mitchell" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
                  {errors.name && <em>{errors.name}</em>}
                </label>
                <label className="bk-f">
                  <span>Email address</span>
                  <input type="email" placeholder="smitchell@practice.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
                  {errors.email && <em>{errors.email}</em>}
                </label>
              </div>

              <fieldset className="bk-f">
                <legend>I&apos;m interested in</legend>
                <div className="bk-svc">
                  {SERVICES.map((s) => (
                    <button type="button" key={s.id} aria-pressed={service === s.id} onClick={() => setService(s.id)}>
                      <b>{s.title}</b><small>{s.sub}</small>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="bk-f">
                <span>Schedule date</span>
                <div className="bk-cal">
                  <div className="bk-calh">
                    <button type="button" aria-label="Previous month" disabled={!canGoBack} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button>
                    <b>{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</b>
                    <button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button>
                  </div>
                  <div className="bk-grid">
                    {DAYS.map((d) => <span key={d} className="bk-dow">{d}</span>)}
                    {cells.map((c, i) =>
                      c ? (
                        <button
                          type="button"
                          key={i}
                          disabled={c < today || c.getDay() === 0 || c.getDay() === 6}
                          aria-pressed={date?.getTime() === c.getTime()}
                          onClick={() => setDate(c)}
                        >
                          {c.getDate()}
                        </button>
                      ) : <i key={i} />
                    )}
                  </div>
                </div>
                {errors.date && <em>{errors.date}</em>}
              </div>

              <label className="bk-f">
                <span>Additional message</span>
                <textarea rows={3} placeholder="Tell us about current billing pain points, providers count, or specialty..." value={message} onChange={(e) => setMessage(e.target.value)} />
              </label>

              <button type="submit" className="btn pri bk-submit">Book appointment <span className="arrow">→</span></button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
