"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const salesData = [
  {
    name: "Mon",
    sales: 12000,
  },
  {
    name: "Tue",
    sales: 18000,
  },
  {
    name: "Wed",
    sales: 15000,
  },
  {
    name: "Thu",
    sales: 22000,
  },
  {
    name: "Fri",
    sales: 30000,
  },
  {
    name: "Sat",
    sales: 25000,
  },
  {
    name: "Sun",
    sales: 35000,
  },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="
        bg-white
        dark:bg-slate-800
        border
        border-blue-200
        dark:border-blue-900/30
        rounded-xl
        p-4
        shadow-lg
        transition-colors
        duration-300
      ">
        <p className="text-sm font-semibold text-blue-900 dark:text-white">
          {label}
        </p>
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
          LKR {payload[0].value.toLocaleString("en-LK")}
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
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
      "
    >
      <CardHeader className="border-b border-blue-100/50 dark:border-blue-900/30 pb-4">
        <CardTitle
          className="
            text-xl
            font-semibold
            text-blue-900
            dark:text-white
          "
        >
          Weekly Sales
        </CardTitle>
        <p
          className="
            text-sm
            text-blue-600/70
            dark:text-slate-400
          "
        >
          Sales performance by day
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={salesData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 0,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#3B82F6"
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="95%"
                    stopColor="#3B82F6"
                    stopOpacity={0.6}
                  />
                </linearGradient>
                <linearGradient id="colorSalesDark" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#60A5FA"
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="95%"
                    stopColor="#60A5FA"
                    stopOpacity={0.6}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-blue-200/30 dark:stroke-blue-900/20"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: 'currentColor',
                  fontSize: 12,
                  fontWeight: 500,
                }}
                className="text-blue-600/70 dark:text-slate-400"
                axisLine={{
                  stroke: 'currentColor',
                  strokeOpacity: 0.2,
                }}
                tickLine={{
                  stroke: 'currentColor',
                  strokeOpacity: 0.2,
                }}
              />

              <YAxis
                tick={{
                  fill: 'currentColor',
                  fontSize: 12,
                  fontWeight: 500,
                }}
                className="text-blue-600/70 dark:text-slate-400"
                axisLine={{
                  stroke: 'currentColor',
                  strokeOpacity: 0.2,
                }}
                tickLine={{
                  stroke: 'currentColor',
                  strokeOpacity: 0.2,
                }}
                tickFormatter={(value) =>
                  `LKR ${(value / 1000).toFixed(0)}K`
                }
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: '#3B82F6',
                  opacity: 0.05,
                }}
              />

              <Bar
                dataKey="sales"
                fill="#3B82F6"
                className="dark:fill-blue-400"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              >
                {salesData.map((entry, index) => (
                  <defs key={index}>
                    <linearGradient id={`barGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#3B82F6"
                        stopOpacity={0.9}
                      />
                      <stop
                        offset="95%"
                        stopColor="#3B82F6"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}