import * as React from "react"

interface StaggeredTextProps {
  text: string
  className?: string
}

export const StaggeredText = React.memo(function StaggeredText({
  text,
  className,
}: StaggeredTextProps): React.JSX.Element {
  const words = text.split(" ")

  return (
    <span
      className={
        className
          ? `inline-flex flex-wrap ${className}`
          : "inline-flex flex-wrap"
      }
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden mr-[0.2em] last:mr-0"
        >
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </span>
  )
})
