import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Sale from "@/models/sale";



export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {


  try {


    await connectDB();


    const { id } = await context.params;



    const sale = await Sale.findById(id)
      .populate("products.product");




    if (!sale) {


      return NextResponse.json(
        {
          success:false,
          message:"Invoice not found"
        },
        {
          status:404
        }
      );


    }





    return NextResponse.json(
      {
        success:true,
        sale
      },
      {
        status:200
      }
    );





  } catch(error:any){


    return NextResponse.json(
      {
        success:false,
        message:error.message
      },
      {
        status:500
      }
    );


  }


}