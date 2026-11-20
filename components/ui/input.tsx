import * as React from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "w-full min-h-12 rounded-none border-0 border-b border-fg/30 bg-transparent px-0 py-3 text-[1.0625rem] text-fg placeholder:text-muted transition-colors hover:border-fg/60 focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_1px_0_0_var(--accent)] aria-[invalid=true]:border-error";

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClass, "min-h-32 resize-y leading-relaxed", className)} {...props} />;
}

const chevron =
  "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22 stroke=%22%23888%22 stroke-width=%221.6%22><path d=%22M1 1.5l5 5 5-5%22/></svg>')] bg-[length:12px_8px] bg-[right_0.25rem_center] bg-no-repeat";

function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldClass, "appearance-none bg-bg pr-8 [&>option]:bg-bg [&>option]:text-fg", chevron, className)} {...props}>
      {children}
    </select>
  );
}

export { Input, Textarea, Select };
