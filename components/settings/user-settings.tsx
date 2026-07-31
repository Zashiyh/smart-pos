import {
  UserRound,
  Users,
  Shield,
  UserCog,
  UserPlus,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

import Link from "next/link";

export default function UsersSettingsPage() {
  // Sample employee data
  const employees = [
    {
      id: 1,
      name: "Kasthuri Perera",
      email: "kasthuri@smartpos.com",
      role: "Admin",
      phone: "+94 77 123 4567",
      joined: "Jan 2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Saman Kumara",
      email: "saman@smartpos.com",
      role: "Manager",
      phone: "+94 71 234 5678",
      joined: "Mar 2024",
      status: "Active",
    },
    {
      id: 3,
      name: "Nimal Perera",
      email: "nimal@smartpos.com",
      role: "Cashier",
      phone: "+94 70 345 6789",
      joined: "Jun 2024",
      status: "Inactive",
    },
  ];

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
          User & Roles
        </h1>
        <p
          className="
            text-blue-600/70
            dark:text-slate-400
            mt-1
          "
        >
          Manage employees and permissions
        </p>
      </div>

      {/* User Management */}
      <div
        className="
          rounded-2xl
          border-0
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          bg-white
          dark:bg-slate-800/90
          backdrop-blur-sm
          border-blue-100/50
          dark:border-blue-900/30
          p-6
        "
      >
        {/* Header with Add Button */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-blue-100/50
            dark:border-blue-900/30
            pb-4
          "
        >
          <div className="flex items-center gap-3">
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
              <UserRound
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
                Employees
              </h2>
              <p
                className="
                  text-sm
                  text-blue-600/70
                  dark:text-slate-400
                "
              >
                Manage your team members and their roles
              </p>
            </div>
          </div>

          <button
            className="
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              dark:from-blue-600
              dark:to-blue-700
              text-white
              px-4
              py-2
              text-sm
              font-medium
              hover:shadow-lg
              hover:shadow-blue-500/30
              dark:hover:shadow-blue-600/20
              transition-all
              duration-300
              flex
              items-center
              gap-2
            "
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* Employee List */}
        <div className="mt-5 space-y-3">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="
                group
                flex
                items-center
                justify-between
                rounded-xl
                border-2
                border-blue-100/50
                dark:border-blue-900/30
                p-4
                hover:bg-blue-50/50
                dark:hover:bg-slate-700/30
                transition-all
                duration-200
              "
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    dark:bg-blue-900/30
                    text-blue-700
                    dark:text-blue-400
                    font-semibold
                    text-lg
                    transition-colors
                    duration-300
                  "
                >
                  {employee.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3
                      className="
                        font-medium
                        text-blue-900
                        dark:text-white
                      "
                    >
                      {employee.name}
                    </h3>
                    <span
                      className={`
                        text-xs
                        font-medium
                        px-2
                        py-0.5
                        rounded-full
                        ${
                          employee.status === "Active"
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        }
                      `}
                    >
                      {employee.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span
                      className="
                        text-sm
                        text-blue-500/60
                        dark:text-slate-400
                        flex
                        items-center
                        gap-1
                      "
                    >
                      <Mail className="h-3 w-3" />
                      {employee.email}
                    </span>
                    <span
                      className="
                        text-sm
                        text-blue-500/60
                        dark:text-slate-400
                        flex
                        items-center
                        gap-1
                      "
                    >
                      <Phone className="h-3 w-3" />
                      {employee.phone}
                    </span>
                    <span
                      className="
                        text-sm
                        text-blue-500/60
                        dark:text-slate-400
                        flex
                        items-center
                        gap-1
                      "
                    >
                      <Calendar className="h-3 w-3" />
                      Joined {employee.joined}
                    </span>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-lg
                    bg-blue-50
                    dark:bg-blue-900/20
                    text-blue-700
                    dark:text-blue-400
                    text-sm
                    font-medium
                  "
                >
                  <Shield className="h-3.5 w-3.5" />
                  {employee.role}
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
                  ml-2
                  flex-shrink-0
                "
              />
            </div>
          ))}
        </div>

        {/* Role Management */}
        <div
          className="
            mt-6
            rounded-xl
            border-2
            border-blue-100/50
            dark:border-blue-900/30
            p-4
            bg-blue-50/30
            dark:bg-slate-700/10
          "
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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
                <UserCog
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
                  Role Management
                </h3>
                <p
                  className="
                    text-sm
                    text-blue-500/60
                    dark:text-slate-400
                  "
                >
                  Manage user roles and permissions
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/settings/users/roles"
              className="
                text-sm
                font-medium
                text-blue-600
                dark:text-blue-400
                hover:text-blue-700
                dark:hover:text-blue-300
                transition-colors
                duration-200
                flex
                items-center
                gap-1
              "
            >
              Manage Roles
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className="
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                bg-blue-100
                dark:bg-blue-900/30
                text-blue-700
                dark:text-blue-400
              "
            >
              Admin
            </span>
            <span
              className="
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                bg-blue-100
                dark:bg-blue-900/30
                text-blue-700
                dark:text-blue-400
              "
            >
              Manager
            </span>
            <span
              className="
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                bg-blue-100
                dark:bg-blue-900/30
                text-blue-700
                dark:text-blue-400
              "
            >
              Cashier
            </span>
            <span
              className="
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                bg-gray-100
                dark:bg-slate-700/30
                text-gray-600
                dark:text-slate-400
              "
            >
              +2 more
            </span>
          </div>
        </div>

        <div
          className="
            mt-6
            rounded-xl
            bg-blue-50/50
            dark:bg-blue-900/10
            border-2
            border-blue-100/50
            dark:border-blue-900/30
            p-4
          "
        >
          <p
            className="
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            👥 Manage your team members, assign roles, and control access
            permissions. Only administrators can manage users.
          </p>
        </div>
      </div>
    </main>
  );
}