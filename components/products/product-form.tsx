"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ===============================
  // FORM STATE
  // ===============================

  const [form, setForm] = useState({
    name: "",
    barcode: "",
    sku: "",
    category: "",
    brand: "",
    supplier: "",
    costPrice: "",
    sellingPrice: "",
    stock: "",
    minStock: "",
    unit: "pcs",
    expiryDate: "",
    image: "",
  });

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // ===============================
  // VALIDATION
  // ===============================

  function validateForm() {
    if (!form.name.trim()) {
      return "Product name is required";
    }

    if (!form.category) {
      return "Please select a category";
    }

    if (Number(form.costPrice) < 0) {
      return "Cost price cannot be negative";
    }

    if (Number(form.sellingPrice) < 0) {
      return "Selling price cannot be negative";
    }

    if (Number(form.stock) < 0) {
      return "Stock cannot be negative";
    }

    if (Number(form.minStock) < 0) {
      return "Minimum stock cannot be negative";
    }

    if (
      Number(form.sellingPrice) <
      Number(form.costPrice)
    ) {
      return "Selling price cannot be lower than cost price";
    }

    return "";
  }

  // ===============================
  // SUBMIT PRODUCT
  // ===============================

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            costPrice: Number(form.costPrice),
            sellingPrice: Number(form.sellingPrice),
            stock: Number(form.stock),
            minStock: Number(form.minStock),
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "Product adding failed"
        );
      }

      setMessage(
        "Product added successfully!"
      );

      setTimeout(() => {
        router.push(
          "/dashboard/products"
        );
        router.refresh();
      }, 1000);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      className="
        rounded-3xl
        border-0
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        bg-white
        dark:bg-slate-800/90
        backdrop-blur-sm
      "
    >
      <CardHeader className="border-b border-blue-100/50 dark:border-blue-900/30 pb-4">
        <CardTitle
          className="
            text-2xl
            font-bold
            text-blue-900
            dark:text-white
          "
        >
          Add New Product
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit}
          className="
            grid
            gap-5
          "
        >
          <div className="space-y-1">
            <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
              Product Name <span className="text-red-500">*</span>
            </label>
            <Input
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              required
              className="
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
                px-4
              "
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Barcode
              </label>
              <Input
                name="barcode"
                placeholder="Enter barcode"
                value={form.barcode}
                onChange={handleChange}
                className="
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
                  px-4
                "
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                SKU Code
              </label>
              <Input
                name="sku"
                placeholder="Enter SKU code"
                value={form.sku}
                onChange={handleChange}
                className="
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
                  px-4
                "
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                text-blue-900
                dark:text-white
                px-4
                py-3
                w-full
                outline-none
                cursor-pointer
                transition-all
                duration-300
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                h-12
              "
            >
              <option value="">Select Category</option>
              <option value="Grocery">Grocery</option>
              <option value="Beverages">Beverages</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Frozen Foods">Frozen Foods</option>
              <option value="Household">Household</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Electronics">Electronics</option>
              <option value="Pharmacy">Pharmacy</option>
            </select>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Brand
              </label>
              <Input
                name="brand"
                placeholder="Enter brand name"
                value={form.brand}
                onChange={handleChange}
                className="
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
                  px-4
                "
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Supplier
              </label>
              <Input
                name="supplier"
                placeholder="Enter supplier name"
                value={form.supplier}
                onChange={handleChange}
                className="
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
                  px-4
                "
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Cost Price <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                name="costPrice"
                placeholder="Enter cost price"
                value={form.costPrice}
                onChange={handleChange}
                required
                className="
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
                  px-4
                "
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Selling Price <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                name="sellingPrice"
                placeholder="Enter selling price"
                value={form.sellingPrice}
                onChange={handleChange}
                required
                className="
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
                  px-4
                "
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                name="stock"
                placeholder="Enter stock quantity"
                value={form.stock}
                onChange={handleChange}
                required
                className="
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
                  px-4
                "
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Minimum Stock
              </label>
              <Input
                type="number"
                name="minStock"
                placeholder="Enter minimum stock"
                value={form.minStock}
                onChange={handleChange}
                className="
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
                  px-4
                "
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
              Unit
            </label>
            <Input
              name="unit"
              placeholder="Unit (pcs, kg, bottle)"
              value={form.unit}
              onChange={handleChange}
              className="
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
                px-4
              "
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Expiry Date
              </label>
              <Input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                className="
                  rounded-xl
                  border-2
                  border-blue-200
                  dark:border-blue-900/30
                  bg-white
                  dark:bg-slate-800
                  text-blue-900
                  dark:text-white
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all
                  duration-300
                  h-12
                  px-4
                "
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-blue-700 dark:text-slate-300">
                Image URL
              </label>
              <Input
                name="image"
                placeholder="Enter image URL"
                value={form.image}
                onChange={handleChange}
                className="
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
                  px-4
                "
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              dark:from-blue-600
              dark:to-blue-700
              text-white
              hover:shadow-lg
              hover:shadow-blue-500/30
              dark:hover:shadow-blue-600/20
              transition-all
              duration-300
              font-semibold
              h-12
              text-base
              mt-2
            "
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              "Save Product"
            )}
          </Button>

          {message && (
            <p
              className={`
                text-center
                text-sm
                font-medium
                py-2
                px-4
                rounded-xl
                ${
                  message.includes("success")
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                }
                transition-colors
                duration-300
              `}
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}