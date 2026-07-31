import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Supplier from "@/models/supplier";





export async function GET() {

  try {

    await connectDB();

    const suppliers =
      await Supplier.find().sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      suppliers,
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






export async function POST(
  req: NextRequest
) {

  try {

    await connectDB();

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





    if (!name) {

      return NextResponse.json(
        {
          success: false,
          message: "Supplier name is required.",
        },
        {
          status: 400,
        }
      );

    }






    const supplier =
      await Supplier.create({

        name,

        company,

        phone,

        email,

        address,

        city,

        paymentTerms,

        status:
          status || "Active",

      });






    return NextResponse.json(
      {
        success: true,
        message: "Supplier created successfully.",
        supplier,
      },
      {
        status: 201,
      }
    );



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