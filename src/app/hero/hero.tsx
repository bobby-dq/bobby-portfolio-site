import React from "react";
import { HeroProps } from "./hero.props";
import AnimatedSection from "@/app/shared/animated-section";
import { isFilled } from "@prismicio/client";
import { PrismicText, PrismicRichText } from "@prismicio/react";

const Hero: React.FC<HeroProps> = ({ homepage }) => {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 flex items-center justify-center h-full">
        <AnimatedSection
          className="hero-content text-center pt-0 md:pt-0 -mt-16 md:-mt-20"
          animation="fadeUp"
        >
          <div className="flex flex-col items-end">
            <h1 className="font-primary text-6xl md:text-9xl text-primary mb-2">
              {isFilled.richText(homepage?.data?.title) && (
                <span className="block uppercase">
                  <PrismicText field={homepage.data.title} />
                </span>
              )}
            </h1>
            <h1 className="font-primary lowercase text-2xl md:text-4xl text-fill mb-6">
              {homepage?.data?.subtitle && (
                <span className="block">{homepage.data.subtitle}</span>
              )}
            </h1>
          </div>
          <div className="font-secondary text-xl md:text-2xl max-w-xl mx-auto leading-relaxed mb-8">
            {isFilled.richText(homepage?.data?.description) && (
              <PrismicRichText field={homepage.data.description} />
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
