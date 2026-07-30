import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Sale from "@/models/sale";



export async function GET(){


try{


await connectDB();





const sales = await Sale.aggregate([

{
$group:{

_id:{

month:{
$month:"$createdAt"
},

year:{
$year:"$createdAt"
}

},


total:{

$sum:"$totalAmount"

}


}

},



{
$sort:{

"_id.year":1,

"_id.month":1

}

}


]);







const monthNames = [

"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"

];







// Current year

const currentYear =
new Date().getFullYear();







// Create 12 months with default 0


const monthlySales = monthNames.map(
(month,index)=>{


const monthNumber =
index + 1;



const found =
sales.find(
(item)=>
item._id.month === monthNumber &&
item._id.year === currentYear
);





return {

month,


sales:
found
?
found.total
:
0


};


}

);








return NextResponse.json({

success:true,

sales:monthlySales

});





}catch(error:any){


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