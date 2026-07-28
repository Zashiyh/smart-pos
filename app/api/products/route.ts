import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";



// ==========================
// GET ALL PRODUCTS
// ==========================

export async function GET() {


  try {


    await connectDB();



    const products = await Product.find()
      .sort({
        createdAt:-1,
      });



    return NextResponse.json(

      {
        success:true,
        products,
      },

      {
        status:200,
      }

    );



  } catch(error:any){



    return NextResponse.json(

      {
        success:false,
        message:error.message,
      },

      {
        status:500,
      }

    );


  }


}









// ==========================
// ADD PRODUCT
// ==========================


export async function POST(
  req:NextRequest
){



  try {



    await connectDB();



    const body = await req.json();




    const {


      name,

      barcode,

      sku,

      category,

      brand,

      supplier,

      costPrice,

      sellingPrice,

      stock,

      minStock,

      unit,

      expiryDate,

      image,


    } = body;







    // ==========================
    // REQUIRED VALIDATION
    // ==========================


    if(
      !name ||
      !category ||
      costPrice === undefined ||
      sellingPrice === undefined
    ){


      return NextResponse.json(

        {
          success:false,
          message:"Required fields are missing.",
        },

        {
          status:400,
        }

      );


    }









    // ==========================
    // STRING VALIDATION
    // ==========================


    if(
      name.trim().length < 2
    ){


      return NextResponse.json(

        {
          success:false,
          message:"Product name must contain at least 2 characters.",
        },

        {
          status:400,
        }

      );


    }









    // ==========================
    // NUMBER VALIDATION
    // ==========================


    if(
      Number(costPrice) < 0 ||
      Number(sellingPrice) < 0
    ){


      return NextResponse.json(

        {
          success:false,
          message:"Price cannot be negative.",
        },

        {
          status:400,
        }

      );


    }







    if(
      Number(stock) < 0 ||
      Number(minStock) < 0
    ){


      return NextResponse.json(

        {
          success:false,
          message:"Stock value cannot be negative.",
        },

        {
          status:400,
        }

      );


    }









    // ==========================
    // SELLING PRICE CHECK
    // ==========================


    if(
      Number(sellingPrice) <
      Number(costPrice)
    ){


      return NextResponse.json(

        {
          success:false,
          message:
          "Selling price cannot be lower than cost price.",
        },

        {
          status:400,
        }

      );


    }









    // ==========================
    // DUPLICATE BARCODE CHECK
    // ==========================


    if(barcode){



      const existingProduct =
      await Product.findOne({
        barcode,
      });




      if(existingProduct){


        return NextResponse.json(

          {
            success:false,
            message:"Barcode already exists.",
          },

          {
            status:409,
          }

        );


      }


    }









    // ==========================
    // CREATE PRODUCT
    // ==========================


    const product = await Product.create({



      name:name.trim(),


      barcode,


      sku,


      category,


      brand,


      supplier,


      costPrice:Number(costPrice),


      sellingPrice:Number(sellingPrice),


      stock:Number(stock),


      minStock:Number(minStock || 0),


      unit,


      expiryDate,


      image,



    });









    return NextResponse.json(

      {

        success:true,

        message:
        "Product added successfully.",

        product,

      },

      {
        status:201,
      }

    );






  } catch(error:any){



    console.log(error);



    return NextResponse.json(

      {

        success:false,

        message:error.message,

      },

      {
        status:500,
      }

    );


  }


}