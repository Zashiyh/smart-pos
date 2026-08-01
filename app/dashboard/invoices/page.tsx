import Link from "next/link";

import {
  Eye,
  RefreshCw,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Sale {
  _id: string;
  invoiceNumber: string;
  customerName: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000";

// ===============================
// GET SALES
// ===============================

async function getSales(): Promise<Sale[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/sales`,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch sales"
      );
    }

    const data = await response.json();

    if (!data.success) {
      return [];
    }

    return data.sales ?? [];
  } catch (error) {
    console.log(
      "Sales fetch error:",
      error
    );
    return [];
  }
}

// ===============================
// PAGE
// ===============================

export default async function InvoicesPage() {
  const sales = await getSales();

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-50/50
        via-white
        to-blue-100/30
        dark:from-slate-900
        dark:via-slate-800
        dark:to-blue-950/50
        p-6
        space-y-8
        transition-colors
        duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="
              text-4xl
              font-bold
              bg-gradient-to-r
              from-blue-600
              to-blue-800
              dark:from-white
              dark:to-blue-200
              bg-clip-text
              text-transparent
            "
          >
            Sales History
          </h1>
          <p
            className="
              text-blue-600/70
              dark:text-slate-400
              mt-1
              flex
              items-center
              gap-2
            "
          >
            📊 Manage invoices and completed sales
          </p>
        </div>

        {/* Refresh Button */}
        <form action="/dashboard/invoices" method="GET">
          <button
            type="submit"
            className="
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              dark:from-blue-600
              dark:to-blue-700
              text-white
              px-4
              py-2.5
              text-sm
              font-medium
              hover:shadow-lg
              hover:shadow-blue-500/30
              dark:hover:shadow-blue-600/20
              transition-all
              duration-300
              flex
              items-center
              gap-2
            "
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </form>
      </div>

      {/* Sales Table */}
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
              flex
              items-center
              gap-2
            "
          >
            <span>📄</span>
            All Invoices ({sales.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-100/50 dark:border-blue-900/30 text-left">
                  <th className="p-3 text-blue-700 dark:text-slate-300 font-semibold">
                    Invoice
                  </th>
                  <th className="p-3 text-blue-700 dark:text-slate-300 font-semibold">
                    Customer
                  </th>
                  <th className="p-3 text-blue-700 dark:text-slate-300 font-semibold">
                    Amount
                  </th>
                  <th className="p-3 text-blue-700 dark:text-slate-300 font-semibold">
                    Payment
                  </th>
                  <th className="p-3 text-blue-700 dark:text-slate-300 font-semibold">
                    Status
                  </th>
                  <th className="p-3 text-blue-700 dark:text-slate-300 font-semibold">
                    Date
                  </th>
                  <th className="p-3 text-blue-700 dark:text-slate-300 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="
                        p-6
                        text-center
                        text-blue-500/60
                        dark:text-slate-500
                      "
                    >
                      No sales found.
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr
                      key={sale._id}
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
                      <td className="p-3 font-medium text-blue-900 dark:text-white">
                        {sale.invoiceNumber}
                      </td>

                      <td className="p-3 text-blue-700 dark:text-slate-300">
                        {sale.customerName}
                      </td>

                      <td className="p-3 font-semibold text-blue-900 dark:text-white">
                        LKR {sale.totalAmount.toLocaleString()}
                      </td>

                      <td className="p-3 text-blue-700 dark:text-slate-300">
                        {sale.paymentMethod}
                      </td>

                      <td className="p-3">
                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${
                              sale.status === "Completed"
                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            }
                          `}
                        >
                          {sale.status}
                        </span>
                      </td>

                      <td className="p-3 text-blue-600/70 dark:text-slate-400">
                        {new Date(
                          sale.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <Link
                          href={`/dashboard/invoices/${sale._id}`}
                        >
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
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}