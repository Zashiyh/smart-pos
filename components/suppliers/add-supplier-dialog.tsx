"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";



export default function AddSupplierDialog() {


  const router = useRouter();


  const [open, setOpen] =
    useState(false);



  const [name, setName] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [paymentTerms, setPaymentTerms] =
    useState("");

  const [loading, setLoading] =
    useState(false);





  async function createSupplier() {


    try {


      setLoading(true);



      const response =
        await fetch(
          "/api/suppliers",
          {

            method:"POST",

            headers:{
              "Content-Type":"application/json",
            },


            body:JSON.stringify({

              name,

              company,

              phone,

              email,

              address,

              city,

              paymentTerms,

              status:"Active",

            }),


          }
        );





      const data =
        await response.json();





      if(data.success){


        alert(
          "Supplier Added Successfully"
        );



        setName("");

        setCompany("");

        setPhone("");

        setEmail("");

        setAddress("");

        setCity("");

        setPaymentTerms("");



        setOpen(false);



        router.refresh();



      }else{


        alert(data.message);


      }





    }catch(error){


      console.log(
        "Add supplier error:",
        error
      );


      alert(
        "Something went wrong"
      );



    }finally{


      setLoading(false);


    }


  }








  return (


    <Dialog

      open={open}

      onOpenChange={setOpen}

    >



      <DialogTrigger>


        <Button>

          Add Supplier

        </Button>


      </DialogTrigger>








      <DialogContent className="max-w-2xl">



        <DialogHeader>


          <DialogTitle>

            Add Supplier

          </DialogTitle>


        </DialogHeader>








        <div className="grid gap-4 md:grid-cols-2">



          <Input

            placeholder="Supplier Name"

            value={name}

            onChange={(e)=>

              setName(e.target.value)

            }

          />





          <Input

            placeholder="Company"

            value={company}

            onChange={(e)=>

              setCompany(e.target.value)

            }

          />





          <Input

            placeholder="Phone Number"

            value={phone}

            onChange={(e)=>

              setPhone(e.target.value)

            }

          />





          <Input

            placeholder="Email"

            value={email}

            onChange={(e)=>

              setEmail(e.target.value)

            }

          />





          <Input

            placeholder="City"

            value={city}

            onChange={(e)=>

              setCity(e.target.value)

            }

          />





          <Input

            placeholder="Payment Terms"

            value={paymentTerms}

            onChange={(e)=>

              setPaymentTerms(e.target.value)

            }

          />



        </div>







        <Textarea

          className="mt-4"

          placeholder="Address"

          value={address}

          onChange={(e)=>

            setAddress(e.target.value)

          }

        />









        <Button

          className="mt-4 w-full"

          onClick={createSupplier}

          disabled={loading}

        >


          {

            loading

            ?

            "Saving..."

            :

            "Save Supplier"


          }


        </Button>







      </DialogContent>




    </Dialog>


  );


}