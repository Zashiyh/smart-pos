"use client";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";





interface TransactionTableProps {

  transactions:any[];

}





export default function TransactionTable(
{
  transactions

}:TransactionTableProps

){



return (


<Card className="rounded-2xl">


<CardHeader>

<CardTitle>

Stock Transaction History

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
Product
</th>


<th className="p-3">
Type
</th>


<th className="p-3">
Quantity
</th>


<th className="p-3">
Reason
</th>


<th className="p-3">
Date
</th>


</tr>


</thead>







<tbody>



{
transactions.length === 0 ? (


<tr>

<td
colSpan={5}
className="
p-6
text-center
text-muted-foreground
"
>

No transactions found.

</td>

</tr>



)

:

(

transactions.map(
(transaction:any)=>(


<tr

key={transaction._id}

className="
border-b
hover:bg-muted/50
"

>


<td className="p-3 font-medium">


{
transaction.product?.name 
||
transaction.product
}


</td>





<td className="p-3">


<span

className={`
rounded-full
px-3
py-1
text-xs

${
transaction.type === "IN"

?
"bg-green-500/10 text-green-600"

:

"bg-red-500/10 text-red-600"

}

`}

>


{transaction.type}


</span>


</td>







<td className="p-3">


{transaction.quantity}


</td>







<td className="p-3">


{transaction.reason}


</td>







<td className="p-3">


{
new Date(
transaction.createdAt
).toLocaleDateString()
}


</td>






</tr>


)

)


)


}



</tbody>




</table>



</div>



</CardContent>


</Card>


);


}