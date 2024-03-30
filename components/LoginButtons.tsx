import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

import type { Providers } from "./Navbar";

interface LoginButtonsProps {
  providers: Providers | null;
  showGoogleIcon?: boolean;
}

export default function LoginButtons({
  providers,
  showGoogleIcon,
}: LoginButtonsProps) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => {
          return (
            <button
              key={provider.id}
              className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              onClick={() => signIn(provider.id)}
            >
              {showGoogleIcon && <FaGoogle className="text-white mr-2" />}
              <span>Login or Register</span>
            </button>
          );
        })}
    </>
  );
}
