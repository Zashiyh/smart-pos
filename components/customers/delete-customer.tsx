"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface DeleteCustomerProps {
  id: string;
  onDeleted?: () => void;
}


export default function DeleteCustomer({
  id,
  onDeleted,
}: DeleteCustomerProps) {


  const [loading, setLoading] = useState(false);



  async function handleDelete() {


    const confirmDelete = confirm(
      "Are you sure you want to delete this customer?"
    );


    if(!confirmDelete) return;



    try {


      setLoading(true);



      const res = await fetch(
        `/api/customers/${id}`,
        {
          method:"DELETE",
        }
      );



      const data = await res.json();



      if(data.success){


        toast.success(
          "Customer deleted successfully"
        );


        onDeleted?.();



      }else{


        toast.error(
          data.message || "Delete failed"
        );


      }



    }catch(error){


      console.log(
        "DELETE CUSTOMER ERROR:",
        error
      );


      toast.error(
        "Something went wrong"
      );


    }finally{


      setLoading(false);


    }


  }




  return (

    <button

      onClick={handleDelete}

      disabled={loading}

      className="
        flex
        items-center
        justify-center
        h-9
        w-9
        rounded-lg
        bg-red-100
        dark:bg-red-900/30
        text-red-600
        dark:text-red-400
        hover:bg-red-200
        dark:hover:bg-red-900/50
        transition
        disabled:opacity-50
      "

      title="Delete Customer"

    >

      <Trash2
        className="
          w-4
          h-4
        "
      />

    </button>

  );

}