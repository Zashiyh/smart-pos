import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";



// ==========================
// GET ALL PRODUCTS
// ==========================

export async function GET() {

  try {

    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      {
        status: 200,
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



// ==========================
// ADD PRODUCT
// ==========================

export async function POST(
  req: NextRequest
) {

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



    if (
      !name ||
      !category ||
      costPrice == null ||
      sellingPrice == null
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing.",
        },
        {
          status: 400,
        }
      );

    }



    const existingProduct =
      await Product.findOne({
        barcode,
      });



    if (barcode && existingProduct) {

      return NextResponse.json(
        {
          success: false,
          message: "Barcode already exists.",
        },
        {
          status: 409,
        }
      );

    }



    const product =
      await Product.create({

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

      });



    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully.",
        product,
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