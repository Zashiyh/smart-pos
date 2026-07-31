"use client";

import { useMemo, useState } from "react";

import {
  Trash2,
  RefreshCw,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import EditSupplierDialog from "./edit-supplier-dialog";

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

interface SupplierTableProps {

  suppliers: Supplier[];

}

export default function SupplierTable({

  suppliers,

}: SupplierTableProps) {

  const [supplierList, setSupplierList] =
    useState<Supplier[]>(suppliers);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);





  const filteredSuppliers = useMemo(() => {

    return supplierList.filter((supplier) => {

      const keyword =
        search.toLowerCase();

      return (

        supplier.name
          .toLowerCase()
          .includes(keyword)

        ||

        supplier.company
          .toLowerCase()
          .includes(keyword)

        ||

        supplier.phone
          .toLowerCase()
          .includes(keyword)

        ||

        supplier.email
          .toLowerCase()
          .includes(keyword)

      );

    });

  }, [

    supplierList,

    search,

  ]);









  async function refreshSuppliers() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/suppliers",
          {
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (data.success) {

        setSupplierList(
          data.suppliers
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }









  async function deleteSupplier(

    id: string

  ) {

    const confirmDelete =
      confirm(
        "Delete this supplier?"
      );

    if (!confirmDelete)
      return;

    try {

      const response =
        await fetch(

          `/api/suppliers/${id}`,

          {
            method: "DELETE",
          }

        );

      const data =
        await response.json();

      if (data.success) {

        setSupplierList((prev) =>

          prev.filter(

            (supplier) =>

              supplier._id !== id

          )

        );

      }

    } catch (error) {

      console.log(error);

    }

  }








  return (

    <div className="space-y-5">




      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">




        <div className="relative w-full md:max-w-sm">

          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input

            placeholder="Search supplier..."

            value={search}

            onChange={(e)=>

              setSearch(
                e.target.value
              )

            }

            className="pl-9"

          />

        </div>





        <Button

          variant="outline"

          onClick={refreshSuppliers}

          disabled={loading}

        >

          <RefreshCw

            className={`

            mr-2

            h-4

            w-4

            ${

              loading

                ?

                "animate-spin"

                :

                ""

            }

            `}

          />

          Refresh

        </Button>

      </div>









      <div className="overflow-hidden rounded-2xl border bg-background">




        <table className="w-full">




          <thead className="border-b bg-muted/40">

            <tr>

              <th className="p-4 text-left">
                Supplier
              </th>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-right">
                Actions
              </th>

            </tr>

          </thead>









          <tbody>

            {

              filteredSuppliers.length === 0

              ?

              (

                <tr>

                  <td

                    colSpan={6}

                    className="p-8 text-center text-muted-foreground"

                  >

                    No suppliers found

                  </td>

                </tr>

              )

              :

              filteredSuppliers.map((supplier)=>(

                <tr

                  key={supplier._id}

                  className="border-b hover:bg-muted/30"

                >




                  <td className="p-4 font-medium">

                    {supplier.name}

                  </td>





                  <td className="p-4">

                    {supplier.company}

                  </td>





                  <td className="p-4">

                    {supplier.phone}

                  </td>





                  <td className="p-4">

                    {supplier.email}

                  </td>





                  <td className="p-4">

                    <span

                      className={`

                      rounded-full

                      px-3

                      py-1

                      text-xs

                      font-medium

                      ${

                        supplier.status === "Active"

                        ?

                        "bg-green-500/10 text-green-600"

                        :

                        "bg-red-500/10 text-red-600"

                      }

                      `}

                    >

                      {supplier.status}

                    </span>

                  </td>








                  <td className="p-4">

                    <div className="flex justify-end gap-2">




                      <EditSupplierDialog

                        supplier={supplier}

                      />






                      <Button

                        variant="destructive"

                        size="icon"

                        onClick={()=>

                          deleteSupplier(

                            supplier._id

                          )

                        }

                      >

                        <Trash2 className="h-4 w-4" />

                      </Button>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}