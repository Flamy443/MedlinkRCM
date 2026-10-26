"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// Renders server-built page markup and wires up its interactive bits
// (service accordion, savings calculator, resource filters, audit form).
export default function PageContent({ html }: { html: string }) {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const $ = <T extends HTMLElement>(id: string) => root.querySelector<T>(`#${id}`);
    const ac = new AbortController();
    const { signal } = ac;

    const acc = $("acc");
    if (acc) {
      const cs = [...acc.children];
      const act = (a: Element) => cs.forEach((x) => x.classList.toggle("on", x === a));
      cs.forEach((a) => {
        a.addEventListener("mouseenter", () => { if (matchMedia("(hover:hover)").matches) act(a); }, { signal });
        a.addEventListener("focus", () => act(a), { signal });
        a.addEventListener("click", () => act(a), { signal });
      });
    }

    const c = $<HTMLInputElement>("cl");
    const d = $<HTMLInputElement>("dr");
    if (c && d) {
      const f = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
      const update = () => {
        const m = +c.value * (+d.value / 100) * 460;
        $("clo")!.textContent = (+c.value).toLocaleString("en-US");
        $("dro")!.textContent = d.value + "%";
        $("calcres")!.textContent = f(m * 12);
        $("calcm")!.textContent = f(m) + " a month";
      };
      c.addEventListener("input", update, { signal });
      d.addEventListener("input", update, { signal });
      update();
    }

    const chips = root.querySelectorAll<HTMLElement>(".fchip");
    chips.forEach((b) =>
      b.addEventListener("click", () => {
        chips.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        root.querySelectorAll<HTMLElement>(".rc").forEach((r) => {
          r.hidden = !(b.dataset.f === "All" || r.dataset.t === b.dataset.f);
        });
      }, { signal })
    );

    const form = $<HTMLFormElement>("aform");
    if (form) {
      const show = (n: number) => {
        form.querySelectorAll<HTMLElement>("[data-s]").forEach((s) => { s.hidden = Number(s.dataset.s) !== n; });
        root.querySelectorAll(".ftab").forEach((t, i) => t.classList.toggle("on", i < n));
      };
      $("next1")?.addEventListener("click", () => show(2), { signal });
      $("back2")?.addEventListener("click", () => show(1), { signal });
      form.addEventListener("submit", (e) => { e.preventDefault(); show(3); }, { signal });
    }

    return () => ac.abort();
  }, [html]);

  // Internal links inside the injected markup navigate client-side.
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (a && href && href.startsWith("/") && !a.target) {
      e.preventDefault();
      router.push(href);
    }
  };

  return <main id="app" ref={ref} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
