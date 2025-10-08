import { Loader2 } from "lucide-react";

/**
 * InfiniteLoader — a lightweight, accessible spinner built with lucide-react and Tailwind CSS.
 *
 * Props
 * - size: pixel size for the icon (number). Default 24.
 * - label: screen-reader text. Default "Loading…".
 * - className: extra Tailwind classes for the wrapper (e.g., text-primary).
 * - iconClassName: extra Tailwind classes for the icon itself.
 * - showText: when true, shows the label visually next to the spinner.
 */
interface InfiniteLoaderProps {
  size?: number;
  label?: string;
  className?: string;
  iconClassName?: string;
  showText?: boolean;
}

export function InfiniteLoader(props: InfiniteLoaderProps) {
  const { size = 24, label = "Loading…", className = "", iconClassName = "", showText = false } = props;

  return (
    <div role="status" aria-live="polite" aria-busy="true" className={`inline-flex items-center gap-2 ${className}`}>
      {/* Icon uses currentColor so you can color via parent text-* classes */}
      <Loader2 className={`animate-spin ${iconClassName}`} style={{ width: size, height: size }} />
      {/* Visible label if requested */}
      {showText && <span className="text-sm leading-none">{label}</span>}
      {/* SR-only label for accessibility */}
      <span className="sr-only">{label}</span>
    </div>
  );
}
