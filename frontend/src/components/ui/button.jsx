export function Button({
  className = "",
  variant = "default",
  size = "default",
  type = "button",
  children,
  ...props
}) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-border bg-card text-foreground hover:bg-muted",
    ghost: "bg-transparent text-foreground hover:bg-muted",
    secondary: "bg-surface text-surface-foreground hover:bg-muted",
    digilocker: "bg-[#0066b3] text-white hover:bg-[#005299]",
  }

  const sizes = {
    default: "h-10 px-4 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-5 text-base",
    icon: "h-10 w-10",
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variants[variant] ?? variants.default} ${sizes[size] ?? sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
