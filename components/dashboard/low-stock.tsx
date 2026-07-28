import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



interface LowStockProps {

  products:any[];

}





export default function LowStock({

products

}:LowStockProps){



const lowStockProducts = products.filter(
(product:any)=>
product.stock <= product.minStock
);





return (


<Card className="rounded-2xl">


<CardHeader>


<CardTitle>

Low Stock Alert

</CardTitle>


</CardHeader>





<CardContent>



{
lowStockProducts.length === 0 ? (


<p
className="
text-muted-foreground
"
>

All products have enough stock.

</p>



)

:

(


<div
className="
space-y-3
"
>


{
lowStockProducts.map(
(product:any)=>(


<div

key={product._id}

className="
flex
items-center
justify-between
rounded-xl
border
p-3
"

>



<div>


<p
className="
font-medium
"
>

{product.name}

</p>



<p
className="
text-sm
text-muted-foreground
"
>

Minimum Stock: {product.minStock}

</p>


</div>







<span

className="
rounded-full
bg-red-500/10
px-3
py-1
text-xs
text-red-600
"

>

{product.stock} left

</span>






</div>



)


)


}



</div>


)


}



</CardContent>



</Card>


);


}