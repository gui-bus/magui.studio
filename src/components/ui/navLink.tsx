import * as React from "react"

import Link from "next/link"

import { cn } from "@/src/lib/utils/utils"

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  label: string
  variant?: "desktop" | "mobile" | "footer"
  onClick?: () => void
}

export function NavLink({
  href,
  label,
  variant = "desktop",
  className,
  onClick,
  ...props
}: NavLinkProps) {
  if (variant === "mobile") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter text-foreground hover:text-brand-primary transition-colors",
          className
        )}
        {...props}
      >
        {label}
      </Link>
    )
  }

  if (variant === "footer") {
    return (
      <Link
        href={href}
        className={cn(
          "text-lg font-bold uppercase tracking-tighter text-foreground hover:text-brand-primary transition-all duration-500 flex items-center gap-2 group-hover:translate-x-2",
          className
        )}
        {...props}
      >
        {label}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative text-[10px] font-black uppercase tracking-[0.4em] text-foreground/60 hover:text-brand-primary transition-colors duration-500",
        className
      )}
      {...props}
    >
      {label}
      <span
        className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  )
}
