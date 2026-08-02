import {
  Package,
  TrendingDown,
  TrendingUp,
  Warehouse,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import TransactionTable from "@/components/stock/transaction-table";





// GET STOCK TRANSACTIONS



async function getTransactions() {


  try {


    const res = await fetch(
      "http://localhost:3000/api/stock",
      {
        cache:"no-store",
      }
    );



    const data = await res.json();



    if(data.success){

      return data.transactions;

    }



    return [];



  } catch(error){


    console.log(
      "Transaction fetch error:",
      error
    );


    return [];


  }


}







// INVENTORY PAGE



export default async function InventoryPage(){



  const transactions = await getTransactions();





  const totalIn = transactions.filter(
    (item:any)=>
      item.type === "IN"
  ).length;




  const totalOut = transactions.filter(
    (item:any)=>
      item.type === "OUT"
  ).length;





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





      {/* HEADER */}


      <div>


        <h1
          className="
          text-3xl
          font-bold
          "
        >

          Inventory

        </h1>



        <p
          className="
          text-muted-foreground
          "
        >

          Manage stock movements and inventory history

        </p>


      </div>









      {/* SUMMARY CARDS */}



      <div
        className="
        grid
        gap-4
        md:grid-cols-3
        "
      >





        <Card
          className="rounded-2xl"
        >


          <CardHeader
            className="
            flex
            flex-row
            items-center
            justify-between
            "
          >


            <CardTitle
              className="text-sm"
            >

              Total Transactions

            </CardTitle>


            <Warehouse
              className="
              h-5
              w-5
              "
            />


          </CardHeader>



          <CardContent>


            <p
              className="
              text-3xl
              font-bold
              "
            >

              {transactions.length}

            </p>


          </CardContent>


        </Card>









        <Card
          className="rounded-2xl"
        >


          <CardHeader
            className="
            flex
            flex-row
            items-center
            justify-between
            "
          >


            <CardTitle
              className="text-sm"
            >

              Stock IN

            </CardTitle>


            <TrendingUp
              className="
              h-5
              w-5
              text-green-600
              "
            />


          </CardHeader>



          <CardContent>


            <p
              className="
              text-3xl
              font-bold
              "
            >

              {totalIn}

            </p>


          </CardContent>


        </Card>









        <Card
          className="rounded-2xl"
        >


          <CardHeader
            className="
            flex
            flex-row
            items-center
            justify-between
            "
          >


            <CardTitle
              className="text-sm"
            >

              Stock OUT

            </CardTitle>


            <TrendingDown
              className="
              h-5
              w-5
              text-red-600
              "
            />


          </CardHeader>



          <CardContent>


            <p
              className="
              text-3xl
              font-bold
              "
            >

              {totalOut}

            </p>


          </CardContent>


        </Card>





      </div>









      {/* TRANSACTION TABLE */}


      <TransactionTable

        transactions={transactions}

      />






    </div>


  );


}