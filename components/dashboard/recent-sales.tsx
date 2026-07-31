"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CreditCard,
  Banknote,
} from "lucide-react";

interface Sale {
  _id: string;
  invoiceNumber: string;
  customerName?: string;
  totalAmount?: number;
  paymentMethod: string;
  status: string;
}

export default function RecentSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSales() {
      try {
        const res = await fetch(
          "/api/sales",
          {
            cache: "no-store"
          }
        );

        const data = await res.json();

        if (data.success) {
          setSales(
            data.sales.slice(0, 5)
          );
        }
      } catch (error) {
        console.log(
          "Recent sales error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    getSales();
  }, []);

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
        <CardTitle
          className="
            text-xl
            font-semibold
            text-blue-900
            dark:text-white
          "
        >
          Recent Sales
        </CardTitle>
        <p
          className="
            text-sm
            text-blue-600/70
            dark:text-slate-400
          "
        >
          Latest customer transactions
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-100/50 dark:border-blue-900/30">
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Invoice
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Customer
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Amount
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Payment
                </TableHead>
                <TableHead className="text-blue-700 dark:text-slate-300 font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-blue-500/60 dark:text-slate-500 py-8"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                      Loading sales...
                    </div>
                  </TableCell>
                </TableRow>
              ) : sales.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-blue-500/60 dark:text-slate-500 py-8"
                  >
                    No sales found
                  </TableCell>
                </TableRow>
              ) : (
                sales.map((sale) => (
                  <TableRow
                    key={sale._id}
                    className="
                      border-blue-100/50
                      dark:border-blue-900/30
                      hover:bg-blue-50/50
                      dark:hover:bg-slate-700/30
                      transition-colors
                      duration-200
                    "
                  >
                    <TableCell
                      className="
                        font-medium
                        text-blue-900
                        dark:text-white
                      "
                    >
                      {sale.invoiceNumber}
                    </TableCell>

                    <TableCell>
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
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            dark:bg-blue-900/30
                            text-blue-700
                            dark:text-blue-400
                            font-semibold
                            transition-colors
                            duration-300
                          "
                        >
                          {(
                            sale.customerName ||
                            "Walk-in Customer"
                          ).charAt(0)}
                        </div>

                        <span
                          className="
                            text-blue-700
                            dark:text-slate-300
                          "
                        >
                          {sale.customerName ||
                            "Walk-in Customer"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell
                      className="
                        font-semibold
                        text-blue-900
                        dark:text-white
                      "
                    >
                      LKR {(
                        sale.totalAmount || 0
                      ).toLocaleString("en-LK")}
                    </TableCell>

                    <TableCell>
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-blue-700
                          dark:text-slate-300
                        "
                      >
                        {sale.paymentMethod === "Card" ? (
                          <CreditCard
                            className="
                              h-4
                              w-4
                              text-blue-500
                              dark:text-blue-400
                            "
                          />
                        ) : (
                          <Banknote
                            className="
                              h-4
                              w-4
                              text-emerald-500
                              dark:text-emerald-400
                            "
                          />
                        )}
                        {sale.paymentMethod}
                      </div>
                    </TableCell>

                    <TableCell>
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
                            sale.status === "Completed"
                              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          }
                        `}
                      >
                        {sale.status}
                      </span>
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