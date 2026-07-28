import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";




// ===============================
// GET SINGLE PRODUCT
// ===============================

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {


  try {


    await connectDB();



    const { id } = await context.params;



    const product = await Product.findById(id);




    if (!product) {


      return NextResponse.json(
        {
          success:false,
          message:"Product not found"
        },
        {
          status:404
        }
      );


    }





    return NextResponse.json(
      {
        success:true,
        product
      }
    );



  } catch(error) {


    console.log(error);



    return NextResponse.json(
      {
        success:false,
        message:"Server error"
      },
      {
        status:500
      }
    );


  }


}









// ===============================
// UPDATE PRODUCT
// ===============================


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {


  try {


    await connectDB();




    const { id } = await context.params;




    const body = await req.json();





    const updatedProduct = await Product.findByIdAndUpdate(

      id,

      body,

      {
        new:true,
        runValidators:true
      }

    );






    if (!updatedProduct) {


      return NextResponse.json(
        {
          success:false,
          message:"Product not found"
        },
        {
          status:404
        }
      );


    }







    return NextResponse.json(
      {
        success:true,
        message:"Product updated successfully",
        product:updatedProduct
      }
    );




  } catch(error) {


    console.log(error);



    return NextResponse.json(
      {
        success:false,
        message:"Update failed"
      },
      {
        status:500
      }
    );


  }


}









// ===============================
// DELETE PRODUCT
// ===============================


export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {


  try {


    await connectDB();




    const { id } = await context.params;





    const deletedProduct = await Product.findByIdAndDelete(id);







    if (!deletedProduct) {


      return NextResponse.json(
        {
          success:false,
          message:"Product not found"
        },
        {
          status:404
        }
      );


    }








    return NextResponse.json(
      {
        success:true,
        message:"Product deleted successfully",
        product:deletedProduct
      }
    );





  } catch(error) {


    console.log(error);




    return NextResponse.json(
      {
        success:false,
        message:"Delete failed"
      },
      {
        status:500
      }
    );


  }


}