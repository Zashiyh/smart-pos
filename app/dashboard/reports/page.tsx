import StatsCard from "@/components/dashboard/stats-card";
import RevenueChart from "@/components/dashboard/revenue-chart";
import SalesChart from "@/components/dashboard/sales-chart";
import TopProducts from "@/components/dashboard/top-products";
import RecentSales from "@/components/dashboard/recent-sales";
import LowStock from "@/components/dashboard/low-stock";


import {
  Wallet,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";





// =====================================
// GET REPORT STATS
// =====================================


async function getReports(){


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
      "Reports stats error:",
      error
    );


    return null;


  }


}









// =====================================
// GET PRODUCTS
// =====================================


async function getProducts(){


  try{


    const res = await fetch(

      "http://localhost:3000/api/products",

      {
        cache:"no-store",
      }

    );



    const data =
      await res.json();




    if(data.success){

      return data.products || [];

    }




    return [];




  }catch(error){


    console.log(
      "Products fetch error:",
      error
    );


    return [];

  }


}











// =====================================
// REPORT PAGE
// =====================================


export default async function ReportsPage(){



  const [

    statsData,

    products

  ] = await Promise.all([

    getReports(),

    getProducts()

  ]);








  const cards = [


    {

      title:"Today's Revenue",

      value:

      `LKR ${
        (
          statsData?.todayRevenue ?? 0
        )
        .toLocaleString("en-LK")
      }`,

      icon:Wallet,

      description:"Revenue today"

    },




    {

      title:"Today's Orders",

      value:

      String(
        statsData?.todayOrders ?? 0
      ),

      icon:ShoppingCart,

      description:"Orders completed"

    },





    {

      title:"Total Products",

      value:

      String(
        statsData?.totalProducts ?? 0
      ),

      icon:Package,

      description:"Inventory items"

    },





    {

      title:"Low Stock",

      value:

      String(
        statsData?.lowStockProducts ?? 0
      ),

      icon:TrendingUp,

      description:"Need restock"

    }


  ];








return (


<main


className="
min-h-screen
space-y-8
rounded-3xl
bg-muted/30
p-6
"


>





<div>


<h1

className="
text-3xl
font-bold
"

>

Reports

</h1>



<p

className="
text-muted-foreground
"

>

Business reports and analytics

</p>


</div>









<div


className="
grid
gap-6
md:grid-cols-2
xl:grid-cols-4
"


>


{

cards.map((card)=>(


<StatsCard


key={card.title}


title={card.title}


value={card.value}


icon={card.icon}


description={card.description}


/>


))


}



</div>









<div


className="
grid
gap-6
lg:grid-cols-2
"


>


<RevenueChart />


<SalesChart />


</div>









<div


className="
grid
gap-6
lg:grid-cols-2
"


>


<RecentSales />



<LowStock

products={products}

/>



</div>








<TopProducts />







</main>


);


}