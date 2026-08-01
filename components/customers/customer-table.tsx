"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CardContent,
} from "@/components/ui/card";

import {
  Search,
  Users,
} from "lucide-react";


interface Customer {

  _id:string;

  name:string;

  phone:string;

  email?:string;

  address?:string;

  customerType:string;

  creditLimit:number;

  totalSpent:number;

  status:string;

}



export default function CustomerTable(){


  const [customers,setCustomers] =
    useState<Customer[]>([]);


  const [search,setSearch] =
    useState("");



  const fetchCustomers = async()=>{

    try{


      const res = await fetch(
        "/api/customers",
        {
          cache:"no-store",
        }
      );


      const data =
        await res.json();


      if(data.success){

        setCustomers(
          data.customers
        );

      }


    }catch(error){

      console.log(
        "CUSTOMER FETCH ERROR:",
        error
      );

    }


  };



  useEffect(()=>{

    fetchCustomers();

  },[]);





  const filteredCustomers =
    customers.filter((customer)=>{


      return (

        customer.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

        ||

        customer.phone
        .includes(search)

      );


    });






return (

<CardContent className="p-0">


{/* SEARCH */}

<div
className="
mb-6
flex
items-center
gap-3
rounded-xl
border
px-4
h-11
"
>

<Search
className="
w-5
h-5
text-gray-400
"
/>


<input

placeholder="Search customer..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="
flex-1
outline-none
bg-transparent
dark:text-white
"

/>


</div>





<div className="overflow-x-auto">


<Table>


<TableHeader>

<TableRow>


<TableHead>
Customer
</TableHead>


<TableHead>
Phone
</TableHead>


<TableHead>
Type
</TableHead>


<TableHead>
Credit Limit
</TableHead>


<TableHead>
Spent
</TableHead>


<TableHead>
Status
</TableHead>


</TableRow>

</TableHeader>





<TableBody>


{
filteredCustomers.length === 0 ? (


<TableRow>

<TableCell
colSpan={6}
className="
text-center
py-10
text-gray-500
"
>

<Users
className="
inline
mr-2
w-5
h-5
"
/>

No customers found


</TableCell>

</TableRow>


)

:

filteredCustomers.map((customer)=>(


<TableRow
key={customer._id}
>


<TableCell
className="
font-medium
dark:text-white
"
>

{customer.name}

</TableCell>



<TableCell>

{customer.phone}

</TableCell>



<TableCell>

<span
className="
rounded-full
bg-blue-100
dark:bg-blue-900/30
px-3
py-1
text-xs
text-blue-700
dark:text-blue-300
"
>

{customer.customerType}

</span>

</TableCell>




<TableCell>

LKR {
customer.creditLimit
.toLocaleString("en-LK")
}

</TableCell>




<TableCell>

LKR {
customer.totalSpent
.toLocaleString("en-LK")
}

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
customer.status === "Active"

?

"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"

:

"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"

}

`}
>

{customer.status}

</span>


</TableCell>




</TableRow>


))


}


</TableBody>


</Table>


</div>


</CardContent>


);


}