"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutBtn from "./LogoutBtn";

type MobileMenuProps = {
  user: {
    username: string;
  } | null;
};

const MobileMenu = ({ user }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Hamburger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-10 w-10"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-[280px] max-w-[85vw] bg-secondary shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <span className="text-xl font-semibold">Blogify</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={closeMenu}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col p-5 gap-3">

          <Link href="/" onClick={closeMenu}>
            <Button
              variant="secondary"
              className="w-full justify-start rounded-xl"
            >
              Home
            </Button>
          </Link>

          <Link href="/blogs" onClick={closeMenu}>
            <Button
              variant="secondary"
              className="w-full justify-start rounded-xl"
            >
              Blogs
            </Button>
          </Link>

          <Link href="/" onClick={closeMenu}>
            <Button
              variant="secondary"
              className="w-full justify-start rounded-xl"
            >
              About
            </Button>
          </Link>

          <div className="my-3 border-t" />

          {user ? (
            <>
              <Link href="/create" onClick={closeMenu}>
                <Button
                  variant="secondary"
                  className="w-full justify-start rounded-xl"
                >
                  Create Post
                </Button>
              </Link>

              <Button
                variant="secondary"
                className="w-full justify-start rounded-xl hover:bg-transparent"
              >
                Welcome, {user.username.split(" ")[0]}
              </Button>

              <div onClick={closeMenu}>
                <LogoutBtn />
              </div>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeMenu}>
                <Button
                  variant="secondary"
                  className="w-full justify-start rounded-xl"
                >
                  Log in
                </Button>
              </Link>

              <Link href="/signup" onClick={closeMenu}>
                <Button
                  variant="default"
                  className="w-full justify-start rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;