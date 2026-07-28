import mongoose, { Schema, model, models } from "mongoose";


// =====================================
// STOCK TRANSACTION MODEL
// =====================================
// Save every stock IN / OUT activity
// =====================================


const StockTransactionSchema = new Schema(

  {


    // Related Product

    product: {

      type: Schema.Types.ObjectId,

      ref: "Product",

      required: true,

    },




    // Stock action type

    type: {

      type: String,

      enum: [
        "IN",
        "OUT"
      ],

      required:true,

    },





    // Quantity changed

    quantity: {

      type:Number,

      required:true,

      min:1,

    },





    // Why stock changed

    reason: {

      type:String,

      required:true,

    }




  },


  {


    timestamps:true


  }


);





const StockTransaction =

models.StockTransaction ||

model(
  "StockTransaction",
  StockTransactionSchema
);



export default StockTransaction;