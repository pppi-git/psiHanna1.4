import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Tipos de variantes suportadas pelo botão
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Propriedades do componente Button
 * @typedef {Object} ButtonProps
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} - Propriedades HTML padrão de um botão
 * @property {VariantProps<typeof buttonVariants>} - Variantes de estilo do botão
 * @property {boolean} [asChild] - Se o botão deve renderizar como seu filho (usando Radix Slot)
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Se verdadeiro, o botão irá renderizar seu filho direto em vez de um elemento button
   * Útil para criar links ou outros elementos que se comportam como botões
   */
  asChild?: boolean
}

/**
 * Componente Button - Botão interativo com diversas variantes de estilo
 * 
 * @example
 * // Botão padrão
 * <Button>Clique aqui</Button>
 * 
 * @example
 * // Botão destrutivo grande
 * <Button variant="destructive" size="lg">Excluir</Button>
 * 
 * @example
 * // Botão como link
 * <Button asChild><Link href="/pagina">Ir para página</Link></Button>
 */
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

