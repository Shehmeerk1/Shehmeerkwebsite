import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * One button family: a full pill in the section's own colours. "solid" is
 * foreground-on-background, "accent" uses the hour's accent, "outline" is a hairline.
 */
const buttonVariants = cva(
  "t-label inline-flex min-h-[3.25rem] items-center justify-center gap-3 whitespace-nowrap rounded-full px-7 transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
  {
    variants: {
      variant: {
        solid: "bg-fg text-bg hover:bg-accent hover:text-accent-fg",
        accent: "bg-accent text-accent-fg hover:bg-fg hover:text-bg",
        outline: "border border-fg/35 text-fg hover:border-fg hover:bg-fg hover:text-bg",
        ghost: "px-0 min-h-11 text-current",
      },
      size: { default: "", sm: "min-h-11 px-5", lg: "min-h-[3.75rem] px-9 text-[0.875rem]" },
    },
    defaultVariants: { variant: "solid", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
