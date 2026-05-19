import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080E0A] disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary:
          'bg-green-600 text-white shadow-[0_0_20px_rgba(22,163,74,0.30)] hover:bg-green-700 hover:shadow-[0_0_28px_rgba(22,163,74,0.45)] active:bg-green-800 disabled:shadow-none',
        outline:
          'border border-green-700 bg-transparent text-green-400 hover:border-green-500 hover:bg-green-950/50 hover:text-green-300',
        ghost:
          'bg-transparent text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-9 px-4 py-2',
        lg: 'h-11 px-6 py-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
