// 2-second intro: the logo's infinity mark draws itself, then the overlay fades out.
// Pure CSS (see globals.css) so it shows from the first paint with no JS needed.
export default function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <svg className="pl-mark" viewBox="150 440 1050 640" fill="none">
        <defs>
          <linearGradient id="pl-g" gradientUnits="userSpaceOnUse" x1="222" y1="0" x2="1130" y2="0">
            <stop offset="0" stopColor="#0a2f6b" />
            <stop offset=".38" stopColor="#0a2f6b" />
            <stop offset=".58" stopColor="#0a7f9a" />
            <stop offset=".72" stopColor="#0da18f" />
            <stop offset="1" stopColor="#0da18f" />
          </linearGradient>
        </defs>
        <path
          className="pl-path"
          pathLength={1}
          d="M572 602C535 555 495 492 450 492C340 492 222 720 222 880C222 990 295 1040 375 1040C500 1040 580 930 680 790C770 665 850 492 920 492C1010 492 1130 740 1130 880C1130 990 1070 1040 985 1040C910 1040 840 975 795 912"
          stroke="url(#pl-g)"
          strokeWidth="76"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
