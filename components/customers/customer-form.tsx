"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CustomerForm() {

  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({

    name: "",
    phone: "",
    email: "",
    address: "",
    customerType: "Regular",
    creditLimit: 0,

  });



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ){

    const { name, value } = e.target;


    setFormData({

      ...formData,

      [name]:
        name === "creditLimit"
          ? Number(value)
          : value,

    });

  }




  async function handleSubmit(
    e: React.FormEvent
  ){

    e.preventDefault();


    try{


      setLoading(true);



      const res = await fetch(
        "/api/customers",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify(formData),

        }
      );



      const data = await res.json();



      if(data.success){


        toast.success(
          "Customer added successfully"
        );


        setFormData({

          name:"",
          phone:"",
          email:"",
          address:"",
          customerType:"Regular",
          creditLimit:0,

        });


      }else{


        toast.error(
          data.message || "Something went wrong"
        );


      }



    }catch(error){


      toast.error(
        "Failed to add customer"
      );


    }finally{


      setLoading(false);


    }


  }





  return (

    <form
      onSubmit={handleSubmit}
      className="
        grid
        gap-4
        md:grid-cols-2
      "
    >



      <input

        name="name"

        value={formData.name}

        onChange={handleChange}

        placeholder="Customer Name"

        required

        className="
          h-11
          rounded-xl
          border
          px-4
          bg-white
          dark:bg-slate-900
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "

      />





      <input

        name="phone"

        value={formData.phone}

        onChange={handleChange}

        placeholder="Phone Number"

        required

        className="
          h-11
          rounded-xl
          border
          px-4
          bg-white
          dark:bg-slate-900
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "

      />





      <input

        name="email"

        value={formData.email}

        onChange={handleChange}

        placeholder="Email Address"

        type="email"

        className="
          h-11
          rounded-xl
          border
          px-4
          bg-white
          dark:bg-slate-900
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "

      />





      <input

        name="address"

        value={formData.address}

        onChange={handleChange}

        placeholder="Address"

        className="
          h-11
          rounded-xl
          border
          px-4
          bg-white
          dark:bg-slate-900
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "

      />





      <select

        name="customerType"

        value={formData.customerType}

        onChange={handleChange}

        className="
          h-11
          rounded-xl
          border
          px-4
          bg-white
          dark:bg-slate-900
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "

      >

        <option value="Regular">
          Regular
        </option>

        <option value="VIP">
          VIP
        </option>

        <option value="Wholesale">
          Wholesale
        </option>


      </select>





      <input

        name="creditLimit"

        value={formData.creditLimit}

        onChange={handleChange}

        placeholder="Credit Limit"

        type="number"


        className="
          h-11
          rounded-xl
          border
          px-4
          bg-white
          dark:bg-slate-900
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "

      />





      <button

        disabled={loading}

        className="
          md:col-span-2
          h-11
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          font-semibold
          hover:shadow-lg
          transition-all
          disabled:opacity-50
        "

      >

        {
          loading
          ? "Adding..."
          : "Add Customer"
        }


      </button>



    </form>

  );

}