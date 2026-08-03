export default function Loading() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-50/50
        via-white
        to-blue-100/30
        dark:from-slate-900
        dark:via-slate-800
        dark:to-blue-950/50
        transition-colors
        duration-300
        relative
        overflow-hidden
      "
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/20 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-indigo-400/30 rounded-full animate-[float_6s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-[float_6s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-indigo-300/30 rounded-full animate-[float_6s_ease-in-out_infinite_1.5s]" />
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-md mx-auto">
        {/* Logo */}
        <div className="relative">
          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              dark:from-blue-600
              dark:to-indigo-700
              shadow-2xl
              shadow-blue-500/40
              dark:shadow-blue-600/30
              relative
            "
          >
            <span className="text-4xl text-white font-bold tracking-tight">
              P
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20 animate-pulse" />
          </div>

          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100 shadow-lg shadow-blue-400/30" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300 shadow-lg shadow-indigo-400/30" />
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-500" />
          <div className="absolute top-1/2 -left-4 w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-700" />
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <h1
            className="
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-blue-800
              dark:from-white
              dark:via-blue-200
              dark:to-blue-300
              bg-clip-text
              text-transparent
              animate-pulse
            "
          >
            SmartPOS
            <span
              className="
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                dark:from-blue-400
                dark:to-indigo-400
                bg-clip-text
                text-transparent
              "
            >
              Pro
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span
              className="
                text-xs
                text-blue-600/50
                dark:text-slate-400
                font-medium
                tracking-wider
                uppercase
                animate-pulse
                delay-150
              "
            >
              {`Loading`}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse delay-500" />
          </div>
        </div>

        {/* Progress Bar - Auto updates based on load time */}
        <div className="w-64 mx-auto space-y-3">
          <div
            className="
              h-1.5
              w-full
              rounded-full
              bg-blue-200/50
              dark:bg-slate-700/50
              overflow-hidden
              relative
              shadow-inner
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                dark:from-blue-400
                dark:to-indigo-400
                animate-[loading_2s_ease-in-out_infinite]
              "
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <span
              className="
                text-[10px]
                text-blue-400/50
                dark:text-slate-500
                font-medium
                uppercase
                tracking-wider
                animate-pulse
              "
            >
              {`Initializing`}
            </span>
            <span
              className="
                text-[10px]
                text-blue-400/50
                dark:text-slate-500
                font-medium
                uppercase
                tracking-wider
                animate-pulse
                delay-300
              "
            >
              <span className="inline-block animate-[pulse_1.5s_ease-in-out_infinite]">•••</span>
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-blue-500
              dark:bg-blue-400
              animate-bounce
              delay-0
              shadow-lg
              shadow-blue-500/30
              dark:shadow-blue-400/20
            "
          />
          <div
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-indigo-500
              dark:bg-indigo-400
              animate-bounce
              delay-150
              shadow-lg
              shadow-indigo-500/30
              dark:shadow-indigo-400/20
            "
          />
          <div
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-blue-500
              dark:bg-blue-400
              animate-bounce
              delay-300
              shadow-lg
              shadow-blue-500/30
              dark:shadow-blue-400/20
            "
          />
        </div>

        {/* Version */}
        <div className="space-y-1.5">
          <p
            className="
              text-[10px]
              text-blue-300/40
              dark:text-slate-600
              font-mono
              tracking-wider
              animate-pulse
              delay-500
            "
          >
            v1.0.0 • Next.js 15 • MongoDB
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes loading {
            0% {
              width: 0%;
              transform: translateX(-100%);
            }
            50% {
              width: 75%;
              transform: translateX(0%);
            }
            100% {
              width: 100%;
              transform: translateX(100%);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            25% {
              transform: translateY(-10px) rotate(90deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 0.8;
            }
            75% {
              transform: translateY(-10px) rotate(270deg);
              opacity: 0.6;
            }
          }
        `}
      </style>
    </main>
  );
}