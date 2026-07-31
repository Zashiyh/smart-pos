import {
  Database,
  Server,
  Info,
  ShieldCheck,
  Cloud,
  CheckCircle,
  Clock,
  Cpu,
} from "lucide-react";

export default function SystemPage() {
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
          System Settings
        </h1>
        <p
          className="
            text-blue-600/70
            dark:text-slate-400
            mt-1
          "
        >
          Backup, database and application information
        </p>
      </div>

      {/* System Cards */}
      <div
        className="
          grid
          gap-6
          md:grid-cols-2
        "
      >
        {/* Database Card */}
        <div
          className="
            rounded-2xl
            border-0
            bg-white
            dark:bg-slate-800/90
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            backdrop-blur-sm
            border-blue-100/50
            dark:border-blue-900/30
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
              <Database
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
                  font-semibold
                  text-blue-900
                  dark:text-white
                "
              >
                Database
              </h2>
              <p
                className="
                  text-sm
                  text-blue-600/70
                  dark:text-slate-400
                "
              >
                MongoDB Atlas connection status
              </p>
            </div>
          </div>

          <div
            className="
              mt-5
              rounded-xl
              bg-emerald-50
              dark:bg-emerald-900/20
              border-2
              border-emerald-200
              dark:border-emerald-900/30
              p-4
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-emerald-700
              dark:text-emerald-400
              transition-colors
              duration-300
            "
          >
            <CheckCircle className="h-5 w-5" />
            Database Connected ✓
            <span
              className="
                ml-auto
                text-xs
                text-emerald-500/70
                dark:text-emerald-400/70
                flex
                items-center
                gap-1
              "
            >
              <Cloud className="h-3 w-3" />
              Cloud
            </span>
          </div>

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              text-xs
              text-blue-400/60
              dark:text-slate-500
            "
          >
            <span>Last backup: Today, 2:30 PM</span>
            <span>Status: Operational</span>
          </div>
        </div>

        {/* Application Card */}
        <div
          className="
            rounded-2xl
            border-0
            bg-white
            dark:bg-slate-800/90
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            backdrop-blur-sm
            border-blue-100/50
            dark:border-blue-900/30
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
              <Server
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
                  font-semibold
                  text-blue-900
                  dark:text-white
                "
              >
                Application
              </h2>
              <p
                className="
                  text-sm
                  text-blue-600/70
                  dark:text-slate-400
                "
              >
                SmartPOS Pro information
              </p>
            </div>
          </div>

          <div
            className="
              mt-5
              space-y-3
              text-sm
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                py-2
                border-b
                border-blue-100/50
                dark:border-blue-900/30
              "
            >
              <span className="text-blue-600/70 dark:text-slate-400">
                Version
              </span>
              <span className="font-medium text-blue-900 dark:text-white">
                1.0.0
              </span>
            </div>
            <div
              className="
                flex
                items-center
                justify-between
                py-2
                border-b
                border-blue-100/50
                dark:border-blue-900/30
              "
            >
              <span className="text-blue-600/70 dark:text-slate-400">
                Framework
              </span>
              <span className="font-medium text-blue-900 dark:text-white">
                Next.js 15
              </span>
            </div>
            <div
              className="
                flex
                items-center
                justify-between
                py-2
              "
            >
              <span className="text-blue-600/70 dark:text-slate-400">
                Database
              </span>
              <span className="font-medium text-blue-900 dark:text-white">
                MongoDB
              </span>
            </div>
          </div>
        </div>

        {/* Backup & Security Card */}
        <div
          className="
            rounded-2xl
            border-0
            bg-white
            dark:bg-slate-800/90
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            backdrop-blur-sm
            border-blue-100/50
            dark:border-blue-900/30
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
              <ShieldCheck
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
                  font-semibold
                  text-blue-900
                  dark:text-white
                "
              >
                Backup & Security
              </h2>
              <p
                className="
                  text-sm
                  text-blue-600/70
                  dark:text-slate-400
                "
              >
                Automatic backup and security controls
              </p>
            </div>
          </div>

          <p
            className="
              mt-5
              text-sm
              text-blue-500/60
              dark:text-slate-400
              leading-relaxed
            "
          >
            Automatic backup and security controls will be available here.
            Your data is encrypted and protected with industry-standard
            security protocols.
          </p>

          <div
            className="
              mt-4
              flex
              items-center
              gap-4
              text-xs
              text-blue-400/60
              dark:text-slate-500
            "
          >
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Auto-backup: Daily
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Encrypted
            </span>
          </div>
        </div>

        {/* System Information Card */}
        <div
          className="
            rounded-2xl
            border-0
            bg-white
            dark:bg-slate-800/90
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            backdrop-blur-sm
            border-blue-100/50
            dark:border-blue-900/30
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
              <Info
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
                  font-semibold
                  text-blue-900
                  dark:text-white
                "
              >
                System Information
              </h2>
              <p
                className="
                  text-sm
                  text-blue-600/70
                  dark:text-slate-400
                "
              >
                About SmartPOS Pro
              </p>
            </div>
          </div>

          <p
            className="
              mt-5
              text-sm
              text-blue-700
              dark:text-slate-300
              leading-relaxed
              font-medium
            "
          >
            SmartPOS Pro Point of Sale Management System
          </p>

          <div
            className="
              mt-4
              flex
              items-center
              gap-4
              text-xs
              text-blue-400/60
              dark:text-slate-500
            "
          >
            <span className="flex items-center gap-1">
              <Cpu className="h-3 w-3" />
              Next.js 15
            </span>
            <span className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              MongoDB
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Secure
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}