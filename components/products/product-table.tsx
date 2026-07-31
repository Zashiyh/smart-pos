"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import EditProductDialog from "./edit-product-dialog";
import DeleteProductButton from "./delete-dialog";

interface Product {
  _id: string;
  name: string;
  barcode: string;
  sku: string;
  category: string;
  brand: string;
  supplier: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
}

interface ProductTableProps {
  products: Product[];
}

const categories = [
  "All",
  "Grocery",
  "Beverages",
  "Dairy",
  "Bakery",
  "Frozen Foods",
  "Household",
  "Personal Care",
  "Electronics",
  "Pharmacy",
];

export default function ProductTable({
  products
}: ProductTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch = category === "All" ||
      product.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <Card className="rounded-2xl border-blue-100/50 dark:border-blue-900/30 bg-white dark:bg-slate-800/90 backdrop-blur-sm transition-colors duration-300 shadow-sm hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-10
              rounded-xl
              border
              px-4
              outline-none
              flex-1
              transition-colors
              duration-300
              bg-white
              dark:bg-slate-800
              border-blue-200
              dark:border-blue-900/30
              text-blue-900
              dark:text-white
              placeholder:text-blue-400/50
              dark:placeholder:text-slate-500
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              h-10
              rounded-xl
              border
              px-4
              transition-colors
              duration-300
              bg-white
              dark:bg-slate-800
              border-blue-200
              dark:border-blue-900/30
              text-blue-900
              dark:text-white
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              outline-none
              cursor-pointer
            "
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-100/50 dark:border-blue-900/30">
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Product
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Category
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Brand
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Stock
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Price
                </TableHead>
                <TableHead className="text-right text-blue-700 dark:text-slate-300 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-blue-500/60 dark:text-slate-500 py-8"
                  >
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow
                    key={product._id}
                    className="border-blue-100/50 dark:border-blue-900/30 hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-blue-900 dark:text-white">
                      {product.name}
                    </TableCell>

                    <TableCell className="text-blue-700 dark:text-slate-300">
                      {product.category}
                    </TableCell>

                    <TableCell className="text-blue-700 dark:text-slate-300">
                      {product.brand}
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
                            product.stock <= 10
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          }
                        `}
                      >
                        {product.stock}
                      </span>
                    </TableCell>

                    <TableCell className="text-blue-700 dark:text-slate-300 font-medium">
                      LKR {product.sellingPrice.toLocaleString("en-LK")}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <EditProductDialog product={product} />
                        <DeleteProductButton id={product._id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}