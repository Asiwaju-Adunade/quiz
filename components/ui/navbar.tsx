"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./button";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    // parent div
    <nav className="border-b border-quiz-light-gray mx-auto max-w-6xl">
      <div className="flex items-center justify-between  px-5 py-3">
        {/* Logo part */}
        <Image src="/svgs/logo.svg" alt="logo" width={150} height={50} />

        {/* Hamburger Menu (Mobile Only) */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* Desktop view */}
        <div className="hidden md:flex gap-10 items-center cursor-pointer">
          <Link
            href="/how-it-works"
            className="hover:text-quiz-light-gray transition duration-200"
          >
            How it works?
          </Link>

          <Link
            href="/features"
            className="hover:text-quiz-light-gray transition duration-200"
          >
            Features
          </Link>

          <Link
            href="/"
            className="hover:text-quiz-light-gray transition duration-200"
          >
            About us
          </Link>

            {/* login/logout button */}
          {user ? (
            <Button
              variant="secondary"
              label="Logout"
              onClick={handleSignOut}
            />
          ) : (
            <Link href="/login">
              <Button variant="secondary" label="Login" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile view */}
      {open && (
        <div className="flex flex-col gap-10 px-5 pb-5 mt-2 md:hidden">
          <Link
            href="/how-it-works"
            className="hover:text-quiz-light-gray transition duration-200"
          >
            How it works
          </Link>

          <Link
            href="/features"
            className="hover:text-quiz-light-gray transition duration-200"
          >
            Features
          </Link>

          {/* <Link
            href="/"
            className="hover:text-quiz-light-gray transition duration-200"
          >
            About us
          </Link> */}

          {/* login/logout button part*/}
          <div>
            {user ? (
              <Button
                variant="secondary"
                label="Logout"
                onClick={handleSignOut}
              />
            ) : (
              <Link href="/login">
                <Button variant="secondary" label="Login" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
