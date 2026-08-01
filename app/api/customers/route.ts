import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/customer";


// GET CUSTOMERS

export async function GET(){

try{

await connectDB();


const customers =
await Customer.find()
.sort({
createdAt:-1
});


return NextResponse.json({

success:true,
customers

});


}catch(error:any){


return NextResponse.json({

success:false,
message:error.message

},
{
status:500
});


}

}



// ADD CUSTOMER

export async function POST(
req:NextRequest
){

try{


await connectDB();


const body =
await req.json();



const customer =
await Customer.create({

name:body.name,

phone:body.phone,

email:body.email,

address:body.address,

customerType:
body.customerType || "Regular",

creditLimit:
Number(body.creditLimit || 0),


});



return NextResponse.json({

success:true,

message:
"Customer added successfully",

customer

},
{
status:201
});


}catch(error:any){


return NextResponse.json({

success:false,

message:error.message

},
{
status:500
});


}


}