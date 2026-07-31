import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

import { verifyToken } from "@/lib/auth";


export async function PUT(req: NextRequest) {


try {


await connectDB();



const token =
req.cookies.get("token")?.value;



if(!token){

return NextResponse.json(
{
success:false,
message:"Not authenticated"
},
{
status:401
}
);

}



const decoded:any =
verifyToken(token);



if(!decoded){

return NextResponse.json(
{
success:false,
message:"Invalid token"
},
{
status:401
}
);

}





const {
currentPassword,
newPassword
}=await req.json();




if(!currentPassword || !newPassword){

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





const user =
await User.findById(
decoded.id
);




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






const passwordMatch =
await bcrypt.compare(
currentPassword,
user.password
);





if(!passwordMatch){

return NextResponse.json(
{
success:false,
message:"Current password is incorrect"
},
{
status:400
}
);

}





user.password =
await bcrypt.hash(
newPassword,
10
);



user.lastPasswordChange =
new Date();



await user.save();






return NextResponse.json(
{
success:true,
message:"Password changed successfully"
}
);



}
catch(error:any){


console.log(
"CHANGE PASSWORD ERROR:",
error
);



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