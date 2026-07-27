import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";


export async function GET() {

  try {

    // MongoDB connect
    await connectDB();


    // Test user create
    const user = await User.create({
      name: "Test Admin",
      email: "admin@smartpos.com",
      password: "123456",
      role: "Admin",
    });


    return NextResponse.json(
      {
        success: true,
        message: "User created successfully 🚀",
        user,
      },
      {
        status: 200,
      }
    );


  } catch (error: any) {


    console.log("FULL ERROR:", error);



    return NextResponse.json(
      {
        success: false,
        message: "Database Error",
        error: error?.message || String(error),
      },
      {
        status: 500,
      }
    );


  }

}