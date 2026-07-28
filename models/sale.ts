import mongoose, { Schema, models } from "mongoose";



const SaleSchema = new Schema(

{
  
  invoiceNumber:{
    type:String,
    required:true,
    unique:true,
  },


  customerName:{
    type:String,
    default:"Walk-in Customer",
  },


  products:[

    {

      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
      },


      name:{
        type:String,
        required:true,
      },


      quantity:{
        type:Number,
        required:true,
      },


      price:{
        type:Number,
        required:true,
      },


      subtotal:{
        type:Number,
        required:true,
      }

    }

  ],



  totalAmount:{
    type:Number,
    required:true,
  },



  paymentMethod:{
    type:String,
    enum:[
      "Cash",
      "Card",
      "Online"
    ],
    default:"Cash",
  },


  status:{
    type:String,
    default:"Completed",
  }


},


{
  timestamps:true,
}


);



const Sale =
models.Sale ||
mongoose.model(
  "Sale",
  SaleSchema
);



export default Sale;