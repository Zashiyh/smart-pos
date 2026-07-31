import UserSettings from "@/components/settings/user-settings";

export default function UsersPage() {
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
          User Settings
        </h1>
        <p
          className="
            text-blue-600/70
            dark:text-slate-400
            mt-1
          "
        >
          Manage users, roles, and permissions
        </p>
      </div>

      {/* User Settings */}
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
        <UserSettings />
      </div>
    </main>
  );
}