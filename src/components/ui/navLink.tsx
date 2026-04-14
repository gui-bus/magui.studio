import * as React from "react"

import Link from "next/link"

import { Link as LocalizedLink } from "@/src/i18n/navigation"

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
}: NavLinkProps): React.JSX.Element {
  const isLocalizedHref = href.startsWith("/")

  if (variant === "mobile") {
    const Component = isLocalizedHref ? LocalizedLink : Link

    return (
      <Component
        href={href as never}
        onClick={onClick}
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground hover:text-brand-primary transition-colors",
          className
        )}
        {...props}
      >
        {label}
      </Component>
    )
  }

  if (variant === "footer") {
    const Component = isLocalizedHref ? LocalizedLink : Link

    return (
      <Component
        href={href as never}
        className={cn(
          "text-lg font-bold uppercase tracking-tighter text-foreground hover:text-brand-primary transition-all duration-500 flex items-center gap-2 group-hover:translate-x-2",
          className
        )}
        {...props}
      >
        {label}
      </Component>
    )
  }

  const Component = isLocalizedHref ? LocalizedLink : Link

  return (
    <Component
      href={href as never}
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
    </Component>
  )
}
