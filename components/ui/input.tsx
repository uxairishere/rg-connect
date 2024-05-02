import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string;
  label?: string;
  errors?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errors, label, htmlFor, type, ...props }, ref) => {
    return (
      <label className={cn("flex flex-col mx-auto w-full text-sm font-medium ",
        label && "gap-1"
      )}
        htmlFor={htmlFor}
      >
        {label}
        <input
          type={type}
          className={cn(
            "w-full p-2 bg-transparent border border-stone-300 rounded focus:border-green-500/75 focus:ring-green-500/75 hover:shadow-sm green-shadow transition-all focus-visible:outline-none",
            className,
            errors?.name && 'border-red-500',
          )}
          ref={ref}
          {...props}
        />
      </label>
    )
  }
)
Input.displayName = "Input"

export { Input };
