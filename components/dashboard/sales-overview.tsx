"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";


const salesData = [
  {
    month: "Jan",
    sales: 12000,
  },
  {
    month: "Feb",
    sales: 18000,
  },
  {
    month: "Mar",
    sales: 15000,
  },
  {
    month: "Apr",
    sales: 24000,
  },
  {
    month: "May",
    sales: 28000,
  },
  {
    month: "Jun",
    sales: 32000,
  },
];



function formatCurrency(value:number){

  return new Intl.NumberFormat(
    "en-GB",
    {
      style:"currency",
      currency:"GBP",
      maximumFractionDigits:0,
    }
  ).format(value);

}





export default function SalesOverview(){


  return (

    <Card
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-card/80
        backdrop-blur-xl
        shadow-sm
      "
    >


      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >

        <div>

          <CardTitle
            className="
              text-xl
              font-semibold
            "
          >
            Sales Overview
          </CardTitle>


          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            Monthly revenue performance
          </p>

        </div>


      </CardHeader>




      <CardContent>


        <div
          className="
            h-[380px]
            w-full
          "
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >


            <AreaChart
              data={salesData}
            >


              <defs>

                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="currentColor"
                    stopOpacity={0.25}
                  />


                  <stop
                    offset="95%"
                    stopColor="currentColor"
                    stopOpacity={0}
                  />


                </linearGradient>


              </defs>




              <CartesianGrid
                strokeDasharray="4 4"
                opacity={0.2}
              />



              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />



              <YAxis

                tickLine={false}

                axisLine={false}

                tickFormatter={(value)=>`${value / 1000}k`}

              />




              <Tooltip

                formatter={(value)=>[
                  formatCurrency(Number(value)),
                  "Sales"
                ]}

                contentStyle={{
                  borderRadius:"12px",
                  border:"1px solid hsl(var(--border))",
                  background:"hsl(var(--background))",
                }}

              />




              <Area

                type="monotone"

                dataKey="sales"

                stroke="currentColor"

                fill="url(#salesGradient)"

                strokeWidth={3}

                className="
                  text-primary
                "

                animationDuration={1200}

              />


            </AreaChart>


          </ResponsiveContainer>


        </div>


      </CardContent>


    </Card>

  );
}