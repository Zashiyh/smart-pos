import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Product from "@/models/product";
import Sale from "@/models/sale";




export async function GET() {


  try {


    await connectDB();





    const today = new Date();



    const startOfDay = new Date(

      today.getFullYear(),

      today.getMonth(),

      today.getDate()

    );



    const endOfDay = new Date(

      today.getFullYear(),

      today.getMonth(),

      today.getDate() + 1

    );








    const [

      totalProducts,

      lowStockProducts,

      totalSales,

      todaySales,

      todayOrders,

    ] = await Promise.all([





      // Total Products

      Product.countDocuments(),







      // Low Stock

      Product.countDocuments({

        $expr: {

          $lte: [

            "$stock",

            "$minStock"

          ]

        }

      }),







      // Total Revenue

      Sale.aggregate([

        {

          $group: {

            _id:null,

            total:{

              $sum:"$totalAmount"

            }

          }

        }

      ]),







      // Today's Revenue

      Sale.aggregate([

        {

          $match:{

            createdAt:{

              $gte:startOfDay,

              $lt:endOfDay

            }

          }

        },

        {

          $group:{

            _id:null,

            total:{

              $sum:"$totalAmount"

            }

          }

        }

      ]),








      // Today's Orders

      Sale.countDocuments({

        createdAt:{

          $gte:startOfDay,

          $lt:endOfDay

        }

      })




    ]);









    return NextResponse.json({

      success:true,


      stats:{


        totalProducts,


        lowStockProducts,


        totalRevenue:

          totalSales[0]?.total ?? 0,



        todayRevenue:

          todaySales[0]?.total ?? 0,



        todayOrders


      }


    });







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