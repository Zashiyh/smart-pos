import Link from "next/link";
import {
  Plus,
  Search,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  Button,
} from "@/components/ui/button";


import {
  Input,
} from "@/components/ui/input";



async function getProducts() {

  try {

    const res = await fetch(
      "http://localhost:3000/api/products",
      {
        cache: "no-store",
      }
    );


    const data = await res.json();


    if(data.success){

      return data.products;

    }


    return [];


  } catch(error){


    console.log(
      "Product fetch error:",
      error
    );


    return [];


  }

}






export default async function ProductsPage(){


  const products = await getProducts();





  return (

    <div
      className="
        min-h-screen
        space-y-6
        rounded-3xl
        bg-muted/30
        p-6
      "
    >





      {/* Header */}


      <div
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
            "
          >
            Products
          </h1>


          <p
            className="
              text-muted-foreground
            "
          >
            Manage your inventory products
          </p>


        </div>





        <Link href="/dashboard/products/add">


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



      </div>









      {/* Search */}


      <Card
        className="
          rounded-2xl
        "
      >

        <CardContent
          className="
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              px-4
            "
          >

            <Search
              className="
                h-5
                w-5
                text-muted-foreground
              "
            />


            <Input

              placeholder="Search products..."

              className="
                border-0
                focus-visible:ring-0
              "

            />


          </div>


        </CardContent>


      </Card>









      {/* Products Table */}



      <Card
        className="
          rounded-2xl
        "
      >


        <CardHeader>

          <CardTitle>

            All Products ({products.length})

          </CardTitle>

        </CardHeader>





        <CardContent>


          <div
            className="
              overflow-x-auto
            "
          >


            <table
              className="
                w-full
                text-sm
              "
            >


              <thead>


                <tr
                  className="
                    border-b
                    text-left
                    text-muted-foreground
                  "
                >

                  <th className="p-3">
                    Name
                  </th>


                  <th className="p-3">
                    Category
                  </th>


                  <th className="p-3">
                    Price
                  </th>


                  <th className="p-3">
                    Stock
                  </th>


                  <th className="p-3">
                    Status
                  </th>


                </tr>


              </thead>







              <tbody>


                {products.length === 0 ? (


                  <tr>

                    <td
                      colSpan={5}
                      className="
                        p-6
                        text-center
                        text-muted-foreground
                      "
                    >

                      No products found.

                    </td>


                  </tr>



                ) : (


                  products.map((product:any)=>(


                    <tr
                      key={product._id}
                      className="
                        border-b
                        hover:bg-muted/50
                      "
                    >


                      <td className="p-3 font-medium">

                        {product.name}

                      </td>



                      <td className="p-3">

                        {product.category}

                      </td>




                      <td className="p-3">

                        £{product.sellingPrice}

                      </td>





                      <td className="p-3">

                        {product.stock}

                      </td>





                      <td className="p-3">


                        <span
                          className="
                            rounded-full
                            bg-green-500/10
                            px-3
                            py-1
                            text-xs
                            text-green-600
                          "
                        >

                          {product.status}

                        </span>


                      </td>



                    </tr>


                  ))


                )}


              </tbody>



            </table>



          </div>



        </CardContent>



      </Card>






    </div>


  );


}