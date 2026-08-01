"use client";

import {
  AlertTriangle,
  Package,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  _id: string;
  name: string;
  stock: number;
  minStock?: number;
}

interface LowStockProps {
  products: Product[];
}

export default function LowStock({
  products,
}: LowStockProps) {
  const lowStockProducts = products.filter(
    (product) =>
      product.stock <= (product.minStock ?? 10)
  );

  console.log(
    "LOW STOCK PRODUCTS:",
    lowStockProducts
  );

  return (
    <Card
      className="
        rounded-2xl
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
      <CardHeader
        className="
          border-b
          border-blue-100/50
          dark:border-blue-900/30
          pb-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-red-100
              dark:bg-red-900/30
              transition-colors
              duration-300
            "
          >
            <AlertTriangle
              className="
                h-5
                w-5
                text-red-600
                dark:text-red-400
              "
            />
          </div>

          <div>
            <CardTitle
              className="
                text-blue-900
                dark:text-white
                text-lg
                font-semibold
              "
            >
              Low Stock Alert
            </CardTitle>
            <p
              className="
                text-sm
                text-blue-600/70
                dark:text-slate-400
              "
            >
              Products need restocking
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {lowStockProducts.length === 0 ? (
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border-2
              border-emerald-200
              dark:border-emerald-900/30
              p-4
              bg-emerald-50/50
              dark:bg-emerald-900/10
              transition-colors
              duration-300
            "
          >
            <Package
              className="
                h-5
                w-5
                text-emerald-600
                dark:text-emerald-400
              "
            />
            <p
              className="
                text-sm
                text-emerald-700
                dark:text-emerald-400
                font-medium
              "
            >
              All products have enough stock 🎉
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product._id}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border-2
                  border-red-200
                  dark:border-red-900/30
                  p-4
                  bg-red-50/30
                  dark:bg-red-900/10
                  transition-colors
                  duration-300
                  hover:bg-red-100/50
                  dark:hover:bg-red-900/20
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-red-100
                      dark:bg-red-900/30
                      transition-colors
                      duration-300
                    "
                  >
                    <Package
                      className="
                        h-5
                        w-5
                        text-red-600
                        dark:text-red-400
                      "
                    />
                  </div>

                  <div>
                    <p
                      className="
                        font-medium
                        text-blue-900
                        dark:text-white
                      "
                    >
                      {product.name}
                    </p>
                    <p
                      className="
                        text-sm
                        text-blue-500/60
                        dark:text-slate-400
                      "
                    >
                      Minimum Stock: {product.minStock ?? 10}
                    </p>
                  </div>
                </div>

                <span
                  className="
                    rounded-full
                    bg-red-100
                    dark:bg-red-900/30
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-red-700
                    dark:text-red-400
                    transition-colors
                    duration-300
                  "
                >
                  {product.stock} left
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}