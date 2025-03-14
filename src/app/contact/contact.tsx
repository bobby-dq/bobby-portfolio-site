import React from "react";
import { ContactProps } from "./contact.props";
import AnimatedSection from "@/app/shared/animated-section";
import ContactButton from "@/app/shared/contact-button";
import { isFilled } from "@prismicio/client";
import { Github, Linkedin, Mail } from "lucide-react";

const Contact: React.FC<ContactProps> = ({ settings }) => {
  const githubLink = settings?.data?.social_links?.find(
    (x) => x.platform === "GitHub"
  );

  const linkedinLink = settings?.data?.social_links?.find(
    (x) => x.platform === "LinkedIn"
  );

  const emailLink = settings?.data?.social_links?.find(
    (x) => x.platform === "Email"
  );

  const githubUrl =
    githubLink?.url && isFilled.link(githubLink.url) ? githubLink.url.url : "#";

  const linkedinUrl =
    linkedinLink?.url && isFilled.link(linkedinLink.url)
      ? linkedinLink.url.url
      : "#";

  const emailUrl =
    emailLink?.url && isFilled.link(emailLink.url) ? emailLink.url.url : "#";

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

            {/* Social Media Icons */}
            <div className="mt-8 flex space-x-6">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-primary transition-colors p-2"
              >
                <Github size={24} />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-primary transition-colors p-2"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${emailUrl}`}
                className="text-ink hover:text-primary transition-colors p-2"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
