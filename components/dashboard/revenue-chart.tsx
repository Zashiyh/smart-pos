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
    month:"Jan",
    revenue:50000,
  },

  {
    month:"Feb",
    revenue:75000,
  },

  {
    month:"Mar",
    revenue:62000,
  },

  {
    month:"Apr",
    revenue:95000,
  },

  {
    month:"May",
    revenue:120000,
  },

  {
    month:"Jun",
    revenue:150000,
  },

];






export default function RevenueChart(){



return (


<Card className="rounded-2xl">


<CardHeader>

<CardTitle>
Revenue Overview
</CardTitle>

</CardHeader>





<CardContent>


<div className="h-[300px]">


<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={revenueData}

>


<CartesianGrid

strokeDasharray="3 3"

/>


<XAxis

dataKey="month"

/>



<YAxis />



<Tooltip />





<Line

type="monotone"

dataKey="revenue"

stroke="currentColor"

strokeWidth={3}

/>





</LineChart>



</ResponsiveContainer>



</div>



</CardContent>


</Card>


);


}