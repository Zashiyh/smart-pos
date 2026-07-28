import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Product from "@/models/product";

import StockTransaction from "@/models/stockTransaction";




// =====================================
// GET STOCK TRANSACTION HISTORY
// =====================================

export async function GET(){


    try{


        await connectDB();



        const transactions =
        await StockTransaction
        .find()
        .populate(
            "product",
            "name barcode sku"
        )
        .sort({
            createdAt:-1
        });



        return NextResponse.json(
            {

                success:true,

                transactions

            },
            {
                status:200
            }
        );



    }
    catch(error:any){


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







// =====================================
// ADD / REMOVE STOCK
// =====================================

export async function POST(
    req:NextRequest
){


    try{


        await connectDB();



        const body =
        await req.json();



        const {

            productId,

            type,

            quantity,

            reason


        } = body;





        // validation

        if(
            !productId ||
            !type ||
            !quantity ||
            !reason
        ){


            return NextResponse.json(
                {

                    success:false,

                    message:
                    "All fields are required"

                },
                {
                    status:400
                }
            );


        }







        const product =
        await Product.findById(productId);




        if(!product){


            return NextResponse.json(
                {

                    success:false,

                    message:
                    "Product not found"

                },
                {
                    status:404
                }
            );


        }









        // ==========================
        // STOCK IN
        // ==========================


        if(type === "IN"){


            product.stock =
            product.stock + Number(quantity);


        }







        // ==========================
        // STOCK OUT
        // ==========================


        else if(type === "OUT"){



            if(
                product.stock < quantity
            ){


                return NextResponse.json(
                    {

                        success:false,

                        message:
                        "Not enough stock"

                    },
                    {
                        status:400
                    }
                );


            }





            product.stock =
            product.stock - Number(quantity);



        }







        else{


            return NextResponse.json(
                {

                    success:false,

                    message:
                    "Invalid stock type"

                },
                {
                    status:400
                }
            );


        }








        // SAVE PRODUCT STOCK


        await product.save();








        // SAVE HISTORY


        const transaction =
        await StockTransaction.create({

            product:productId,

            type,

            quantity,

            reason

        });







        return NextResponse.json(
            {

                success:true,

                message:
                "Stock updated successfully",


                product,


                transaction


            },
            {
                status:200
            }
        );





    }
    catch(error:any){



        console.log(error);



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