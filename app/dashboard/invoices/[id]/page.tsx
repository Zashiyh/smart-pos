import Link from "next/link";

import PdfButton from "@/components/invoice/pdf-button";
import PrintButton from "@/components/invoice/print-button";


import {
ArrowLeft
} from "lucide-react";


import {
Button
} from "@/components/ui/button";


import {
Card,
CardContent,
CardHeader,
CardTitle
} from "@/components/ui/card";



export const dynamic = "force-dynamic";



const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:3000";





// ===============================
// GET INVOICE
// ===============================


async function getInvoice(id:string){


try{


const res = await fetch(

`${API_URL}/api/sales/${id}`,

{
cache:"no-store"
}

);



const data = await res.json();



if(!data.success){

return null;

}



return data.sale;



}catch(error){


console.log(
"Invoice error:",
error
);


return null;


}



}





// ===============================
// PAGE
// ===============================


export default async function InvoicePage({

params,

}:{

params:Promise<{
id:string
}>

}){


const {id}=await params;



const invoice =
await getInvoice(id);





if(!invoice){


return (

<div className="p-6">

<h1 className="text-xl font-bold">

Invoice not found

</h1>


</div>

);


}





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



<div

className="
flex
justify-between
items-center
print:hidden
"

>



<Link href="/dashboard/invoices">


<Button

variant="outline"

size="icon"

className="rounded-xl"

>

<ArrowLeft/>

</Button>


</Link>



<div className="flex gap-3">


<PdfButton/>


<PrintButton/>


</div>



</div>






<Card

id="invoice"

className="rounded-3xl"

>


<CardHeader>


<div className="
flex
justify-between
">


<div>


<CardTitle className="text-3xl">

SMARTPOS PRO

</CardTitle>


<p className="text-muted-foreground">

Smart Retail Management System

</p>


</div>



<div className="text-right">


<p className="font-bold">

INVOICE

</p>


<p>

{invoice.invoiceNumber}

</p>


</div>



</div>


</CardHeader>





<CardContent className="space-y-6">



<div className="
grid
md:grid-cols-2
gap-4
border
rounded-xl
p-4
">


<div>


<p className="text-sm text-muted-foreground">

Customer

</p>


<p className="font-semibold">

{invoice.customerName}

</p>


</div>



<div>


<p className="text-sm text-muted-foreground">

Date

</p>


<p className="font-semibold">

{
new Date(
invoice.createdAt
).toLocaleDateString(
"en-GB"
)
}

</p>


</div>


</div>







<div className="overflow-x-auto">


<table className="w-full text-sm">


<thead>


<tr className="border-b">


<th className="p-3 text-left">

Product

</th>


<th className="p-3">

Qty

</th>


<th className="p-3">

Price

</th>


<th className="p-3">

Total

</th>


</tr>


</thead>




<tbody>


{

invoice.products.map(

(item:any)=>(


<tr

key={item._id}

className="border-b"

>


<td className="p-3">

{item.name}

</td>


<td className="p-3 text-center">

{item.quantity}

</td>


<td className="p-3 text-center">

LKR {item.price}

</td>



<td className="p-3 text-center">

LKR {item.subtotal}

</td>



</tr>


)

)


}


</tbody>



</table>


</div>






<div className="
ml-auto
max-w-sm
space-y-3
border-t
pt-5
">


<div className="flex justify-between">

<span>Total</span>

<span className="font-bold">

LKR {invoice.totalAmount}

</span>

</div>



<div className="flex justify-between">

<span>Payment</span>

<span>

{invoice.paymentMethod}

</span>

</div>



<div className="flex justify-between">

<span>Status</span>

<span>

{invoice.status}

</span>

</div>



</div>





<p className="
text-center
text-sm
text-muted-foreground
">

Thank you for shopping with SMARTPOS PRO

</p>




</CardContent>


</Card>


</main>


);


}