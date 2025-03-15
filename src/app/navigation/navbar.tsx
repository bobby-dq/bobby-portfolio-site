import Link from "next/link";
import { NavbarProps } from "./navbar.props";
import Image from "next/image";
import { Menu } from "lucide-react";
import gsap from "gsap";

const Navbar: React.FC<NavbarProps> = ({
  settings,
  isScrolled,
  navItems,
  setCurrentSection,
  setIsExpandedSidebar,
}) => {
  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    const target = document.getElementById(sectionId);

    if (target) {
      gsap.to(window, {
        duration: 0.33,
        scrollTo: {
          y: target,
        },
        ease: "power3.inOut",
      });
    }
  };

  const handleMobileMenuClick = () => {
    setIsExpandedSidebar(true);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 bg-transparent transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-row justify-between items-center">
          <Link href="/" className="mb-4 md:mb-0 ml-12">
            {settings?.data?.logo?.url ? (
              <div className="w-auto h-8 md:h-10">
                <Image
                  src="/api/icon/bobby-logo"
                  alt={settings.data.site_title || "Bobby Quilacio"}
                  width={100}
                  height={40}
                  className="h-full w-auto"
                />
              </div>
            ) : (
              <span className="text-ink text-2xl">Bobby Q.</span>
            )}
          </Link>

          <nav
            className={`${
              !isScrolled ? "hidden md:block" : "hidden"
            } transition-all duration-300`}
          >
            <ul className="flex space-x-4 uppercase tracking-wider text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSectionClick(item.id)}
                    className="hover:text-ink text-primary transition-colors text-lg lowercase"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`${
              isScrolled ? "block" : "block md:hidden"
            } transition-all duration-300`}
          >
            <button
              onClick={handleMobileMenuClick}
              className="text-ink p-2 hover:text-opacity-80 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
