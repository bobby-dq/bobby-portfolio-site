import { Github, Linkedin, Mail } from "lucide-react";
import { FooterProps } from "./footer.props";
import { isFilled } from "@prismicio/client";

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="mt-12 ml-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-ink-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} {settings.data.site_title}. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
