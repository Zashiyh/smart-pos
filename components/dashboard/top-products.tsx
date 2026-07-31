"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Trophy,
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
  sold: number;
  revenue: number;
}

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTopProducts() {
      try {
        const response = await fetch(
          "/api/dashboard/top-products",
          {
            cache: "no-store"
          }
        );

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(
          "Top products error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    getTopProducts();
  }, []);

  const maxSold = products[0]?.sold || 1;

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
      <CardHeader className="border-b border-blue-100/50 dark:border-blue-900/30 pb-4">
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
              bg-yellow-100
              dark:bg-yellow-900/30
              transition-colors
              duration-300
            "
          >
            <Trophy
              className="
                h-5
                w-5
                text-yellow-600
                dark:text-yellow-400
              "
            />
          </div>

          <div>
            <CardTitle
              className="
                text-lg
                font-semibold
                text-blue-900
                dark:text-white
              "
            >
              Top Selling Products
            </CardTitle>
            <p
              className="
                text-sm
                text-blue-600/70
                dark:text-slate-400
              "
            >
              Best performing products
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-blue-500/60 dark:text-slate-500">
                <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                Loading products...
              </div>
            </div>
          ) : products.length === 0 ? (
            <div
              className="
                text-center
                py-8
                text-blue-500/60
                dark:text-slate-500
              "
            >
              No sales data available
            </div>
          ) : (
            products.map((product, index) => (
              <div
                key={product._id}
                className="
                  rounded-xl
                  border-2
                  p-4
                  transition-all
                  duration-300
                  hover:shadow-md
                  border-blue-100/50
                  dark:border-blue-900/30
                  hover:bg-blue-50/50
                  dark:hover:bg-slate-700/30
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    {/* Rank */}
                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        text-sm
                        font-bold
                        transition-colors
                        duration-300
                        ${
                          index === 0
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            : index === 1
                            ? "bg-gray-200 dark:bg-gray-700/30 text-gray-700 dark:text-gray-400"
                            : index === 2
                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        }
                      `}
                    >
                      {index + 1}
                    </div>

                    {/* Product */}
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
                          bg-blue-100
                          dark:bg-blue-900/30
                          transition-colors
                          duration-300
                        "
                      >
                        <Package
                          className="
                            h-5
                            w-5
                            text-blue-600
                            dark:text-blue-400
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
                          {product._id}
                        </p>
                        <p
                          className="
                            text-sm
                            text-blue-600/70
                            dark:text-slate-400
                          "
                        >
                          {product.sold} sold
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="text-right">
                    <p
                      className="
                        font-bold
                        text-blue-900
                        dark:text-white
                      "
                    >
                      LKR {product.revenue.toLocaleString("en-LK")}
                    </p>
                    <p
                      className="
                        text-xs
                        text-blue-500/60
                        dark:text-slate-500
                      "
                    >
                      Revenue
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className="
                    mt-4
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-blue-100/50
                    dark:bg-slate-700
                  "
                >
                  <div
                    className={`
                      h-full
                      rounded-full
                      transition-all
                      duration-700
                      ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-400"
                          : index === 1
                          ? "bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-400"
                          : index === 2
                          ? "bg-gradient-to-r from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-400"
                          : "bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-400"
                      }
                    `}
                    style={{
                      width: `${(product.sold / maxSold) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}