import React from "react";
import { ContactProps } from "./contact.props";
import AnimatedSection from "@/app/shared/animated-section";
import ContactButton from "@/app/shared/contact-button";
import { isFilled } from "@prismicio/client";

const Contact: React.FC<ContactProps> = ({ settings }) => {
  return (
    <section id="contact" className="portfolio-section border-b-0">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeUp">
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16 lowercase">
            Connect
          </h2>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeUp"
          delay={100}
          className="max-w-2xl mx-auto"
        >
          <p className="text-ink-300 mb-8 text-center text-xl">
            Interested in working together? Feel free to reach out directly.
          </p>

          <div className="flex flex-col items-center space-y-6">
            <ContactButton
              email={settings?.data?.email}
              className="w-full md:w-auto text-center text-xl py-4 px-8"
            />

            {isFilled.link(settings?.data?.resume_link) && (
              <a
                href={settings.data.resume_link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gothic-button w-full md:w-auto text-center text-xl py-4 px-8"
              >
                Download Resume
              </a>
            )}

            <AnimatedSection
              animation="stagger"
              className="flex space-x-6 mt-8"
            >
              {settings?.data?.social_links &&
                settings.data.social_links.map(
                  (social, index) =>
                    isFilled.link(social.url) && (
                      <a
                        key={index}
                        href={social.url.url}
                        className="gothic-tooltip"
                        data-tooltip={social.platform}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-xl">{social.platform}</span>
                      </a>
                    )
                )}
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
