"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer relative mt-0.5 size-5 shrink-0 rounded-[4px] border border-fg/50 transition-colors before:absolute before:-inset-3 before:content-[''] hover:border-fg data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-fg aria-[invalid=true]:border-error",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <Check className="size-3.5" strokeWidth={2.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
