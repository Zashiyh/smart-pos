"use client";

import { useState } from "react";

import {
  Pencil,
} from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import {
  Button,
} from "@/components/ui/button";


import {
  Input,
} from "@/components/ui/input";



interface Product {

  _id:string;

  name:string;

  barcode:string;

  sku:string;

  category:string;

  brand:string;

  supplier:string;

  costPrice:number;

  sellingPrice:number;

  stock:number;

  minStock?:number;

  unit?:string;

  expiryDate?:string;

  image?:string;

}



export default function EditProductDialog({

product

}:{

product:Product

}){



const [name,setName] =
useState(product.name);


const [barcode,setBarcode] =
useState(product.barcode);


const [sku,setSku] =
useState(product.sku);


const [category,setCategory] =
useState(product.category);


const [brand,setBrand] =
useState(product.brand);


const [supplier,setSupplier] =
useState(product.supplier);


const [costPrice,setCostPrice] =
useState(
product.costPrice.toString()
);


const [sellingPrice,setSellingPrice] =
useState(
product.sellingPrice.toString()
);


const [stock,setStock] =
useState(
product.stock.toString()
);



const [loading,setLoading] =
useState(false);






async function updateProduct(){


try{


setLoading(true);



const response =
await fetch(

`/api/products/${product._id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

name,

barcode,

sku,

category,

brand,

supplier,

costPrice:Number(costPrice),

sellingPrice:Number(sellingPrice),

stock:Number(stock)

})


}

);





const data =
await response.json();





if(data.success){


alert(
"Product updated successfully"
);


window.location.reload();


}else{


alert(
data.message || "Update failed"
);


}




}catch(error){


console.log(
"UPDATE PRODUCT ERROR:",
error
);


alert(
"Something went wrong"
);



}finally{


setLoading(false);


}



}









return (



<Dialog>



<DialogTrigger>



<Button

variant="outline"

size="icon"

className="rounded-xl"

>


<Pencil

className="
h-4
w-4
"

/>


</Button>



</DialogTrigger>








<DialogContent className="max-w-2xl">



<DialogHeader>


<DialogTitle>

Edit Product

</DialogTitle>


</DialogHeader>







<div

className="
grid
gap-4
md:grid-cols-2
"

>





<Input

placeholder="Product Name"

value={name}

onChange={(e)=>

setName(e.target.value)

}

/>





<Input

placeholder="Barcode"

value={barcode}

onChange={(e)=>

setBarcode(e.target.value)

}

/>





<Input

placeholder="SKU"

value={sku}

onChange={(e)=>

setSku(e.target.value)

}

/>






<Input

placeholder="Category"

value={category}

onChange={(e)=>

setCategory(e.target.value)

}

/>







<Input

placeholder="Brand"

value={brand}

onChange={(e)=>

setBrand(e.target.value)

}

/>







<Input

placeholder="Supplier"

value={supplier}

onChange={(e)=>

setSupplier(e.target.value)

}

/>







<Input

type="number"

placeholder="Cost Price"

value={costPrice}

onChange={(e)=>

setCostPrice(e.target.value)

}

/>








<Input

type="number"

placeholder="Selling Price"

value={sellingPrice}

onChange={(e)=>

setSellingPrice(e.target.value)

}

/>








<Input

type="number"

placeholder="Stock"

value={stock}

onChange={(e)=>

setStock(e.target.value)

}

/>






</div>







<Button

className="w-full mt-4"

onClick={updateProduct}

disabled={loading}

>


{

loading

?

"Updating..."

:

"Update Product"

}



</Button>







</DialogContent>






</Dialog>


);


}