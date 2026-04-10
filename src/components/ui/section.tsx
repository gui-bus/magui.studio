import * as React from "react"

import { cn } from "@/src/lib/utils/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  children: React.ReactNode
  containerClassName?: string
  withContainer?: boolean
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      children,
      className,
      containerClassName,
      withContainer = true,
      ...props
    },
    ref
  ) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-background",
          className
        )}
        {...props}
      >
        {withContainer ? (
          <div
            className={cn(
              "px-6 md:px-12 lg:px-24 relative z-10",
              containerClassName
            )}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)

Section.displayName = "Section"
