"use client";
import { style } from "framer-motion/client";
import { Toaster } from "react-hot-toast";
const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#f8f5fa",
        },
      }}
     />
  );
};
export default ToasterProvider;
