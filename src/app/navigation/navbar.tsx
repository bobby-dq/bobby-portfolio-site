import Link from "next/link";
import { NavbarProps } from "./navbar.props";

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-base bg-opacity-80 border-b border-ink-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-ink text-2xl mb-4 md:mb-0">
            Bobby Q.
          </Link>
          <nav>
            <ul className="flex space-x-8 uppercase tracking-wider text-sm">
              <li>
                <Link
                  href="#work"
                  className="hover:text-ink transition-colors"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-ink transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="hover:text-ink transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-ink transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
