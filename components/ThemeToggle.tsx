"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
  };

  return (
    <button className="themebtn" id="themebtn" aria-label="Toggle light and dark theme" title="Toggle theme" onClick={toggle}>
      ◐
    </button>
  );
}
