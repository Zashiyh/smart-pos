import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Product from "@/models/product";
import Sale from "@/models/sale";


export async function GET() {

  try {

    await connectDB();


    const products = await Product.find({
      stock:{
        $gt:0
      },
      status:"Active"
    });



    if(products.length === 0){

      return NextResponse.json({
        success:false,
        message:"No products available"
      });

    }



    const product =
      products[
        Math.floor(
          Math.random() * products.length
        )
      ];



    const quantity =
      Math.min(
        Math.floor(Math.random()*3)+1,
        product.stock
      );



    const subtotal =
      product.sellingPrice * quantity;



    await Product.findByIdAndUpdate(
      product._id,
      {
        $inc:{
          stock:-quantity
        }
      }
    );



    const sale =
      await Sale.create({

        invoiceNumber:
        "AUTO-" + Date.now(),


        customerName:
        "Auto Customer",


        products:[
          {
            product:product._id,
            name:product.name,
            quantity,
            price:product.sellingPrice,
            subtotal
          }
        ],


        totalAmount:subtotal,


        cashReceived:subtotal,


        change:0,


        paymentMethod:"Cash",


        status:"Completed"

      });



    return NextResponse.json({

      success:true,

      message:"Auto sale created",

      sale

    });



  } catch(error:any){


    return NextResponse.json({

      success:false,

      message:error.message

    },
    {
      status:500
    });


  }

}