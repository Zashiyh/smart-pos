"use client";

import { useState } from "react";

import {
  Pencil,
  Package,
  Barcode,
  Hash,
  Tag,
  Building2,
  Truck,
  DollarSign,
  ShoppingBag,
  Boxes,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

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
  minStock?: number;
  unit?: string;
  expiryDate?: string;
  image?: string;
}

export default function EditProductDialog({
  product
}: {
  product: Product
}) {
  const [name, setName] = useState(product.name);
  const [barcode, setBarcode] = useState(product.barcode);
  const [sku, setSku] = useState(product.sku);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);
  const [supplier, setSupplier] = useState(product.supplier);
  const [costPrice, setCostPrice] = useState(
    product.costPrice.toString()
  );
  const [sellingPrice, setSellingPrice] = useState(
    product.sellingPrice.toString()
  );
  const [stock, setStock] = useState(
    product.stock.toString()
  );

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function updateProduct() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/products/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            barcode,
            sku,
            category,
            brand,
            supplier,
            costPrice: Number(costPrice),
            sellingPrice: Number(sellingPrice),
            stock: Number(stock)
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Product updated successfully");
        setOpen(false);
        window.location.reload();
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.log("UPDATE PRODUCT ERROR:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          size="icon"
          className="
            rounded-xl
            border-2
            border-blue-200
            dark:border-blue-900/30
            bg-white
            dark:bg-slate-800
            text-blue-600
            dark:text-blue-400
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            hover:text-blue-700
            dark:hover:text-blue-300
            transition-all
            duration-300
            hover:shadow-md
          "
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          max-w-2xl
          rounded-2xl
          border-0
          shadow-2xl
          bg-white
          dark:bg-slate-800/95
          backdrop-blur-sm
          transition-colors
          duration-300
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-2xl
              font-bold
              text-blue-900
              dark:text-white
            "
          >
            Edit Product
          </DialogTitle>
          <p
            className="
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Update product information
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Product Name */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Package
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* Barcode */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Barcode
              </label>
              <div className="relative">
                <Barcode
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  placeholder="Barcode"
                  value={barcode}
                  onChange={(e) =>
                    setBarcode(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* SKU */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                SKU
              </label>
              <div className="relative">
                <Hash
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  placeholder="SKU"
                  value={sku}
                  onChange={(e) =>
                    setSku(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Tag
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  placeholder="Category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Brand
              </label>
              <div className="relative">
                <Building2
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) =>
                    setBrand(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* Supplier */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Supplier
              </label>
              <div className="relative">
                <Truck
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  placeholder="Supplier"
                  value={supplier}
                  onChange={(e) =>
                    setSupplier(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* Cost Price */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Cost Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  type="number"
                  placeholder="Cost Price"
                  value={costPrice}
                  onChange={(e) =>
                    setCostPrice(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* Selling Price */}
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Selling Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <ShoppingBag
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  type="number"
                  placeholder="Selling Price"
                  value={sellingPrice}
                  onChange={(e) =>
                    setSellingPrice(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-1.5 md:col-span-2">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Boxes
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-blue-400
                    dark:text-slate-500
                  "
                />
                <Input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
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
                    pl-10
                  "
                />
              </div>
            </div>
          </div>

          <Button
            className="
              w-full
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
            onClick={updateProduct}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Updating...
              </div>
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}