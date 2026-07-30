import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";

import Category from "@/models/category";



// ======================================
// UPDATE CATEGORY
// ======================================

export async function PUT(

  request: NextRequest,

  { params }: { params: Promise<{ id: string }> }

) {

  try {


    await connectDB();


    const { id } = await params;



    // Validate ObjectId

    if (!mongoose.Types.ObjectId.isValid(id)) {


      return NextResponse.json(

        {
          success: false,
          message: "Invalid category id",
        },

        {
          status: 400,
        }

      );


    }





    const body =
      await request.json();





    const category =
      await Category.findById(id);





    if (!category) {


      return NextResponse.json(

        {
          success: false,
          message: "Category not found",
        },

        {
          status: 404,
        }

      );


    }







    // Check duplicate name

    const duplicate =
      await Category.findOne({

        name: body.name,

        _id: {
          $ne: id,
        },

      });





    if (duplicate) {


      return NextResponse.json(

        {
          success: false,
          message: "Category already exists",
        },

        {
          status: 400,
        }

      );


    }







    category.name =
      body.name;


    category.description =
      body.description ?? "";



    category.status =
      body.status ?? "Active";





    await category.save();







    return NextResponse.json({

      success: true,

      category,

    });







  } catch (error: any) {


    return NextResponse.json(

      {
        success: false,
        message: error.message,
      },

      {
        status: 500,
      }

    );


  }

}









// ======================================
// DELETE CATEGORY
// ======================================

export async function DELETE(

  request: NextRequest,

  { params }: { params: Promise<{ id: string }> }

) {

  try {


    await connectDB();


    const { id } = await params;





    // Validate ObjectId

    if (!mongoose.Types.ObjectId.isValid(id)) {


      return NextResponse.json(

        {
          success: false,
          message: "Invalid category id",
        },

        {
          status: 400,
        }

      );


    }







    const category =
      await Category.findById(id);





    if (!category) {


      return NextResponse.json(

        {
          success: false,
          message: "Category not found",
        },

        {
          status: 404,
        }

      );


    }







    await Category.findByIdAndDelete(id);







    return NextResponse.json({

      success: true,

      message:
        "Category deleted successfully",

    });







  } catch (error: any) {


    return NextResponse.json(

      {
        success: false,
        message: error.message,
      },

      {
        status: 500,
      }

    );


  }

}