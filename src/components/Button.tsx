import { button } from "@heroui/theme";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `text-orange-500 font-medium  border text-md px-4 py-2 rounded-full  shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer hover:bg-orange-600 hover:text-white hover:border-orange-600 active:scale-95 transition ${className}`
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
