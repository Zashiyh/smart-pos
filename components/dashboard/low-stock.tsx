"use client";

import {
  AlertTriangle,
  Package,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



const products = [
  {
    name: "Wireless Mouse",
    stock: 5,
    status: "Low",
  },
  {
    name: "Keyboard",
    stock: 2,
    status: "Critical",
  },
  {
    name: "Laptop Bag",
    stock: 8,
    status: "Low",
  },
  {
    name: "USB Cable",
    stock: 1,
    status: "Critical",
  },
];





export default function LowStock() {


  return (

    <Card
      className="
        rounded-2xl
        border
        bg-card/80
        backdrop-blur-xl
        shadow-sm
      "
    >


      <CardHeader>


        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-yellow-500/10
            "
          >

            <AlertTriangle
              className="
                h-5
                w-5
                text-yellow-500
              "
            />

          </div>


          <div>

            <CardTitle>
              Low Stock Products
            </CardTitle>


            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Products that need restocking
            </p>


          </div>


        </div>


      </CardHeader>





      <CardContent>


        <div
          className="
            space-y-4
          "
        >


          {
            products.map((product)=>(


              <div

                key={product.name}

                className="
                  group
                  rounded-xl
                  border
                  p-4
                  transition-all
                  hover:bg-muted/40
                  hover:shadow-md
                "

              >



                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >



                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >


                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary/10
                        text-primary
                      "
                    >

                      <Package
                        className="
                          h-5
                          w-5
                        "
                      />

                    </div>



                    <div>

                      <p
                        className="
                          font-medium
                        "
                      >
                        {product.name}
                      </p>


                      <p
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {product.stock} units remaining
                      </p>


                    </div>



                  </div>





                  <span
                    className={`

                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold


                      ${
                        product.status === "Critical"

                        ?

                        "bg-red-500/10 text-red-600"

                        :

                        "bg-yellow-500/10 text-yellow-600"

                      }

                    `}
                  >

                    {product.status}

                  </span>



                </div>





                {/* Stock Bar */}

                <div
                  className="
                    mt-4
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-muted
                  "
                >

                  <div

                    className={`

                      h-full
                      rounded-full
                      transition-all

                      ${
                        product.status === "Critical"

                        ?

                        "w-[20%] bg-red-500"

                        :

                        "w-[50%] bg-yellow-500"

                      }

                    `}

                  />

                </div>



              </div>


            ))
          }


        </div>


      </CardContent>


    </Card>

  );

}