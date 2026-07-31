import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: any;
  description: string;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendUp,
  color = "from-blue-500 to-blue-600",
}: StatCardProps) {
  return (
    <Card
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
        overflow-hidden
        group
      "
    >
      <div
        className={`
          absolute
          top-0
          right-0
          w-32
          h-32
          bg-gradient-to-br
          ${color}
          opacity-5
          dark:opacity-10
          rounded-full
          transform
          translate-x-16
          -translate-y-16
          group-hover:scale-150
          transition-transform
          duration-500
        `}
      />

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          pb-2
          border-b
          border-blue-100/50
          dark:border-blue-900/30
        "
      >
        <CardTitle
          className="
            text-sm
            font-medium
            text-blue-600/70
            dark:text-slate-400
          "
        >
          {title}
        </CardTitle>

        <div
          className={`
            p-2
            rounded-xl
            bg-gradient-to-br
            ${color}
            text-white
            shadow-lg
          `}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <p
          className="
            text-3xl
            font-bold
            text-blue-900
            dark:text-white
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            text-sm
            text-blue-500/60
            dark:text-slate-400
          "
        >
          {description}
        </p>

        {trend && (
          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              pt-3
              border-t
              border-blue-100/50
              dark:border-blue-900/30
            "
          >
            <span
              className={`
                text-xs
                font-medium
                ${trendUp
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
                }
              `}
            >
              {trendUp ? '↑' : '↓'} {trend}
            </span>
            <span
              className="
                text-xs
                text-blue-400/60
                dark:text-slate-500
              "
            >
              vs last week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}