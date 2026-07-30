import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Category from "@/models/category";



// =========================
// GET ALL CATEGORIES
// =========================

export async function GET() {

  try {

    await connectDB();


    const categories =
      await Category.find()
      .sort({
        createdAt: -1,
      });



    return NextResponse.json({

      success: true,

      categories,

    });



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








// =========================
// CREATE CATEGORY
// =========================

export async function POST(
  req:NextRequest
){


  try {


    await connectDB();



    const body =
      await req.json();



    // validation

    if(!body.name){

      return NextResponse.json(

        {
          success:false,
          message:"Category name is required",
        },

        {
          status:400,
        }

      );

    }





    const exists =
      await Category.findOne({

        name:{
          $regex:`^${body.name}$`,
          $options:"i",
        }

      });





    if(exists){


      return NextResponse.json(

        {

          success:false,

          message:"Category already exists",

        },

        {
          status:400,
        }

      );


    }





    const category =
      await Category.create({

        name:body.name,

        description:
          body.description || "",

        status:
          body.status || "Active",

      });






    return NextResponse.json({

      success:true,

      category,

    },

    {
      status:201,
    }

    );





  }catch(error:any){



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