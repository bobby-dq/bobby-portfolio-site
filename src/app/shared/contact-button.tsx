"use client";

import { MouseEvent } from "react";

interface ContactButtonProps {
  email?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ContactButton({
  email = "josh.quilacio@gmail.com",
  className = "",
  children,
}: ContactButtonProps) {
  const handleContactClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };

  return (
    <button
      onClick={handleContactClick}
      className={`gothic-button ${className}`}
    >
      {children || email}
    </button>
  );
}
