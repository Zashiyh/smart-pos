"use client";

import {
  UserCircle,
  LogOut,
} from "lucide-react";

export default function UserMenu() {
  return (
    <div
      className="
        border-t
        p-4
        border-blue-100/50
        dark:border-blue-900/30
        transition-colors
        duration-300
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          p-3
          border-blue-100/50
          dark:border-blue-900/30
          bg-blue-50/50
          dark:bg-slate-800/50
          hover:bg-blue-100/50
          dark:hover:bg-slate-700/50
          transition-colors
          duration-300
          cursor-pointer
        "
      >
        <UserCircle
          className="
            h-10
            w-10
            text-blue-500
            dark:text-blue-400
          "
        />

        <div
          className="
            flex-1
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-blue-900
              dark:text-white
            "
          >
            Admin
          </p>
          <p
            className="
              text-xs
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Administrator
          </p>
        </div>

        <LogOut
          className="
            h-4
            w-4
            text-blue-400
            dark:text-slate-500
            hover:text-red-500
            dark:hover:text-red-400
            transition-colors
            duration-200
          "
        />
      </div>

      <p
        className="
          mt-4
          text-center
          text-xs
          text-blue-400
          dark:text-slate-500
        "
      >
        SmartPOS Pro v1.0
      </p>
    </div>
  );
}