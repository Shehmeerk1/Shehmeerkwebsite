import { cn } from "@/lib/utils";

/** A numbered sequence. Used only where the order is real (a process), never as decoration. */
export function Steps({ items, className }: { items: { title: string; body: string }[]; className?: string }) {
  return (
    <ol className={cn("border-t border-line", className)}>
      {items.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[3.5rem_12rem_1fr]">
          <span className="t-num t-l !text-[2rem] text-accent">{i + 1}</span>
          <h3 className="t-s self-center">{s.title}</h3>
          <p className="t-body col-start-2 mt-1 text-muted sm:col-start-3 sm:mt-0">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
