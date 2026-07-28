// ===============================
// IMPORTS
// ===============================

import Link from "next/link";

import {
  Plus,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import ProductTable from "@/components/products/product-table";





// ===============================
// TYPES
// ===============================


interface Product {


  _id:string;

  name:string;

  barcode:string;

  sku:string;

  category:string;

  brand:string;

  supplier:string;

  costPrice:number;

  sellingPrice:number;

  stock:number;

  status:string;


}







// ===============================
// CONSTANTS
// ===============================


const API_URL =
process.env.NEXT_PUBLIC_API_URL ??
"http://localhost:3000";








// ===============================
// API SERVICE
// ===============================


async function getProducts():Promise<Product[]> {


  try {



    const response = await fetch(

      `${API_URL}/api/products`,

      {
        cache:"no-store",
      }

    );






    if(!response.ok){


      throw new Error(
        "Failed to fetch products"
      );


    }







    const data = await response.json();






    if(!data.success){


      return [];

    }






    return data.products || [];







  } catch(error){



    console.error(
      "GET PRODUCTS ERROR:",
      error
    );



    return [];



  }


}









// ===============================
// PAGE COMPONENT
// ===============================


export default async function ProductsPage(){



  const products =
  await getProducts();






  return (



    <main


      className="
      min-h-screen
      space-y-6
      rounded-3xl
      bg-muted/30
      p-6
      "

    >







      {/* ===============================
          PAGE HEADER
      =============================== */}





      <section


        className="
        flex
        items-center
        justify-between
        "


      >





        <div>


          <h1


            className="
            text-3xl
            font-bold
            tracking-tight
            "

          >

            Products


          </h1>





          <p


            className="
            text-muted-foreground
            "

          >

            Manage your inventory products and stock


          </p>




        </div>









        {/* CREATE PRODUCT BUTTON */}




        <Link


          href="/dashboard/products/add"


        >



          <Button


            className="
            rounded-xl
            "


          >



            <Plus


              className="
              mr-2
              h-4
              w-4
              "


            />



            Add Product



          </Button>




        </Link>







      </section>













      {/* ===============================
          PRODUCT TABLE
      =============================== */}





      <section>


        <ProductTable

          products={products}

        />


      </section>








    </main>


  );


}