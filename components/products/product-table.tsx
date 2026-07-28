"use client";


import { useState } from "react";
import Link from "next/link";


import {
  Pencil,
  Search,
} from "lucide-react";


// DELETE COMPONENT
import DeleteDialog from "@/components/products/delete-dialog";



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





// ===============================
// TYPES
// ===============================


interface ProductTableProps {

  products: any[];

}








// ===============================
// PRODUCT TABLE COMPONENT
// ===============================


export default function ProductTable({

  products

}: ProductTableProps) {



  const [search, setSearch] = useState("");






  // ===============================
  // SEARCH FILTER
  // ===============================


  const filteredProducts = products.filter(
    (product) =>


      product.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )


      ||

      product.category
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

  );









  return (



    <Card className="rounded-2xl">





      {/* HEADER */}

      <CardHeader>


        <CardTitle>


          All Products ({filteredProducts.length})


        </CardTitle>


      </CardHeader>









      <CardContent>





        {/* ===============================
            SEARCH BOX
        =============================== */}



        <div

          className="
          mb-5
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


            value={search}


            onChange={
              (e)=>
                setSearch(e.target.value)
            }



            className="
            border-0
            focus-visible:ring-0
            "


          />



        </div>









        {/* ===============================
            TABLE
        =============================== */}



        <div className="overflow-x-auto">





          <table className="w-full text-sm">






            {/* TABLE HEADER */}



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



                <th className="p-3">
                  Actions
                </th>



              </tr>


            </thead>









            {/* TABLE BODY */}



            <tbody>




              {
                filteredProducts.length === 0 ? (



                  <tr>


                    <td

                      colSpan={6}

                      className="
                      p-6
                      text-center
                      text-muted-foreground
                      "

                    >


                      No products found.


                    </td>



                  </tr>



                )



                :



                (



                  filteredProducts.map(
                    (product:any)=>(



                      <tr

                        key={product._id}

                        className="
                        border-b
                        hover:bg-muted/50
                        "

                      >








                        {/* NAME */}


                        <td

                          className="
                          p-3
                          font-medium
                          "

                        >

                          {product.name}


                        </td>










                        {/* CATEGORY */}



                        <td className="p-3">


                          {product.category}


                        </td>










                        {/* PRICE */}



                        <td className="p-3">


                          £{product.sellingPrice}


                        </td>










                        {/* STOCK */}



                        <td className="p-3">


                          {product.stock}


                        </td>










                        {/* STATUS */}



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









                        {/* ACTIONS */}



                        <td className="p-3">



                          <div className="flex gap-2">







                            {/* EDIT BUTTON */}



                            <Link

                              href={
                                `/dashboard/products/edit?id=${product._id}`
                              }

                            >



                              <Button

                                variant="outline"

                                size="icon"

                                className="rounded-xl"

                              >



                                <Pencil

                                  className="
                                  h-4
                                  w-4
                                  "

                                />



                              </Button>



                            </Link>









                            {/* DELETE BUTTON */}



                            <DeleteDialog

                              id={product._id}

                            />






                          </div>




                        </td>









                      </tr>



                    )

                  )



                )

              }





            </tbody>






          </table>






        </div>





      </CardContent>





    </Card>



  );


}