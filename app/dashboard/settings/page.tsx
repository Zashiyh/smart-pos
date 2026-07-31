import Link from "next/link";

import {
  Store,
  UserRound,
  ShieldCheck,
  Bell,
  Palette,
  Database,
  Settings,
  ChevronRight,
} from "lucide-react";

const settingsCards = [
  {
    title: "Store Settings",
    description: "Manage store information, currency and invoice settings",
    icon: Store,
    link: "/dashboard/settings/store",
  },
  {
    title: "User & Roles",
    description: "Manage employees and user permissions",
    icon: UserRound,
    link: "/dashboard/settings/users",
  },
  {
    title: "Security",
    description: "Password, authentication and account security",
    icon: ShieldCheck,
    link: "/dashboard/settings/security",
  },
  {
    title: "Notifications",
    description: "Manage alerts and system notifications",
    icon: Bell,
    link: "/dashboard/settings/notifications",
  },
  {
    title: "Appearance",
    description: "Theme and interface customization",
    icon: Palette,
    link: "/dashboard/settings/appearance",
  },
  {
    title: "System",
    description: "Backup, database and application information",
    icon: Database,
    link: "/dashboard/settings/system",
  },
];

export default function SettingsPage() {
  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-50/50
        via-white
        to-blue-100/30
        dark:from-slate-900
        dark:via-slate-800
        dark:to-blue-950/50
        p-6
        space-y-8
        transition-colors
        duration-300
      "
    >
      {/* Header */}
      <div>
        <h1
          className="
            text-4xl
            font-bold
            bg-gradient-to-r
            from-blue-600
            to-blue-800
            dark:from-white
            dark:to-blue-200
            bg-clip-text
            text-transparent
          "
        >
          Settings
        </h1>
        <p
          className="
            text-blue-600/70
            dark:text-slate-400
            mt-1
            flex
            items-center
            gap-2
          "
        >
          <Settings className="w-4 h-4" />
          Manage your SmartPOS Pro configuration
        </p>
      </div>

      {/* Settings Cards */}
      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {settingsCards.map((item) => (
          <Link
            href={item.link}
            key={item.title}
            className="block group"
          >
            <div
              className="
                cursor-pointer
                rounded-2xl
                border-0
                bg-white
                dark:bg-slate-800/90
                p-6
                transition-all
                duration-300
                hover:shadow-lg
                hover:scale-[1.02]
                shadow-sm
                backdrop-blur-sm
                border-blue-100/50
                dark:border-blue-900/30
                relative
                overflow-hidden
              "
            >
              {/* Background gradient effect */}
              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-32
                  h-32
                  bg-gradient-to-br
                  from-blue-500/5
                  to-blue-600/5
                  dark:from-blue-400/5
                  dark:to-blue-500/5
                  rounded-full
                  transform
                  translate-x-16
                  -translate-y-16
                  group-hover:scale-150
                  transition-transform
                  duration-500
                "
              />

              <div
                className="
                  flex
                  items-center
                  justify-between
                  relative
                  z-10
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    flex-1
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-100
                      dark:bg-blue-900/30
                      transition-colors
                      duration-300
                      group-hover:bg-blue-200
                      dark:group-hover:bg-blue-900/50
                    "
                  >
                    <item.icon
                      className="
                        h-7
                        w-7
                        text-blue-600
                        dark:text-blue-400
                        transition-colors
                        duration-300
                      "
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        font-semibold
                        text-lg
                        text-blue-900
                        dark:text-white
                        group-hover:text-blue-700
                        dark:group-hover:text-blue-300
                        transition-colors
                        duration-300
                      "
                    >
                      {item.title}
                    </h2>
                    <p
                      className="
                        mt-1
                        text-sm
                        text-blue-600/70
                        dark:text-slate-400
                        line-clamp-2
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className="
                    h-5
                    w-5
                    text-blue-300
                    dark:text-slate-600
                    group-hover:text-blue-500
                    dark:group-hover:text-blue-400
                    group-hover:translate-x-1
                    transition-all
                    duration-300
                    flex-shrink-0
                    ml-2
                  "
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}