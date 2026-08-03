"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function UnauthorizedPopup() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[420px] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl p-6 animate-in zoom-in-95 duration-300">

        <div className="flex items-center gap-4">

          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-red-600">
              Access Denied
            </h2>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              You don't have permission to access this page.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}