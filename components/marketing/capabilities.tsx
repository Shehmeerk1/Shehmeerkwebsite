import { ArrowUpRight } from "lucide-react";

const ROWS = [
  { name: "Positioning", line: "Who it is for, what you promise, why you." },
  { name: "Brand and message", line: "The words and the look people remember you by." },
  { name: "Content systems", line: "A weekly rhythm one person can keep up." },
  { name: "Acquisition", line: "One channel, paid or earned, done properly." },
  { name: "Sales process", line: "From first reply to signed, without leaks." },
  { name: "Measurement", line: "The few numbers that tell you what to do next." },
];

/** An index of capabilities. Hover floods a row with yellow from the left. */
export function Capabilities() {
  return (
    <ul className="border-t border-line">
      {ROWS.map((r) => (
        <li key={r.name} className="group relative isolate overflow-hidden border-b border-line">
          <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[#f2d33b] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
          <div className="grid grid-cols-12 items-center gap-x-4 py-5 transition-colors duration-300 group-hover:text-[#12100e]">
            <span className="t-l col-span-12 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-4 md:col-span-6">{r.name}</span>
            <span className="t-body col-span-11 text-muted group-hover:text-[#12100e] md:col-span-5">{r.line}</span>
            <ArrowUpRight className="col-span-1 size-7 justify-self-end opacity-0 transition-opacity duration-300 group-hover:opacity-100" strokeWidth={1.4} aria-hidden />
          </div>
        </li>
      ))}
    </ul>
  );
}
