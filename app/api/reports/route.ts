import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Product from "@/models/product";
import Sale from "@/models/sale";


// ======================================
// GET REPORT DATA
// ======================================

export async function GET() {

  try {


    await connectDB();



    // PRODUCTS

    const totalProducts =
      await Product.countDocuments();



    const activeProducts =
      await Product.countDocuments({
        status:"Active",
      });



    const lowStockProducts =
      await Product.countDocuments({

        $expr:{
          $lte:[
            "$stock",
            "$minStock"
          ]
        }

      });





    // SALES

    const sales =
      await Sale.find();




    const totalSales =
      sales.length;




    const totalRevenue =
      sales.reduce(

        (total,sale)=>

          total + sale.totalAmount,

        0

      );






    const averageSale =
      totalSales > 0

      ?

      totalRevenue / totalSales

      :

      0;






    return NextResponse.json({

      success:true,

      report:{

        totalProducts,

        activeProducts,

        lowStockProducts,

        totalSales,

        totalRevenue,

        averageSale,


      }


    });




  } catch(error:any){


    console.log(
      "REPORT ERROR:",
      error
    );


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