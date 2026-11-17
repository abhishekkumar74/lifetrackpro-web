import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ui-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "ui-button-default bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 active:bg-indigo-800",
        destructive:
          "ui-button-destructive bg-red-600 text-white shadow-xs hover:bg-red-700",
        outline:
          "ui-button-outline border border-slate-200 bg-white text-slate-900 shadow-xs hover:bg-slate-50 hover:text-slate-900",
        secondary:
          "ui-button-secondary bg-slate-100 text-slate-900 shadow-xs hover:bg-slate-200/80",
        ghost: "ui-button-ghost text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        link: "ui-button-link text-indigo-600 underline-offset-4 hover:underline",
        brand:
          "ui-button-brand bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
