"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  item: any;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;

  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`
        group
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-sm
        font-medium
        transition-all
        duration-300
        ${
          active
            ? `
              bg-blue-500
              dark:bg-blue-600
              text-white
              shadow-lg
              shadow-blue-500/30
              dark:shadow-blue-600/20
            `
            : `
              text-blue-600/70
              dark:text-slate-400
              hover:bg-blue-50
              dark:hover:bg-slate-800/50
              hover:text-blue-700
              dark:hover:text-slate-200
            `
        }
      `}
    >
      <div
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          ${
            active
              ? `
                bg-white/20
                dark:bg-white/10
              `
              : `
                bg-blue-50
                dark:bg-slate-800/50
                group-hover:bg-blue-100
                dark:group-hover:bg-slate-700/50
              `
          }
        `}
      >
        <Icon
          className={`
            h-5
            w-5
            ${
              active
                ? `
                  text-white
                  dark:text-white
                `
                : `
                  text-blue-500
                  dark:text-slate-400
                  group-hover:text-blue-600
                  dark:group-hover:text-slate-300
                `
            }
          `}
        />
      </div>

      <span>{item.title}</span>
    </Link>
  );
}