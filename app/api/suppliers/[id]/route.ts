import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Supplier from "@/models/supplier";



interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}






export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {

  try {

    await connectDB();

    const { id } = await params;

    const supplier =
      await Supplier.findById(id);

    if (!supplier) {

      return NextResponse.json(
        {
          success: false,
          message: "Supplier not found.",
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json({
      success: true,
      supplier,
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








export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {

  try {

    await connectDB();

    const { id } = await params;

    const body =
      await req.json();

    const {

      name,

      company,

      phone,

      email,

      address,

      city,

      paymentTerms,

      status,

    } = body;





    const supplier =
      await Supplier.findByIdAndUpdate(

        id,

        {

          name,

          company,

          phone,

          email,

          address,

          city,

          paymentTerms,

          status,

        },

        {
          new: true,
          runValidators: true,
        }

      );





    if (!supplier) {

      return NextResponse.json(
        {
          success: false,
          message: "Supplier not found.",
        },
        {
          status: 404,
        }
      );

    }






    return NextResponse.json({

      success: true,

      message: "Supplier updated successfully.",

      supplier,

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









export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {

  try {

    await connectDB();

    const { id } = await params;

    const supplier =
      await Supplier.findByIdAndDelete(id);

    if (!supplier) {

      return NextResponse.json(
        {
          success: false,
          message: "Supplier not found.",
        },
        {
          status: 404,
        }
      );

    }






    return NextResponse.json({

      success: true,

      message: "Supplier deleted successfully.",

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