import Link from "next/link";
import { EMAIL, PHONE } from "@/lib/pages";

const col = (title: string, links: [string, string][]) => (
  <div>
    <h4>{title}</h4>
    {links.map(([to, label]) => (
      <Link key={to} href={`/${to}`}>{label}</Link>
    ))}
  </div>
);

export default function Footer() {
  return (
    <footer id="foot">
      <div className="wrap">
        <div className="cols">
          <div>
            <Link className="logo" href="/">
              <svg viewBox="0 0 56 36" fill="none" aria-hidden="true" style={{ width: 44, height: 30 }}>
                <path d="M18 8c-8-6-16 2-12 12 3.700 9 14 11 18 3 3.500-6.500 7-14 14-14 8 0 10 12 0 16" stroke="#5fd3b8" strokeWidth="5.200" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>MedLink<small>RCM</small></span>
            </Link>
            <p>Revenue cycle management for hospitals, medical groups, dental networks and billing companies across the U.S.</p>
            <a className="tel" href="tel:+18884261280">{PHONE}</a>
          </div>
          {col("Services", [["why-access", "Patient Access"], ["why-coding", "Coding & CDI"], ["why-charge", "Charge Capture"], ["why-denials", "Denial Management"], ["dental", "Dental RCM"]])}
          {col("Who we help", [["who-hospitals", "Hospitals & Systems"], ["who-groups", "Medical Groups"], ["who-dental", "Dental Groups & DSOs"], ["who-billing", "Billing Companies"], ["who-plans", "Health Plans"]])}
          {col("Company", [["about", "About MedLink"], ["why", "Why MedLink"], ["careers", "Careers"], ["resources", "News & Insights"], ["audit", "Free Audit & Contact"]])}
          <div>
            <h4>Head office</h4>
            <p>3333 Michelson Drive, Suite 210<br />Irvine, CA 92612</p>
            <p style={{ marginTop: 12 }}>{EMAIL}</p>
            <h4 style={{ marginTop: 24 }}>Hours</h4>
            <p>Mon–Fri 8 AM–7 PM CST<br />Sat 9 AM–2 PM CST</p>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 MedLink RCM. All rights reserved.</span>
          <span>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
