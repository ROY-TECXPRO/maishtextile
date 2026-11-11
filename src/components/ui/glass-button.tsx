import { type ReactNode } from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "signal" | "navy" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
  onClick?: () => void;
}

export function GlassButton({
  children,
  variant = "signal",
  size = "md",
  className = "",
  onClick,
  ...props
}: GlassButtonProps) {
  const variants = {
    signal:
      "bg-signal text-signal-foreground glass-hover glass-fill hover:bg-signal/90 hover:text-signal-foreground",
    navy:
      "bg-navy text-navy-foreground glass-hover glass-fill hover:bg-navy/90 hover:text-navy-foreground",
    outline:
      "border border-border glass-hover hover:bg-navy/5 hover:border-navy/50",
    ghost:
      "glass-hover hover:bg-navy/10 hover:text-signal",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button
      {...props}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-bold uppercase tracking-wider transition-all duration-200 btn-press ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
