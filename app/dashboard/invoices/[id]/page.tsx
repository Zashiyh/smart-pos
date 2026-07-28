import Link from "next/link";


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


import PrintButton from "@/components/invoice/print-button";





async function getInvoice(id:string){


const res = await fetch(

`http://localhost:3000/api/sales/${id}`,

{
cache:"no-store"
}

);



const data = await res.json();



if(!data.success){

return null;

}


return data.sale;


}







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
"

>


<Link href="/dashboard/invoices">


<Button

variant="outline"

size="icon"

className="rounded-xl"

>


<ArrowLeft />

</Button>


</Link>



<PrintButton />


</div>








<Card className="rounded-3xl">


<CardHeader>


<CardTitle>

Invoice {invoice.invoiceNumber}

</CardTitle>


</CardHeader>





<CardContent>


<p>

Customer:

<b className="ml-2">

{invoice.customerName}

</b>

</p>




<div className="mt-6 overflow-x-auto">


<table className="w-full">


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

£{item.price}

</td>



<td className="p-3 text-center">

£{item.subtotal}

</td>



</tr>


)

)


}



</tbody>



</table>


</div>





<div className="mt-6 border-t pt-5">


<h2 className="text-2xl font-bold">


Total:
£{invoice.totalAmount}


</h2>


<p>

Payment:

{invoice.paymentMethod}

</p>



</div>



</CardContent>


</Card>




</main>


);


}