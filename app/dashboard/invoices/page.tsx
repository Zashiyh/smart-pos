// ===============================
// IMPORTS
// ===============================

import Link from "next/link";


import {
  Eye,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";






// ===============================
// TYPES
// ===============================


interface Sale {


  _id:string;


  invoiceNumber:string;


  customerName:string;


  totalAmount:number;


  paymentMethod:string;


  status:string;


  createdAt:string;


}









// ===============================
// CONSTANTS
// ===============================


const API_URL =

process.env.NEXT_PUBLIC_API_URL ??

"http://localhost:3000";









// ===============================
// GET SALES
// ===============================


async function getSales():Promise<Sale[]> {


try{


const response =

await fetch(

`${API_URL}/api/sales`,

{

cache:"no-store"

}

);






if(!response.ok){


throw new Error(
"Failed to fetch sales"
);


}






const data =

await response.json();






if(!data.success){


return [];


}





return data.sales ?? [];






}catch(error){



console.error(

"Sales fetch error:",

error

);



return [];



}



}









// ===============================
// PAGE
// ===============================


export default async function InvoicesPage(){



const sales =

await getSales();







return (



<main

className="
min-h-screen
space-y-6
rounded-3xl
bg-muted/30
p-6
"

>







{/* HEADER */}



<div>


<h1 className="
text-3xl
font-bold
">


Sales History


</h1>




<p className="
text-muted-foreground
">


Manage invoices and completed sales


</p>


</div>









<Card className="rounded-2xl">



<CardHeader>


<CardTitle>


All Invoices ({sales.length})


</CardTitle>


</CardHeader>









<CardContent>



<div className="overflow-x-auto">





<table className="w-full text-sm">





<thead>


<tr

className="
border-b
text-left
text-muted-foreground
"

>


<th className="p-3">

Invoice

</th>



<th className="p-3">

Customer

</th>



<th className="p-3">

Amount

</th>



<th className="p-3">

Payment

</th>



<th className="p-3">

Status

</th>



<th className="p-3">

Date

</th>



<th className="p-3">

Action

</th>



</tr>


</thead>









<tbody>



{


sales.length === 0 ?



<tr>


<td

colSpan={7}

className="
p-6
text-center
text-muted-foreground
"

>


No sales found.


</td>


</tr>





:



sales.map((sale)=>(



<tr

key={sale._id}

className="
border-b
hover:bg-muted/50
"

>


<td className="p-3 font-medium">


{sale.invoiceNumber}


</td>






<td className="p-3">


{sale.customerName}


</td>







<td className="p-3">


£{sale.totalAmount}


</td>







<td className="p-3">


{sale.paymentMethod}


</td>







<td className="p-3">


<span

className="
rounded-full
bg-green-500/10
px-3
py-1
text-xs
text-green-600
"

>


{sale.status}


</span>


</td>








<td className="p-3">


{new Date(
sale.createdAt
).toLocaleDateString()}


</td>








<td className="p-3">


<Link

href={
`/dashboard/invoices/${sale._id}`
}

>


<Button

variant="outline"

size="icon"

className="rounded-xl"

>


<Eye

className="
h-4
w-4
"

/>


</Button>


</Link>


</td>






</tr>



))


}



</tbody>





</table>





</div>





</CardContent>




</Card>








</main>



);



}