"use client";

import {
  Search,
  Bell,
  UserCircle,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ThemeToggle from "../theme-toggle";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          "/api/auth/me",
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("User fetch error:", error);
      }
    }
    getUser();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      className="
        fixed
        right-0
        top-0
        z-50
        flex
        h-20
        items-center
        justify-between
        border-b
        bg-background/80
        dark:bg-slate-900/80
        px-6
        backdrop-blur-xl
        lg:left-72
        transition-colors
        duration-300
        border-gray-200
        dark:border-slate-700
      "
    >
      {/* Search */}
      <div
        className="
          flex
          h-11
          w-full
          max-w-lg
          items-center
          gap-3
          rounded-2xl
          border
          bg-muted/30
          dark:bg-slate-800/50
          dark:border-slate-700
          px-4
          transition-colors
          duration-300
          focus-within:ring-2
          focus-within:ring-blue-500
          focus-within:border-transparent
        "
      >
        <Search
          className="
            h-5
            w-5
            text-muted-foreground
            dark:text-slate-400
          "
        />
        <input
          type="text"
          placeholder="Search products, sales..."
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
            text-gray-900
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-slate-500
          "
        />
      </div>

      {/* Actions */}
      <div
        className="
          ml-4
          flex
          items-center
          gap-3
        "
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification */}
        <button
          type="button"
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            dark:border-slate-700
            hover:bg-muted
            dark:hover:bg-slate-800
            transition-colors
            duration-300
            text-gray-700
            dark:text-slate-300
          "
        >
          <Bell className="h-5 w-5" />
          <span
            className="
              absolute
              right-2
              top-2
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
              animate-pulse
            "
          />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              dark:border-slate-700
              px-3
              py-2
              hover:bg-muted
              dark:hover:bg-slate-800
              transition-colors
              duration-300
            "
          >
            <UserCircle
              className="
                h-7
                w-7
                text-primary
                dark:text-blue-400
              "
            />

            <div className="hidden text-left md:block">
              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                {user?.role || "User"}
              </p>
              <p
                className="
                  text-xs
                  text-muted-foreground
                  dark:text-slate-400
                "
              >
                {user?.email || "Loading..."}
              </p>
            </div>

            <ChevronDown
              className="
                h-4
                w-4
                text-gray-600
                dark:text-slate-400
              "
            />
          </button>

          {open && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-64
                rounded-2xl
                border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                p-3
                shadow-xl
                dark:shadow-slate-900/50
                animate-in
                fade-in
                slide-in-from-top-2
                duration-200
              "
            >
              {/* User Info */}
              <div
                className="
                  mb-3
                  border-b
                  border-gray-200
                  dark:border-slate-700
                  pb-3
                "
              >
                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.name || "User"}
                </p>
                <p
                  className="
                    text-sm
                    text-muted-foreground
                    dark:text-slate-400
                  "
                >
                  {user?.email || "Loading..."}
                </p>
                <p
                  className="
                    mt-1
                    text-xs
                    text-muted-foreground
                    dark:text-slate-500
                  "
                >
                  Role: {user?.role || "User"}
                </p>
              </div>

              {/* Profile */}
              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  p-3
                  hover:bg-muted
                  dark:hover:bg-slate-700
                  transition-colors
                  duration-200
                  text-gray-700
                  dark:text-slate-300
                "
              >
                <User className="h-5 w-5" />
                Profile
              </button>

              <div
                className="
                  my-2
                  border-t
                  border-gray-200
                  dark:border-slate-700
                "
              />

              {/* Logout */}
              <button
                type="button"
                onClick={logout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  p-3
                  text-red-500
                  hover:bg-red-500/10
                  dark:hover:bg-red-500/20
                  transition-colors
                  duration-200
                "
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}