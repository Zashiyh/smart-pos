"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="icon"
          className="
            rounded-full
            border-2
            border-blue-200
            dark:border-blue-900/30
            bg-white
            dark:bg-slate-800
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            hover:text-blue-600
            dark:hover:text-blue-400
            transition-all
            duration-300
            h-11
            w-11
          "
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          ) : theme === "light" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Monitor className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          )}

          <span className="sr-only">
            Change theme
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          rounded-2xl
          border-0
          shadow-lg
          bg-white
          dark:bg-slate-800/95
          backdrop-blur-sm
          p-2
          min-w-[160px]
        "
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="
            rounded-xl
            px-4
            py-2.5
            cursor-pointer
            text-blue-700
            dark:text-slate-300
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            transition-colors
            duration-200
            flex
            items-center
            gap-2
          "
        >
          <Sun className="h-4 w-4 text-yellow-500" />
          Light
          {theme === "light" && (
            <span className="ml-auto text-xs text-blue-500 dark:text-blue-400">
              ✓
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="
            rounded-xl
            px-4
            py-2.5
            cursor-pointer
            text-blue-700
            dark:text-slate-300
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            transition-colors
            duration-200
            flex
            items-center
            gap-2
          "
        >
          <Moon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          Dark
          {theme === "dark" && (
            <span className="ml-auto text-xs text-blue-500 dark:text-blue-400">
              ✓
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="
            rounded-xl
            px-4
            py-2.5
            cursor-pointer
            text-blue-700
            dark:text-slate-300
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            transition-colors
            duration-200
            flex
            items-center
            gap-2
          "
        >
          <Monitor className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          System
          {theme === "system" && (
            <span className="ml-auto text-xs text-blue-500 dark:text-blue-400">
              ✓
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}