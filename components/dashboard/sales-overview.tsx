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

  month:string;

  sales:number;

}







function formatCurrency(value:number){

  return `LKR ${value.toLocaleString("en-LK")}`;

}








export default function SalesOverview(){



const [salesData,setSalesData] =
useState<SaleData[]>([]);





useEffect(()=>{


async function getSales(){


try{


const res =
await fetch(
"/api/dashboard/sales-overview"
);



const data =
await res.json();




if(data.success){

setSalesData(
data.sales || []
);

}


}catch(error){


console.log(
"Sales overview error:",
error
);


}



}



getSales();


},[]);








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


<CardHeader>


<CardTitle>

Sales Overview

</CardTitle>



<p

className="
text-sm
text-muted-foreground
"

>

Monthly revenue performance

</p>


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

stopColor="#22d3ee"

stopOpacity={0.35}

/>


<stop

offset="95%"

stopColor="#22d3ee"

stopOpacity={0}

/>


</linearGradient>


</defs>








<CartesianGrid

strokeDasharray="4 4"

stroke="rgba(255,255,255,0.1)"

/>






<XAxis


dataKey="month"


tickLine={false}


axisLine={false}


tick={{

fill:"#a1a1aa"

}}


/>









<YAxis


tickLine={false}


axisLine={false}


tick={{

fill:"#a1a1aa"

}}


tickFormatter={(value)=>

`${value / 1000}k`

}


/>









<Tooltip


formatter={(value)=>

[

formatCurrency(
Number(value)
),

"Sales"

]

}


contentStyle={{

background:"#18181b",

border:
"1px solid rgba(255,255,255,0.1)",

borderRadius:"12px",

color:"#ffffff"

}}



labelStyle={{

color:"#a1a1aa"

}}



/>









<Area


type="monotone"


dataKey="sales"


stroke="#22d3ee"


fill="url(#salesGradient)"


strokeWidth={3}


/>







</AreaChart>



</ResponsiveContainer>



</div>



</CardContent>



</Card>


);


}