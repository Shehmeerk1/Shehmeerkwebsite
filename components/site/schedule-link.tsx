import { CalendarDays } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { site } from "@/lib/site";

/** Renders only when a booking URL is configured. Otherwise the inquiry form asks for a call window instead. */
export function ScheduleLink({ variant = "outline", label = "Schedule a conversation" }: { variant?: ButtonProps["variant"]; label?: string }) {
  const url = site.contact.schedulingUrl;
  if (!url) return null;
  return (
    <Button asChild variant={variant}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CalendarDays aria-hidden /> {label}
      </a>
    </Button>
  );
}
