import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Sale from "@/models/sale";

import Product from "@/models/product";




// ===============================
// GET ALL SALES
// ===============================

export async function GET(){


  try{


    await connectDB();



    const sales =
    await Sale.find()
    .sort({
      createdAt:-1
    })
    .populate(
      "products.product"
    );



    return NextResponse.json({

      success:true,

      sales

    });



  }catch(error:any){


    return NextResponse.json({

      success:false,

      message:error.message

    },
    {
      status:500
    });


  }


}









// ===============================
// CREATE SALE
// ===============================


export async function POST(
req:NextRequest
){


try{


await connectDB();



const body =
await req.json();





const {

invoiceNumber,

customerName,

products,

totalAmount,

cashReceived,

change,

paymentMethod


}=body;








// ===============================
// CHECK STOCK
// ===============================


for(const item of products){


const product =
await Product.findById(
item.product
);



if(!product){


return NextResponse.json({

success:false,

message:"Product not found"

},
{
status:404
});


}







if(product.stock < item.quantity){


return NextResponse.json({

success:false,

message:
`${product.name} stock not enough`

},
{
status:400
});


}



}









// ===============================
// REDUCE STOCK
// ===============================


for(const item of products){


await Product.findByIdAndUpdate(

item.product,

{

$inc:{

stock:-item.quantity

}

}

);


}









// ===============================
// SAVE SALE
// ===============================


const sale =

await Sale.create({

invoiceNumber,

customerName,

products,

totalAmount,

cashReceived,

change,

paymentMethod


});









return NextResponse.json({

success:true,

message:"Sale completed successfully",

sale

},
{
status:201
});







}catch(error:any){



return NextResponse.json({

success:false,

message:error.message

},
{
status:500
});


}



}