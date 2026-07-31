"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface SaleData {
  month: string;
  sales: number;
}

function formatCurrency(value: number) {
  return `LKR ${value.toLocaleString("en-LK")}`;
}

export default function SalesOverview() {
  const [salesData, setSalesData] = useState<SaleData[]>([
    { month: "Jan", sales: 45000 },
    { month: "Feb", sales: 52000 },
    { month: "Mar", sales: 48000 },
    { month: "Apr", sales: 61000 },
    { month: "May", sales: 78000 },
    { month: "Jun", sales: 95000 },
    { month: "Jul", sales: 112000 },
    { month: "Aug", sales: 98000 },
    { month: "Sep", sales: 125000 },
    { month: "Oct", sales: 135000 },
    { month: "Nov", sales: 150000 },
    { month: "Dec", sales: 180000 },
  ]);

  useEffect(() => {
    async function getSales() {
      try {
        const res = await fetch(
          "/api/dashboard/sales-overview"
        );

        const data = await res.json();

        if (data.success) {
          setSalesData(
            data.sales || []
          );
        }
      } catch (error) {
        console.log(
          "Sales overview error:",
          error
        );
      }
    }

    getSales();
  }, []);

  return (
    <Card
      className="
        overflow-hidden
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
          Sales Overview
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
        <div className="h-[380px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={salesData}
              margin={{
                top: 20,
                right: 30,
                bottom: 20,
                left: 10,
              }}
            >
              <defs>
                <linearGradient
                  id="salesGradientLight"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#3B82F6"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#3B82F6"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="salesGradientDark"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#60A5FA"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#60A5FA"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="5 5"
                className="stroke-blue-200/40 dark:stroke-blue-900/20"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: 'currentColor',
                  fontSize: 13,
                  fontWeight: 500,
                }}
                className="text-blue-600/70 dark:text-slate-400"
                interval={0}
                padding={{ left: 10, right: 10 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: 'currentColor',
                  fontSize: 13,
                  fontWeight: 500,
                }}
                className="text-blue-600/70 dark:text-slate-400"
                tickFormatter={(value) =>
                  `${(value / 1000).toFixed(0)}k`
                }
                domain={[0, 140000]}
                ticks={[0, 35000, 70000, 105000, 140000]}
                padding={{ top: 20 }}
              />

              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  "Sales"
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  color: '#1e293b',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '12px 16px',
                }}
                labelStyle={{
                  color: '#64748b',
                  fontWeight: 600,
                  fontSize: '14px',
                  marginBottom: '4px',
                }}
                itemStyle={{
                  color: '#3B82F6',
                  fontWeight: 700,
                  fontSize: '18px',
                }}
                cursor={{
                  stroke: '#3B82F6',
                  strokeWidth: 2,
                  strokeDasharray: '5 5',
                  opacity: 0.4,
                }}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={3.5}
                fill="url(#salesGradientLight)"
                className="dark:stroke-blue-400 dark:fill-[url(#salesGradientDark)]"
                dot={{
                  fill: '#3B82F6',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  r: 5,
                }}
                activeDot={{
                  fill: '#3B82F6',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  r: 7,
                  className: 'dark:fill-blue-400'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}