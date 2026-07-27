import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";


const JWT_SECRET = process.env.JWT_SECRET as string;


export async function POST(req: NextRequest) {

  try {

    await connectDB();


    const body = await req.json();


    const {
      email,
      password,
    } = body;



    if (!email || !password) {

      return NextResponse.json(
        {
          success:false,
          message:"Email and password are required."
        },
        {
          status:400
        }
      );

    }



    const user = await User.findOne({
      email: email.toLowerCase()
    });



    if (!user) {

      return NextResponse.json(
        {
          success:false,
          message:"Invalid email or password."
        },
        {
          status:401
        }
      );

    }



    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );



    if (!passwordMatch) {

      return NextResponse.json(
        {
          success:false,
          message:"Invalid email or password."
        },
        {
          status:401
        }
      );

    }



    const token = jwt.sign(
      {
        id:user._id,
        email:user.email,
        role:user.role
      },
      JWT_SECRET,
      {
        expiresIn:"7d"
      }
    );



    const response = NextResponse.json(
      {
        success:true,
        message:"Login successful.",
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role
        }
      }
    );



    response.cookies.set(
      "token",
      token,
      {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:60 * 60 * 24 * 7,
        path:"/"
      }
    );



    return response;



  } catch(error:any) {


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