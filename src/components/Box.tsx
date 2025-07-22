
import React from "react";
import { twMerge } from "tw-merge";
interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`  rounded-lg w-full ${className}`) }>
      {children}S
    </div>
  );
};

export default Box;
