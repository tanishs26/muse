"use client";
import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface Slider {
  value?: number;
  onChange?: (value: number) => void;
}
const Slider: React.FC<Slider> = ({ value, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none h-10 w-[50%]"
      defaultValue={[2]}
      value={[value!]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative rounded-full grow h-[3px] cursor-pointer">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full">

        </RadixSlider.Range>
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
