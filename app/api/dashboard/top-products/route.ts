import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Sale from "@/models/sale";




// =================================
// GET TOP PRODUCTS
// =================================

export async function GET(){


  try{


    await connectDB();




    const products = await Sale.aggregate([



      // Separate each sold product
      {
        $unwind:"$products"
      },





      // Group products
      {
        $group:{


          _id:"$products.name",


          sold:{
            $sum:"$products.quantity"
          },


          revenue:{
            $sum:"$products.subtotal"
          }


        }
      },





      // Highest sold first
      {
        $sort:{
          sold:-1
        }
      },





      // Top 5 products
      {
        $limit:5
      }



    ]);







    return NextResponse.json({

      success:true,

      products

    });






  }catch(error:any){



    console.log(
      "Top products API error:",
      error
    );



    return NextResponse.json({

      success:false,

      message:error.message

    },
    {
      status:500
    });



  }


}