import StatsCard from "@/components/dashboard/stats-card";
import SalesOverview from "@/components/dashboard/sales-overview";
import RecentSales from "@/components/dashboard/recent-sales";
import LowStock from "@/components/dashboard/low-stock";
import TopProducts from "@/components/dashboard/top-products";
import FadeIn from "@/components/animations/fade-in";

import {
  Package,
  Boxes,
  AlertTriangle,
  Wallet,
} from "lucide-react";




// =================================
// GET PRODUCTS
// =================================

async function getProducts(){


  try{


    const res = await fetch(
      "http://localhost:3000/api/products",
      {
        cache:"no-store",
      }
    );



    const data = await res.json();



    if(data.success){

      return data.products;

    }



    return [];



  }catch(error){


    console.log(
      "Dashboard product error:",
      error
    );


    return [];

  }


}


async function getStats(){

  try{

    const res = await fetch(
      "http://localhost:3000/api/dashboard/stats",
      {
        cache:"no-store",
      }
    );


    const data = await res.json();


    if(data.success){

      return data.stats;

    }


    return null;


  }catch(error){

    console.log(
      "Dashboard stats error:",
      error
    );

    return null;

  }

}








// =================================
// DASHBOARD PAGE
// =================================


export default async function DashboardPage(){



const [
  products,
  statsData
] = await Promise.all([
  getProducts(),
  getStats()
]);




















const stats = [

{
title:"Total Products",

value:
statsData?.totalProducts ?? 0,

icon:Package,

description:"Products in inventory"

},



{
title:"Today's Revenue",

value:
`LKR ${
(statsData?.todayRevenue ?? 0)
.toLocaleString("en-LK")
}`,

icon:Wallet,

description:"Today's sales"

},



{
title:"Today's Orders",

value:
statsData?.todayOrders ?? 0,

icon:Boxes,

description:"Completed orders"

},



{
title:"Low Stock Items",

value:
statsData?.lowStockProducts ?? 0,

icon:AlertTriangle,

description:"Need restocking"

}

];








return (



<div

className="
min-h-screen
space-y-8
rounded-3xl
bg-muted/30
p-6
"

>







{/* HEADER */}



<FadeIn>


<div>


<h1

className="
text-3xl
font-bold
"

>

Dashboard

</h1>



<p

className="
text-muted-foreground
"

>

SmartPOS overview and analytics

</p>


</div>


</FadeIn>









{/* STATS */}



<div

className="
grid
gap-6
md:grid-cols-2
xl:grid-cols-4
"

>


{
stats.map(
(item,index)=>(


<FadeIn

key={item.title}

delay={index*0.1}

>


<StatsCard

title={item.title}

value={item.value}

icon={item.icon}

description={item.description}

/>


</FadeIn>


)

)


}



</div>









{/* SALES OVERVIEW */}



<FadeIn delay={0.4}>


<SalesOverview />


</FadeIn>









{/* RECENT SALES + LOW STOCK */}



<div

className="
grid
gap-6
lg:grid-cols-2
"

>



<FadeIn delay={0.5}>


<RecentSales />


</FadeIn>







<FadeIn delay={0.6}>


<LowStock

products={products}

/>


</FadeIn>




</div>









{/* TOP PRODUCTS */}



<FadeIn delay={0.7}>


<TopProducts />


</FadeIn>







</div>



);


}