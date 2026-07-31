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



export default function SalesChart(){


return (

<Card className="rounded-2xl">

<CardHeader>

<CardTitle>
Weekly Sales
</CardTitle>

</CardHeader>


<CardContent>


<div className="h-[300px]">


<ResponsiveContainer
width="100%"
height="100%"
>


<BarChart
data={salesData}
>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="name"
/>


<YAxis
/>


<Tooltip />


<Bar
dataKey="sales"
fill="currentColor"
className="text-primary"
/>


</BarChart>


</ResponsiveContainer>


</div>


</CardContent>


</Card>


);


}