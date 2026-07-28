"use client";


import { useEffect, useState } from "react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  Input,
} from "@/components/ui/input";


import {
  Button,
} from "@/components/ui/button";





interface Product {


  _id:string;

  name:string;

  sellingPrice:number;

  stock:number;


}







interface CartItem {


  productId:string;

  name:string;

  price:number;

  quantity:number;


}









export default function SalesPage(){



const [products,setProducts] =
useState<Product[]>([]);



const [search,setSearch] =
useState("");



const [cart,setCart] =
useState<CartItem[]>([]);



const [loading,setLoading] =
useState(false);



const [message,setMessage] =
useState("");










// ===============================
// LOAD PRODUCTS
// ===============================


useEffect(()=>{


async function loadProducts(){


const res =
await fetch("/api/products");


const data =
await res.json();



if(data.success){


setProducts(
data.products
);


}


}



loadProducts();



},[]);












// ===============================
// ADD TO CART
// ===============================


function addToCart(product:Product){



const existing =
cart.find(

(item)=>

item.productId === product._id

);





if(existing){



setCart(

cart.map(item=>

item.productId === product._id

?

{

...item,

quantity:item.quantity + 1

}

:

item

)

);



}

else{



setCart([

...cart,

{

productId:product._id,

name:product.name,

price:product.sellingPrice,

quantity:1

}


]);



}



}











// ===============================
// REMOVE CART ITEM
// ===============================


function removeItem(id:string){


setCart(

cart.filter(

(item)=>

item.productId !== id

)

);


}











// ===============================
// COMPLETE SALE
// ===============================


async function handleCompleteSale(){



if(cart.length === 0){


setMessage(
"Cart is empty"
);


return;


}




try{


setLoading(true);


setMessage("");





const saleProducts =

cart.map(item=>(

{


product:item.productId,

name:item.name,

quantity:item.quantity,

price:item.price,

subtotal:
item.price * item.quantity


}


));








const response =

await fetch(

"/api/sales",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


invoiceNumber:

"INV-" + Date.now(),



customerName:

"Walk-in Customer",



products:saleProducts,



totalAmount:total,



paymentMethod:"Cash"



})


}


);







const data =
await response.json();







if(!response.ok || !data.success){


throw new Error(

data.message ||

"Sale failed"

);


}








setMessage(

"Sale completed successfully"

);





setCart([]);





// refresh products stock


const productResponse =
await fetch("/api/products");



const productData =
await productResponse.json();



if(productData.success){


setProducts(

productData.products

);


}







}catch(error:any){



setMessage(

error.message

);



}

finally{


setLoading(false);


}



}













const filteredProducts =

products.filter(

(product)=>

product.name

.toLowerCase()

.includes(

search.toLowerCase()

)


);









const total =

cart.reduce(

(sum,item)=>

sum +

(item.price * item.quantity),

0

);









return (



<div

className="
min-h-screen
space-y-6
rounded-3xl
bg-muted/30
p-6
"

>



<h1 className="text-3xl font-bold">

Sales / POS

</h1>








<div

className="
grid
gap-6
lg:grid-cols-2
"

>







{/* PRODUCTS */}



<Card className="rounded-2xl">


<CardHeader>

<CardTitle>

Products

</CardTitle>

</CardHeader>






<CardContent>




<Input

placeholder="Search product..."

value={search}

onChange={

(e)=>

setSearch(e.target.value)

}


/>







<div className="mt-5 space-y-3">



{


filteredProducts.map(product=>(



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


<p className="font-medium">

{product.name}

</p>



<p className="text-sm text-muted-foreground">

Stock: {product.stock}

</p>


</div>





<Button

onClick={()=>addToCart(product)}

>

Add

</Button>





</div>


))


}



</div>





</CardContent>


</Card>













{/* CART */}



<Card className="rounded-2xl">


<CardHeader>

<CardTitle>

Cart

</CardTitle>


</CardHeader>







<CardContent>



<div className="space-y-3">



{


cart.length === 0 ?


<p className="text-muted-foreground">

Cart is empty

</p>



:


cart.map(item=>(



<div

key={item.productId}

className="
flex
justify-between
border-b
pb-3
"

>


<div>


<p>

{item.name}

</p>



<p className="text-sm">

Qty: {item.quantity}

</p>


</div>





<div className="text-right">


<p>

£{item.price * item.quantity}

</p>



<Button

variant="destructive"

size="sm"

onClick={()=>removeItem(item.productId)}

>

Remove

</Button>


</div>




</div>


))


}



</div>







<div

className="
mt-6
border-t
pt-4
"

>



<h2 className="text-xl font-bold">

Total: £{total}

</h2>






<Button


disabled={loading}


onClick={handleCompleteSale}


className="
mt-4
w-full
rounded-xl
"


>


{

loading

?

"Processing..."

:

"Complete Sale"

}



</Button>






{

message &&

<p className="mt-3 text-center text-sm">

{message}

</p>


}



</div>







</CardContent>


</Card>






</div>





</div>


);



}