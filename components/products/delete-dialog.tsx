"use client";


// ===============================
// IMPORTS
// ===============================

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";





// ===============================
// DELETE PRODUCT BUTTON
// ===============================


export default function DeleteProductButton(
  {
    id
  }:{
    id:string
  }
){



  const router = useRouter();






  // ===============================
  // DELETE FUNCTION
  // ===============================


  const handleDelete = async()=>{



    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );



    if(!confirmDelete){

      return;

    }





    const res = await fetch(
      `/api/products/${id}`,
      {

        method:"DELETE"

      }
    );





    const data = await res.json();





    console.log(data);





    if(data.success){


      alert(
        "Product deleted successfully"
      );



      router.refresh();



    }else{


      alert(
        "Delete failed"
      );


    }





  };








  return (


    <Button

      variant="outline"

      size="icon"

      className="rounded-xl"

      onClick={handleDelete}

    >


      <Trash2

        className="
        h-4
        w-4
        text-red-500
        "

      />


    </Button>



  );



}