import React from "react";
import { HeroProps } from "./hero.props";
import AnimatedSection from "@/app/shared/animated-section";
import ContactButton from "@/app/shared/contact-button";
import { isFilled } from "@prismicio/client";
import { PrismicText, PrismicRichText } from "@prismicio/react";
import Link from "next/link";

const Hero: React.FC<HeroProps> = ({ homepage, settings }) => {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4">
        <AnimatedSection className="hero-content" animation="fadeUp">
          <h1 className="font-primary text-6xl md:text-8xl text-primary mb-6">
            {isFilled.richText(homepage?.data?.title) && (
              <span className="block">
                <PrismicText field={homepage.data.title} />
              </span>
            )}
            {homepage?.data?.subtitle && (
              <span className="block">{homepage.data.subtitle}</span>
            )}
          </h1>
          <div className="font-secondary text-xl md:text-2xl max-w-xl leading-relaxed mb-8">
            {isFilled.richText(homepage?.data?.description) && (
              <PrismicRichText field={homepage.data.description} />
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="#work" className="gothic-button">
              View my work
            </Link>
            <ContactButton email={settings?.data?.email} />
            {isFilled.link(settings?.data?.resume_link) && (
              <a
                href={settings.data.resume_link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gothic-button"
              >
                Resume
              </a>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
