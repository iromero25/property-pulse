import { usePathname } from "next/navigation";
import Link from "next/link";
import LoginButtons from "./LoginButtons";
import { Providers } from "./Navbar";

interface MobileMenuProps {
  providers: Providers | null;
  isLoggedIn: boolean;
}

export default function MobileMenu({ providers, isLoggedIn }: MobileMenuProps) {
  const pathname = usePathname();

  const getButtonClassName = (path: string) => {
    const className =
      "text-white hover:text-white block rounded-md px-3 py-2 text-base font-medium";
    if (pathname === path) {
      return `bg-black ${className}`;
    }
    return className;
  };

  return (
    <div id="mobile-menu" className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Link href="/" className={getButtonClassName("/")}>
          Home
        </Link>
        <Link href="/properties" className={getButtonClassName("/properties")}>
          Properties
        </Link>
        {isLoggedIn && (
          <Link
            href="/properties/add"
            className={getButtonClassName("/properties/add")}
          >
            Add Property
          </Link>
        )}
        {!isLoggedIn && <LoginButtons providers={providers} />}
      </div>
    </div>
  );
}
