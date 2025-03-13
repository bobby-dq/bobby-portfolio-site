import Link from "next/link";
import { NavbarProps } from "./navbar.props";
import Image from "next/image";

const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-base bg-opacity-80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="mb-4 md:mb-0">
            {settings?.data?.logo?.url ? (
              <div className="w-auto h-8 md:h-10">
                <Image
                  src={settings.data.logo.url}
                  alt={settings.data.site_title || "Bobby Quilacio"}
                  width={100}
                  height={40}
                  className="h-full w-auto text-primary [&>path]:fill-primary"
                  style={{ filter: "invert(var(--tw-text-opacity))" }}
                />
              </div>
            ) : (
              <span className="text-ink text-2xl">Bobby Q.</span>
            )}
          </Link>
          <nav>
            <ul className="flex space-x-8 uppercase tracking-wider text-sm">
              <li>
                <Link href="#work" className="hover:text-ink transition-colors">
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
