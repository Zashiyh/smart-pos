import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";


export async function PUT(req: NextRequest) {

  try {

    await connectDB();


    const body = await req.json();


    const {
      userId,
      currentPassword,
      newPassword
    } = body;



    if(
      !userId ||
      !currentPassword ||
      !newPassword
    ){

      return NextResponse.json(
        {
          success:false,
          message:"All fields are required"
        },
        {
          status:400
        }
      );

    }



    const user = await User.findById(userId);



    if(!user){

      return NextResponse.json(
        {
          success:false,
          message:"User not found"
        },
        {
          status:404
        }
      );

    }



    // check old password

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );


    if(!isMatch){

      return NextResponse.json(
        {
          success:false,
          message:"Current password is incorrect"
        },
        {
          status:401
        }
      );

    }



    // hash new password

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );



    user.password = hashedPassword;

    user.lastPasswordChange = new Date();


    await user.save();



    return NextResponse.json(
      {
        success:true,
        message:"Password changed successfully"
      },
      {
        status:200
      }
    );



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

}a