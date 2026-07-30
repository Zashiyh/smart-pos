"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  Trophy,
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

  sold:number;

  revenue:number;

}







export default function TopProducts(){



const [products,setProducts] =
useState<Product[]>([]);


const [loading,setLoading] =
useState(true);







useEffect(()=>{


async function getTopProducts(){


try{


const response =
await fetch(
"/api/dashboard/top-products",
{
cache:"no-store"
}
);



const data =
await response.json();




if(data.success){


setProducts(
data.products
);


}



}catch(error){


console.log(
"Top products error:",
error
);


}finally{


setLoading(false);


}



}



getTopProducts();


},[]);








const maxSold =
products[0]?.sold || 1;








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
bg-yellow-500/10
"

>


<Trophy

className="
h-5
w-5
text-yellow-500
"

/>


</div>





<div>


<CardTitle>

Top Selling Products

</CardTitle>


<p

className="
text-sm
text-muted-foreground
"

>

Best performing products

</p>


</div>



</div>



</CardHeader>









<CardContent>



<div

className="
space-y-5
"

>





{

loading ?



<p className="text-muted-foreground">

Loading products...

</p>





:



products.length === 0 ?



<p className="text-muted-foreground">

No sales data available

</p>






:



products.map(

(product,index)=>(



<div

key={product._id}

className="
rounded-xl
border
p-4
transition
hover:bg-muted/40
hover:shadow-md
"

>





<div

className="
flex
items-center
justify-between
"

>





<div

className="
flex
items-center
gap-3
"

>



{/* Rank */}


<div


className={`

flex
h-10
w-10
items-center
justify-center
rounded-full
text-sm
font-bold


${
index === 0

?

"bg-yellow-500/20 text-yellow-600"

:

index === 1

?

"bg-gray-400/20 text-gray-600"

:

index === 2

?

"bg-orange-500/20 text-orange-600"

:

"bg-primary/10 text-primary"

}

`}


>


{index + 1}


</div>










{/* Product */}



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
"

/>


</div>






<div>


<p

className="
font-medium
"

>

{product._id}

</p>



<p

className="
text-sm
text-muted-foreground
"

>

{product.sold} sold

</p>



</div>



</div>





</div>









{/* Revenue */}


<div

className="
text-right
"

>


<p

className="
font-bold
"

>

LKR {product.revenue.toLocaleString("en-LK")}

</p>


<p

className="
text-xs
text-muted-foreground
"

>

Revenue

</p>



</div>






</div>










{/* Progress Bar */}



<div

className="
mt-4
h-2
overflow-hidden
rounded-full
bg-muted
"

>


<div


className="
h-full
rounded-full
bg-primary
transition-all
duration-700
"

style={{

width:`${
(product.sold / maxSold) * 100
}%`

}}


/>


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