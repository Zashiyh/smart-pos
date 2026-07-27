import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI as string;


// Debug (temporary)
console.log("MongoDB URI Loaded:", MONGODB_URI);



if (!MONGODB_URI) {

  throw new Error(
    "Please define MONGODB_URI inside .env"
  );

}



let cached = (global as any).mongoose;



if (!cached) {

  cached = (global as any).mongoose = {

    conn: null,
    promise: null,

  };

}



export async function connectDB() {


  try {


    if (cached.conn) {

      return cached.conn;

    }



    if (!cached.promise) {


      cached.promise = mongoose.connect(
        MONGODB_URI
      );


    }



    cached.conn = await cached.promise;


    console.log("MongoDB Connected Successfully 🚀");


    return cached.conn;



  } catch (error) {


    console.log(
      "MongoDB Connection Error:",
      error
    );


    throw error;


  }


}