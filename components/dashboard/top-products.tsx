"use client";

import {
  Trophy,
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
    rank: 1,
    name: "iPhone 15",
    sold: 120,
    revenue: "£12,000",
    progress: "90%",
  },
  {
    rank: 2,
    name: "Wireless Mouse",
    sold: 95,
    revenue: "£2,850",
    progress: "70%",
  },
  {
    rank: 3,
    name: "Mechanical Keyboard",
    sold: 80,
    revenue: "£4,000",
    progress: "60%",
  },
  {
    rank: 4,
    name: "Laptop Bag",
    sold: 65,
    revenue: "£1,950",
    progress: "45%",
  },
];




export default function TopProducts() {


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
              bg-yellow-500/10
            "
          >

            <Trophy
              className="
                h-5
                w-5
                text-yellow-500
              "
            />

          </div>


          <div>

            <CardTitle>
              Top Selling Products
            </CardTitle>


            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Best performing products
            </p>

          </div>


        </div>


      </CardHeader>





      <CardContent>


        <div
          className="
            space-y-5
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



                    {/* Rank */}

                    <div

                      className={`

                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        text-sm
                        font-bold


                        ${
                          product.rank === 1

                          ?

                          "bg-yellow-500/20 text-yellow-600"

                          :

                          product.rank === 2

                          ?

                          "bg-gray-400/20 text-gray-600"

                          :

                          product.rank === 3

                          ?

                          "bg-orange-500/20 text-orange-600"

                          :

                          "bg-primary/10 text-primary"

                        }

                      `}

                    >

                      {product.rank}

                    </div>






                    {/* Product */}

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
                          {product.sold} sold
                        </p>


                      </div>


                    </div>



                  </div>






                  {/* Revenue */}


                  <div
                    className="
                      text-right
                    "
                  >

                    <p
                      className="
                        font-bold
                      "
                    >
                      {product.revenue}
                    </p>


                    <p
                      className="
                        text-xs
                        text-muted-foreground
                      "
                    >
                      Revenue
                    </p>


                  </div>



                </div>







                {/* Progress */}

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

                    className="
                      h-full
                      rounded-full
                      bg-primary
                      transition-all
                      duration-700
                    "

                    style={{
                      width: product.progress,
                    }}

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