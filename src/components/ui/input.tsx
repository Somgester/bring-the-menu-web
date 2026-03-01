import React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    // do not override disabled/readOnly if intentionally passed in props
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full rounded-md border px-4 py-3 text-sm bg-transparent ${className} pointer-events-auto`}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
