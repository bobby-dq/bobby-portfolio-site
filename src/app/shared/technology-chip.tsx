import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface TechnologyChipProps {
  name: string;
  className?: string;
  index?: number;
}

const TechnologyChip: React.FC<TechnologyChipProps> = ({
  name,
  className = "",
  index = 0,
}) => {
  const chipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (chipRef.current) {
      gsap.fromTo(
        chipRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.05 * index,
          ease: "power2.out",
        }
      );
    }
  }, [index]);

  return (
    <span
      ref={chipRef}
      className="px-4 py-2 border border-ink-800 text-ink-300 hover:text-ink hover:border-ink-700 transition-colors"
    >
      {name}
    </span>
  );
};

export default TechnologyChip;
