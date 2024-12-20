import * as React from "react";
import confetti, { Options } from "canvas-confetti";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        retro: "pixel-border",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        homepage: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        homepage: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

interface RetroButtonProps extends ButtonProps {
  legend: string;
  particle?: string;
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, size, particle, legend, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const handleButtonClick = (e: React.MouseEvent) => {
      if (particle) {
        const plus_one = confetti.shapeFromText({
          text: particle,
          scalar: 100,
        });
        confetti({
          particleCount: 3,
          startVelocity: 10,
          spread: 100,
          flat: true,
          scalar: 2,
          disableForReducedMotion: true,
          shapes: [plus_one],
          origin: {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
          },
        } as Options);
      }
    };
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="relative flex w-fit group h-fit">
              <Comp
                className={cn(
                  buttonVariants({ variant: "retro", size, className }),
                  "bg-white z-10",
                )}
                ref={ref}
                {...props}
                onClick={(e) => {
                  handleButtonClick(e);
                  props.onClick?.(e);
                }}
              />
              <div className="pixel-border shadow-pixel-1"></div>
              <div className="pixel-border shadow-pixel-2 group-hover:hidden"></div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-pressstart text-xs">{legend}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);
RetroButton.displayName = "RetroButton";
export { Button, RetroButton, buttonVariants };
