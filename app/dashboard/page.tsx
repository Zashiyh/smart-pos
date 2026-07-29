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








// =================================
// DASHBOARD PAGE
// =================================


export default async function DashboardPage(){



const products = await getProducts();





const totalProducts = products.length;



const totalStock = products.reduce(
(total:any,product:any)=>
total + Number(product.stock || 0),
0
);





const lowStockProducts = products.filter(
(product:any)=>
product.stock <= product.minStock
);






const inventoryValue = products.reduce(
(total:any,product:any)=>

total +
(
Number(product.costPrice || 0)
*
Number(product.stock || 0)
),

0

);







const stats = [

{

title:"Total Products",

value:totalProducts,

icon:Package,

description:"Products in inventory"

},


{

title:"Total Stock",

value:totalStock,

icon:Boxes,

description:"Available stock quantity"

},



{

title:"Low Stock Items",

value:lowStockProducts.length,

icon:AlertTriangle,

description:"Need restocking"

},




{

title:"Inventory Value",

value:`LKR${inventoryValue.toLocaleString()}`,

icon:Wallet,

description:"Current stock value"

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