"use client";

import {
  Bell,
  Mail,
  ShoppingCart,
  Package,
  Save,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useState,
} from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    sales: true,
    lowStock: true,
    email: false,
    system: true,
  });

  function toggle(key: keyof typeof settings) {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  }

  return (
    <div
      className="
        rounded-2xl
        border-0
        bg-white
        dark:bg-slate-800/90
        p-6
        space-y-6
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        backdrop-blur-sm
        border-blue-100/50
        dark:border-blue-900/30
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-blue-100/50
          dark:border-blue-900/30
          pb-4
        "
      >
        <div
          className="
            rounded-xl
            bg-blue-100
            dark:bg-blue-900/30
            p-3
            transition-colors
            duration-300
          "
        >
          <Bell
            className="
              h-6
              w-6
              text-blue-600
              dark:text-blue-400
            "
          />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-semibold
              text-blue-900
              dark:text-white
            "
          >
            Notification Settings
          </h2>
          <p
            className="
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Manage system alerts and notifications
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Sales Notification */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border-2
            border-blue-100/50
            dark:border-blue-900/30
            p-4
            hover:bg-blue-50/30
            dark:hover:bg-slate-700/20
            transition-all
            duration-200
          "
        >
          <div className="flex gap-3 items-center">
            <div
              className="
                rounded-lg
                bg-blue-100
                dark:bg-blue-900/30
                p-2
                transition-colors
                duration-300
              "
            >
              <ShoppingCart
                className="
                  h-5
                  w-5
                  text-blue-600
                  dark:text-blue-400
                "
              />
            </div>

            <div>
              <h3
                className="
                  font-medium
                  text-blue-900
                  dark:text-white
                "
              >
                Sales Notifications
              </h3>
              <p
                className="
                  text-sm
                  text-blue-500/60
                  dark:text-slate-400
                "
              >
                Get alerts when new sales are completed
              </p>
            </div>
          </div>

          <button
            onClick={() => toggle("sales")}
            className={`
              h-7
              w-12
              rounded-full
              transition-all
              duration-300
              relative
              ${settings.sales
                ? "bg-blue-500 dark:bg-blue-500"
                : "bg-gray-300 dark:bg-slate-600"
              }
            `}
          >
            <div
              className={`
                h-5
                w-5
                rounded-full
                bg-white
                transition-all
                duration-300
                absolute
                top-1
                ${settings.sales
                  ? "translate-x-6"
                  : "translate-x-1"
                }
                shadow-md
              `}
            />
          </button>
        </div>

        {/* Low Stock */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border-2
            border-blue-100/50
            dark:border-blue-900/30
            p-4
            hover:bg-blue-50/30
            dark:hover:bg-slate-700/20
            transition-all
            duration-200
          "
        >
          <div className="flex gap-3 items-center">
            <div
              className="
                rounded-lg
                bg-red-100
                dark:bg-red-900/30
                p-2
                transition-colors
                duration-300
              "
            >
              <Package
                className="
                  h-5
                  w-5
                  text-red-600
                  dark:text-red-400
                "
              />
            </div>

            <div>
              <h3
                className="
                  font-medium
                  text-blue-900
                  dark:text-white
                "
              >
                Low Stock Alert
              </h3>
              <p
                className="
                  text-sm
                  text-blue-500/60
                  dark:text-slate-400
                "
              >
                Receive alerts when stock is low
              </p>
            </div>
          </div>

          <button
            onClick={() => toggle("lowStock")}
            className={`
              h-7
              w-12
              rounded-full
              transition-all
              duration-300
              relative
              ${settings.lowStock
                ? "bg-blue-500 dark:bg-blue-500"
                : "bg-gray-300 dark:bg-slate-600"
              }
            `}
          >
            <div
              className={`
                h-5
                w-5
                rounded-full
                bg-white
                transition-all
                duration-300
                absolute
                top-1
                ${settings.lowStock
                  ? "translate-x-6"
                  : "translate-x-1"
                }
                shadow-md
              `}
            />
          </button>
        </div>

        {/* Email */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border-2
            border-blue-100/50
            dark:border-blue-900/30
            p-4
            hover:bg-blue-50/30
            dark:hover:bg-slate-700/20
            transition-all
            duration-200
          "
        >
          <div className="flex gap-3 items-center">
            <div
              className="
                rounded-lg
                bg-blue-100
                dark:bg-blue-900/30
                p-2
                transition-colors
                duration-300
              "
            >
              <Mail
                className="
                  h-5
                  w-5
                  text-blue-600
                  dark:text-blue-400
                "
              />
            </div>

            <div>
              <h3
                className="
                  font-medium
                  text-blue-900
                  dark:text-white
                "
              >
                Email Notifications
              </h3>
              <p
                className="
                  text-sm
                  text-blue-500/60
                  dark:text-slate-400
                "
              >
                Send reports through email
              </p>
            </div>
          </div>

          <button
            onClick={() => toggle("email")}
            className={`
              h-7
              w-12
              rounded-full
              transition-all
              duration-300
              relative
              ${settings.email
                ? "bg-blue-500 dark:bg-blue-500"
                : "bg-gray-300 dark:bg-slate-600"
              }
            `}
          >
            <div
              className={`
                h-5
                w-5
                rounded-full
                bg-white
                transition-all
                duration-300
                absolute
                top-1
                ${settings.email
                  ? "translate-x-6"
                  : "translate-x-1"
                }
                shadow-md
              `}
            />
          </button>
        </div>
      </div>

      <Button
        className="
          w-full
          rounded-xl
          bg-gradient-to-r
          from-blue-500
          to-blue-600
          dark:from-blue-600
          dark:to-blue-700
          text-white
          hover:shadow-lg
          hover:shadow-blue-500/30
          dark:hover:shadow-blue-600/20
          transition-all
          duration-300
          font-semibold
          h-12
          text-base
          flex
          items-center
          gap-2
        "
      >
        <Save className="h-4 w-4" />
        Save Notification Settings
      </Button>
    </div>
  );
}