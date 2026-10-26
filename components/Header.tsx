"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MEGA, NAV, PARENT } from "@/lib/pages";

type Kid = [string, string];
type NavItem = { id?: string; l: string; hub?: string; kids?: Kid[] };

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const page = pathname === "/" ? "home" : pathname.slice(1);
  const activeKey = PARENT[page] ? PARENT[page].l : page;

  const firstRender = useRef(true);
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    // Every page opens at its hero. Skipped on first load so refresh keeps the browser's scroll restore.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div id="hdr" className="top">
      <div className="wrap hdrmain" style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link className="logo" href="/" aria-label="MedLink RCM home">
          <Image src="/logo.png" alt="MedLink RCM" width={640} height={525} priority />
        </Link>

        <nav className="main" id="nav" aria-label="Primary">
          {(NAV as NavItem[]).map((n) => {
            if (!n.kids) {
              return (
                <div key={n.id} className={`nl${activeKey === n.id ? " on" : ""}`}>
                  <Link href={`/${n.id}`}>{n.l}</Link>
                </div>
              );
            }
            const m = MEGA[n.hub as keyof typeof MEGA];
            const open = openMenu === n.l;
            return (
              <div key={n.l} className={`nl${activeKey === n.l ? " on" : ""}${open ? " open" : ""}`}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={open}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(open ? null : n.l);
                  }}
                >
                  {n.l}
                </button>
                <div className="mega">
                  <div className="wrap">
                    <div className="mega-l">
                      <span className="eyebrow">{m.e}</span>
                      <h3>{m.t}</h3>
                      <p>{m.d}</p>
                      <Link className="btn pri" href={`/${n.hub}`} style={{ alignSelf: "flex-start", padding: "12px 20px", fontSize: 14 }}>
                        Overview <span className="arrow">→</span>
                      </Link>
                      <div className="mstat"><b>{m.s[0]}</b><small>{m.s[1]}</small></div>
                    </div>
                    <div className="mega-r">
                      {n.kids.filter((k) => k[0] !== n.hub).map((k) => (
                        <Link key={k[0]} href={`/${k[0]}`}>
                          <span className="t">{m.i[k[0]][0]}</span>
                          <b>{k[1]}<i>→</i></b>
                          <span>{m.i[k[0]][1]}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="cta-top">
          <Link className="btn outl" href="/audit">Let&apos;s Talk <span className="arrow">↗</span></Link>
        </div>
        <button className="burger" id="burger" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((o) => !o)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h16M3 11h16M3 16h16" /></svg>
        </button>
      </div>

      <div className={`mnav${mobileOpen ? " open" : ""}`} id="mnav">
        {(NAV as NavItem[]).map((n) =>
          n.kids ? (
            <details key={n.l}>
              <summary>{n.l}</summary>
              {n.kids.map((k) => <Link key={k[0]} href={`/${k[0]}`}>{k[1]}</Link>)}
            </details>
          ) : (
            <Link key={n.id} href={`/${n.id}`}>{n.l}</Link>
          )
        )}
        <Link className="btn pri" href="/audit">Let&apos;s Talk</Link>
      </div>
    </div>
  );
}
