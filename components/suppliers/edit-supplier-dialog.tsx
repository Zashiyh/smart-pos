"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

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

interface Supplier {

  _id: string;

  name: string;

  company: string;

  phone: string;

  email: string;

  address: string;

  city: string;

  paymentTerms: string;

  status: string;

}

interface EditSupplierDialogProps {

  supplier: Supplier;

}

export default function EditSupplierDialog({

  supplier,

}: EditSupplierDialogProps) {

  const [name, setName] =
    useState(supplier.name);

  const [company, setCompany] =
    useState(supplier.company);

  const [phone, setPhone] =
    useState(supplier.phone);

  const [email, setEmail] =
    useState(supplier.email);

  const [address, setAddress] =
    useState(supplier.address);

  const [city, setCity] =
    useState(supplier.city);

  const [paymentTerms, setPaymentTerms] =
    useState(supplier.paymentTerms);

  const [status, setStatus] =
    useState(supplier.status);

  const [loading, setLoading] =
    useState(false);




  async function updateSupplier() {

    try {

      setLoading(true);

      const response =
        await fetch(

          `/api/suppliers/${supplier._id}`,

          {

            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({

              name,

              company,

              phone,

              email,

              address,

              city,

              paymentTerms,

              status,

            }),

          }

        );

      const data =
        await response.json();

      if (data.success) {

        alert("Supplier Updated");

        window.location.reload();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  }






  return (

    <Dialog>

      <DialogTrigger>

        <Button

          variant="outline"

          size="icon"

          type="button"

        >

          <Pencil className="h-4 w-4" />

        </Button>

      </DialogTrigger>






      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>

            Edit Supplier

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

            placeholder="Phone"

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







        <select

          value={status}

          onChange={(e)=>

            setStatus(e.target.value)

          }

          className="mt-4 w-full rounded-lg border bg-background p-2"

        >

          <option value="Active">

            Active

          </option>

          <option value="Inactive">

            Inactive

          </option>

        </select>








        <Button

          className="mt-4 w-full"

          onClick={updateSupplier}

          disabled={loading}

        >

          {

            loading

              ?

              "Updating..."

              :

              "Update Supplier"

          }

        </Button>

      </DialogContent>

    </Dialog>

  );

}