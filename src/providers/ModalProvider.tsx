"use client";
import React, { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <AuthModal/>
    </div>
  );
};

export default ModalProvider;
