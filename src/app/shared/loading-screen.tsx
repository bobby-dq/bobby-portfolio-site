"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch("/api/icon/bq-min-logo");
        const svgText = await response.text();

        const modifiedSvg = svgText.replace(
          "<svg",
          '<svg style="visibility:hidden;" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"'
        );

        setSvgContent(modifiedSvg);
      } catch (error) {
        console.error("Error loading SVG:", error);
        setTimeout(onComplete, 1000);
      }
    };

    fetchSvg();
  }, [onComplete]);

  useEffect(() => {
    if (!svgContent || !svgContainerRef.current) return;
    const svgElement = svgContainerRef.current.querySelector("svg");
    if (!svgElement) return;

    const timer = setTimeout(() => {
      const paths = svgContainerRef.current?.querySelectorAll(
        "path, circle, rect, line, polyline, polygon"
      );

      if (paths && paths.length > 0) {
        paths.forEach((path) => {
          path.setAttribute("stroke", "currentColor");
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-width", "0.5");

          let length = 0;
          try {
            length = (path as SVGGeometryElement).getTotalLength();
          } catch (e) {
            length = 500;
          }

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
            fillOpacity: 0,
          });
        });

        gsap.set(svgElement, { visibility: "visible" });
        const tl = gsap.timeline({
          onComplete,
        });

        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 0.66,
          stagger: 0.11,
          ease: "power2.inOut",
        });

        tl.to(
          paths,
          {
            fill: "currentColor",
            fillOpacity: 0.2,
            duration: 0.5,
            stagger: 0.05,
            ease: "power1.in",
          },
          "-=0.3"
        );

        tl.to(paths, {
          fillOpacity: 1,
          strokeWidth: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power1.inOut",
        });

        tl.to({}, { duration: 0.33 });

        tl.to(containerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
        });
      } else {
        setTimeout(onComplete, 1000);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [svgContent, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-base z-50"
    >
      <div
        ref={svgContainerRef}
        // className="w-32 h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 text-primary flex items-center justify-center"
        className="w-48 h-48 text-primary flex items-center justify-center"
      >
        {svgContent ? (
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
