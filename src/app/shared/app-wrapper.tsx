"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "./loading-screen";
import gsap from "gsap";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "visible";
      }
    };
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);

    if (typeof document !== "undefined") {
      gsap.fromTo(
        ".app-content",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      document.body.style.overflow = "visible";
    }
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={`app-content ${loading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </>
  );
};

export default AppWrapper;
