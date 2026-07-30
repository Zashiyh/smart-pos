"use client";

import {
  AlertTriangle,
  Package,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



interface Product {

  _id:string;

  name:string;

  stock:number;

  minStock:number;

}



interface LowStockProps {

  products:Product[];

}





export default function LowStock({

products

}:LowStockProps){



const lowStockProducts = products.filter(

(product)=>

product.stock <= product.minStock

);






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
h-10
w-10
items-center
justify-center
rounded-xl
bg-red-500/10
"

>


<AlertTriangle

className="
h-5
w-5
text-red-500
"

/>


</div>




<div>


<CardTitle>

Low Stock Alert

</CardTitle>


<p

className="
text-sm
text-muted-foreground
"

>

Products need restocking

</p>


</div>



</div>


</CardHeader>








<CardContent>


<div

className="
space-y-4
"

>


{

lowStockProducts.length === 0 ?



(

<div

className="
flex
items-center
gap-3
rounded-xl
border
p-4
"

>


<Package

className="
h-5
w-5
text-green-500
"

/>


<p

className="
text-sm
text-muted-foreground
"

>

All products have enough stock 🎉

</p>


</div>

)



:


lowStockProducts.map(

(product)=>(


<div

key={product._id}

className="
flex
items-center
justify-between
rounded-xl
border
p-4
transition
hover:bg-muted/40
"

>



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
h-10
w-10
items-center
justify-center
rounded-xl
bg-primary/10
"

>


<Package

className="
h-5
w-5
text-primary
"

/>


</div>







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




</div>









<div

className="
text-right
"

>


<span

className="
rounded-full
bg-red-500/10
px-3
py-1
text-xs
font-medium
text-red-600
"

>

{product.stock} left

</span>


</div>







</div>


)


)



}



</div>



</CardContent>


</Card>


);


}