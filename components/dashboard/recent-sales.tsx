"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CreditCard,
  Banknote,
} from "lucide-react";



interface Sale {

  _id:string;

  invoiceNumber:string;

  customerName:string;

  totalAmount:number;

  paymentMethod:string;

  status:string;

}





export default function RecentSales(){



const [sales,setSales] = useState<Sale[]>([]);

const [loading,setLoading] = useState(true);






useEffect(()=>{


async function getSales(){


try{


const res = await fetch(
"/api/sales"
);


const data = await res.json();



if(data.success){


setSales(
data.sales.slice(0,5)
);


}



}catch(error){


console.log(
"Recent sales error:",
error
);


}finally{


setLoading(false);


}


}



getSales();


},[]);








return (

<Card

className="
rounded-2xl
border
bg-card/80
backdrop-blur-xl
shadow-sm
"

>


<CardHeader>


<CardTitle

className="
text-xl
font-semibold
"

>

Recent Sales

</CardTitle>



<p

className="
text-sm
text-muted-foreground
"

>

Latest customer transactions

</p>


</CardHeader>








<CardContent>


<div className="overflow-x-auto">


<Table>


<TableHeader>


<TableRow>


<TableHead>
Invoice
</TableHead>


<TableHead>
Customer
</TableHead>


<TableHead>
Amount
</TableHead>


<TableHead>
Payment
</TableHead>


<TableHead>
Status
</TableHead>


</TableRow>


</TableHeader>






<TableBody>



{
loading ?


<TableRow>

<TableCell

colSpan={5}

className="text-center"

>

Loading...

</TableCell>


</TableRow>



:

sales.length === 0 ?



<TableRow>

<TableCell

colSpan={5}

className="text-center"

>

No sales found

</TableCell>


</TableRow>



:



sales.map((sale)=>(


<TableRow

key={sale._id}

className="
hover:bg-muted/50
"

>



<TableCell

className="
font-medium
"

>

{sale.invoiceNumber}

</TableCell>







<TableCell>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
flex
h-9
w-9
items-center
justify-center
rounded-full
bg-primary/10
text-primary
font-semibold
"

>

{sale.customerName.charAt(0)}

</div>



{sale.customerName}


</div>


</TableCell>








<TableCell

className="
font-semibold
"

>

LKR {sale.totalAmount.toLocaleString("en-LK")}

</TableCell>








<TableCell>


<div

className="
flex
items-center
gap-2
"

>


{

sale.paymentMethod === "Card"

?

<CreditCard className="h-4 w-4 text-blue-500"/>

:

<Banknote className="h-4 w-4 text-green-500"/>


}



{sale.paymentMethod}


</div>


</TableCell>







<TableCell>


<span

className={`
rounded-full
px-3
py-1
text-xs
font-medium

${
sale.status === "Completed"

?

"bg-green-500/10 text-green-600"

:

"bg-yellow-500/10 text-yellow-600"

}

`}

>


{sale.status}


</span>


</TableCell>






</TableRow>


))


}



</TableBody>



</Table>


</div>


</CardContent>



</Card>


);


}