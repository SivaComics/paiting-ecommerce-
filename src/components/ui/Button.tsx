import Link from "next/link";
import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "copper" | "outline-light";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-espresso text-cream hover:bg-copper hover:-translate-y-0.5 hover:shadow-copper-glow active:translate-y-0 transition-all duration-300 ease-premium",
  secondary:
    "bg-transparent text-espresso border border-espresso/30 hover:border-copper hover:text-copper hover:-translate-y-0.5 transition-all duration-300 ease-premium",
  ghost: "bg-transparent text-espresso hover:text-copper transition-colors duration-300 ease-premium",
  copper:
    "bg-copper text-cream hover:bg-copper-light hover:-translate-y-0.5 hover:shadow-copper-glow active:translate-y-0 transition-all duration-300 ease-premium",
  "outline-light":
    "bg-transparent text-cream border border-cream/50 hover:border-copper hover:text-copper hover:-translate-y-0.5 transition-all duration-300 ease-premium",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs tracking-wide",
  md: "px-6 py-3 text-sm tracking-wide",
  lg: "px-8 py-4 text-sm tracking-widest",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

type Props = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", children, className, ...rest }: Props) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 uppercase font-sans font-medium rounded-none",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (rest.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonRest } = rest as ButtonAsButton;
  void _href;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
