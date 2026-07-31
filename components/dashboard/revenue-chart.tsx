"use client";

import {
  Line,
  LineChart,
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

const revenueData = [
  {
    month: "Jan",
    revenue: 50000,
  },
  {
    month: "Feb",
    revenue: 75000,
  },
  {
    month: "Mar",
    revenue: 62000,
  },
  {
    month: "Apr",
    revenue: 95000,
  },
  {
    month: "May",
    revenue: 120000,
  },
  {
    month: "Jun",
    revenue: 150000,
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

export default function RevenueChart() {
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
          Revenue Overview
        </CardTitle>
        <p
          className="
            text-sm
            text-blue-600/70
            dark:text-slate-400
          "
        >
          Monthly revenue performance
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={revenueData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#3B82F6"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#3B82F6"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorRevenueDark" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#60A5FA"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#60A5FA"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-blue-200/30 dark:stroke-blue-900/20"
              />

              <XAxis
                dataKey="month"
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
                  stroke: '#3B82F6',
                  strokeWidth: 2,
                  strokeDasharray: '5 5',
                  opacity: 0.3,
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{
                  fill: '#3B82F6',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  r: 6,
                }}
                activeDot={{
                  fill: '#3B82F6',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  r: 8,
                }}
                className="dark:stroke-blue-400"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#3B82F6"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3B82F6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}