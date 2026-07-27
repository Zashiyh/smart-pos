"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CreditCard,
  Banknote,
} from "lucide-react";



const sales = [
  {
    invoice: "#INV001",
    customer: "John Smith",
    amount: "£250",
    payment: "Cash",
    status: "Paid",
  },
  {
    invoice: "#INV002",
    customer: "David Wilson",
    amount: "£430",
    payment: "Card",
    status: "Paid",
  },
  {
    invoice: "#INV003",
    customer: "Sarah Brown",
    amount: "£180",
    payment: "Cash",
    status: "Pending",
  },
  {
    invoice: "#INV004",
    customer: "Michael Lee",
    amount: "£620",
    payment: "Card",
    status: "Paid",
  },
];



export default function RecentSales() {


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
            justify-between
          "
        >

          <div>

            <CardTitle
              className="
                text-xl
                font-semibold
              "
            >
              Recent Sales
            </CardTitle>


            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Latest customer transactions
            </p>

          </div>


        </div>


      </CardHeader>





      <CardContent>


        <div
          className="
            overflow-x-auto
          "
        >

          <Table>


            <TableHeader>


              <TableRow
                className="
                  hover:bg-transparent
                "
              >

                <TableHead>
                  Invoice
                </TableHead>


                <TableHead>
                  Customer
                </TableHead>


                <TableHead>
                  Amount
                </TableHead>


                <TableHead>
                  Payment
                </TableHead>


                <TableHead>
                  Status
                </TableHead>


              </TableRow>


            </TableHeader>





            <TableBody>


              {
                sales.map((sale)=>(


                  <TableRow
                    key={sale.invoice}
                    className="
                      transition
                      hover:bg-muted/50
                    "
                  >


                    <TableCell
                      className="
                        font-medium
                      "
                    >
                      {sale.invoice}
                    </TableCell>





                    <TableCell>


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
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/10
                            text-sm
                            font-semibold
                            text-primary
                          "
                        >

                          {
                            sale.customer
                              .charAt(0)
                          }

                        </div>



                        <span>
                          {sale.customer}
                        </span>


                      </div>


                    </TableCell>





                    <TableCell
                      className="
                        font-semibold
                      "
                    >
                      {sale.amount}
                    </TableCell>





                    <TableCell>


                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        {
                          sale.payment === "Card"
                          ?

                          <CreditCard
                            className="
                              h-4
                              w-4
                              text-blue-500
                            "
                          />

                          :

                          <Banknote
                            className="
                              h-4
                              w-4
                              text-green-500
                            "
                          />

                        }


                        {sale.payment}


                      </div>


                    </TableCell>






                    <TableCell>


                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium

                          ${
                            sale.status === "Paid"

                            ?

                            "bg-green-500/10 text-green-600"

                            :

                            "bg-yellow-500/10 text-yellow-600"

                          }
                        `}
                      >

                        {sale.status}

                      </span>


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