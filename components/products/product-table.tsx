"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
} from "@/components/ui/card";



interface Product {

  _id: string;

  name: string;

  barcode?: string;

  sku?: string;

  category?: string;

  brand?: string;

  stock: number;

  sellingPrice: number;

  status?: string;

}




interface ProductTableProps {

  products: Product[];

}





const categories = [
  "All",
  "Grocery",
  "Beverages",
  "Dairy",
  "Bakery",
  "Frozen Foods",
  "Household",
  "Personal Care",
  "Electronics",
  "Pharmacy",
];







export default function ProductTable({

  products,

}: ProductTableProps) {



  const [search,setSearch] =
    useState("");



  const [category,setCategory] =
    useState("All");






  const filteredProducts =
    products.filter((product)=>{



      const searchMatch =
        product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );




      const categoryMatch =
        category === "All" ||
        product.category === category;




      return (
        searchMatch &&
        categoryMatch
      );


    });







  return (


    <Card
      className="
      rounded-2xl
      "
    >


      <CardContent
        className="
        p-6
        "
      >





        <div

          className="
          mb-6
          flex
          flex-col
          gap-4
          md:flex-row
          "

        >



          <input


            placeholder="Search product..."


            value={search}


            onChange={(e)=>
              setSearch(e.target.value)
            }


            className="
            h-10
            rounded-xl
            border
            bg-background
            px-4
            outline-none
            "


          />







          <select


            value={category}


            onChange={(e)=>
              setCategory(e.target.value)
            }


            className="
            h-10
            rounded-xl
            border
            bg-background
            px-4
            "


          >


            {
              categories.map((cat)=>(


                <option

                  key={cat}

                  value={cat}

                >

                  {cat}


                </option>


              ))
            }



          </select>




        </div>









        <div className="overflow-x-auto">



          <Table>


            <TableHeader>


              <TableRow>


                <TableHead>
                  Product
                </TableHead>


                <TableHead>
                  Category
                </TableHead>


                <TableHead>
                  Brand
                </TableHead>


                <TableHead>
                  Stock
                </TableHead>


                <TableHead>
                  Price
                </TableHead>


              </TableRow>


            </TableHeader>







            <TableBody>



              {
                filteredProducts.length === 0 ?


                (

                  <TableRow>


                    <TableCell

                      colSpan={5}

                      className="
                      text-center
                      "

                    >

                      No products found


                    </TableCell>


                  </TableRow>


                )



                :



                filteredProducts.map((product)=>(



                  <TableRow

                    key={product._id}

                  >



                    <TableCell

                      className="
                      font-medium
                      "

                    >

                      {product.name}


                    </TableCell>





                    <TableCell>

                      {product.category || "-"}


                    </TableCell>





                    <TableCell>

                      {product.brand || "-"}


                    </TableCell>





                    <TableCell>


                      <span

                        className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs

                        ${
                          product.stock <= 10

                          ?

                          "bg-red-500/10 text-red-600"

                          :

                          "bg-green-500/10 text-green-600"

                        }

                        `}

                      >

                        {product.stock}


                      </span>


                    </TableCell>







                    <TableCell>


                      LKR{" "}

                      {Number(
                        product.sellingPrice
                      ).toLocaleString("en-LK")}



                    </TableCell>





                  </TableRow>



                ))


              }




            </TableBody>



          </Table>




        </div>




      </CardContent>



    </Card>


  );


}