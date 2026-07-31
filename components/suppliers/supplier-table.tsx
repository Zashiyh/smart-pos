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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 dark:text-slate-500" />
          <Input
            placeholder="Search supplier..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              pl-9
              rounded-xl
              border-2
              border-blue-200
              dark:border-blue-900/30
              bg-white
              dark:bg-slate-800
              text-blue-900
              dark:text-white
              placeholder:text-blue-400/50
              dark:placeholder:text-slate-500
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              transition-all
              duration-300
              h-12
            "
          />
        </div>

        <Button
          variant="outline"
          onClick={refreshSuppliers}
          disabled={loading}
          className="
            rounded-xl
            border-2
            border-blue-200
            dark:border-blue-900/30
            bg-white
            dark:bg-slate-800
            text-blue-700
            dark:text-slate-300
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            transition-all
            duration-300
            h-12
            px-6
          "
        >
          <RefreshCw
            className={`
              mr-2
              h-4
              w-4
              ${loading ? "animate-spin" : ""}
              text-blue-500
              dark:text-blue-400
            `}
          />
          Refresh
        </Button>
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border-0
          shadow-sm
          bg-white
          dark:bg-slate-800/90
          backdrop-blur-sm
          transition-colors
          duration-300
        "
      >
        <table className="w-full">
          <thead className="border-b border-blue-100/50 dark:border-blue-900/30 bg-blue-50/30 dark:bg-slate-700/20">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Supplier
              </th>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Company
              </th>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Phone
              </th>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Email
              </th>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Status
              </th>
              <th className="p-4 text-right text-sm font-semibold text-blue-700 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    p-8
                    text-center
                    text-blue-500/60
                    dark:text-slate-500
                  "
                >
                  No suppliers found
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier._id}
                  className="
                    border-b
                    border-blue-100/50
                    dark:border-blue-900/30
                    hover:bg-blue-50/50
                    dark:hover:bg-slate-700/30
                    transition-colors
                    duration-200
                  "
                >
                  <td className="p-4 font-medium text-blue-900 dark:text-white">
                    {supplier.name}
                  </td>

                  <td className="p-4 text-blue-700 dark:text-slate-300">
                    {supplier.company}
                  </td>

                  <td className="p-4 text-blue-700 dark:text-slate-300">
                    {supplier.phone}
                  </td>

                  <td className="p-4 text-blue-700 dark:text-slate-300">
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
                        transition-colors
                        duration-300
                        ${
                          supplier.status === "Active"
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
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
                        onClick={() =>
                          deleteSupplier(
                            supplier._id
                          )
                        }
                        className="
                          rounded-xl
                          bg-red-500
                          hover:bg-red-600
                          dark:bg-red-600
                          dark:hover:bg-red-700
                          transition-all
                          duration-300
                          hover:shadow-lg
                          hover:shadow-red-500/30
                          dark:hover:shadow-red-600/20
                        "
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}