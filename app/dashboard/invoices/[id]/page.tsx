import Link from "next/link";

import PdfButton from "@/components/invoice/pdf-button";
import PrintButton from "@/components/invoice/print-button";

import {
  ArrowLeft,
  Download,
  Printer,
  FileText,
  Calendar,
  User,
  CreditCard,
  CheckCircle,
  Clock,
} from "lucide-react";

import {
  Button
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000";

// ===============================
// GET INVOICE
// ===============================

async function getInvoice(id: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/sales/${id}`,
      {
        cache: "no-store"
      }
    );

    const data = await res.json();

    if (!data.success) {
      return null;
    }

    return data.sale;
  } catch (error) {
    console.log(
      "Invoice error:",
      error
    );
    return null;
  }
}

// ===============================
// PAGE
// ===============================

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const invoice =
    await getInvoice(id);

  if (!invoice) {
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
          flex
          items-center
          justify-center
          transition-colors
          duration-300
        "
      >
        <div
          className="
            text-center
            space-y-4
          "
        >
          <FileText className="h-16 w-16 text-blue-300 dark:text-slate-600 mx-auto" />
          <h1
            className="
              text-2xl
              font-bold
              text-blue-900
              dark:text-white
            "
          >
            Invoice not found
          </h1>
          <p
            className="
              text-blue-600/70
              dark:text-slate-400
            "
          >
            The invoice you're looking for doesn't exist.
          </p>
          <Link href="/dashboard/invoices">
            <Button
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
              "
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Button>
          </Link>
        </div>
      </main>
    );
  }

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
      {/* Header Actions */}
      <div className="flex justify-between items-center print:hidden flex-wrap gap-4">
        <Link href="/dashboard/invoices">
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
              h-12
              w-12
            "
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <div className="flex gap-3">
          <PdfButton />
          <PrintButton />
        </div>
      </div>

      {/* Invoice */}
      <Card
        id="invoice"
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
          print:shadow-none
          print:border
        "
      >
        <CardHeader className="border-b border-blue-100/50 dark:border-blue-900/30 pb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <CardTitle
                className="
                  text-3xl
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
                SMARTPOS PRO
              </CardTitle>
              <p className="text-blue-600/70 dark:text-slate-400 text-sm mt-1">
                Smart Retail Management System
              </p>
            </div>

            <div className="text-right">
              <p
                className="
                  text-2xl
                  font-bold
                  text-blue-900
                  dark:text-white
                "
              >
                INVOICE
              </p>
              <p className="text-blue-600/70 dark:text-slate-400 text-sm font-medium">
                {invoice.invoiceNumber}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Customer & Date */}
          <div className="grid md:grid-cols-2 gap-4 border-2 border-blue-100/50 dark:border-blue-900/30 rounded-xl p-4 bg-blue-50/30 dark:bg-slate-700/10">
            <div className="flex items-center gap-3">
              <div
                className="
                  rounded-lg
                  bg-blue-100
                  dark:bg-blue-900/30
                  p-2
                  transition-colors
                  duration-300
                "
              >
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-blue-500/60 dark:text-slate-400 uppercase tracking-wider">
                  Customer
                </p>
                <p className="font-semibold text-blue-900 dark:text-white">
                  {invoice.customerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="
                  rounded-lg
                  bg-blue-100
                  dark:bg-blue-900/30
                  p-2
                  transition-colors
                  duration-300
                "
              >
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-blue-500/60 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </p>
                <p className="font-semibold text-blue-900 dark:text-white">
                  {new Date(
                    invoice.createdAt
                  ).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-blue-100/50 dark:border-blue-900/30">
                  <th className="p-3 text-left text-blue-700 dark:text-slate-300 font-semibold">
                    Product
                  </th>
                  <th className="p-3 text-center text-blue-700 dark:text-slate-300 font-semibold">
                    Qty
                  </th>
                  <th className="p-3 text-center text-blue-700 dark:text-slate-300 font-semibold">
                    Price
                  </th>
                  <th className="p-3 text-center text-blue-700 dark:text-slate-300 font-semibold">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoice.products.map(
                  (item: any) => (
                    <tr
                      key={item._id}
                      className="border-b border-blue-100/50 dark:border-blue-900/30 hover:bg-blue-50/30 dark:hover:bg-slate-700/20 transition-colors duration-200"
                    >
                      <td className="p-3 font-medium text-blue-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="p-3 text-center text-blue-700 dark:text-slate-300">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-center text-blue-700 dark:text-slate-300">
                        LKR {item.price.toLocaleString()}
                      </td>
                      <td className="p-3 text-center font-semibold text-blue-900 dark:text-white">
                        LKR {item.subtotal.toLocaleString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="ml-auto max-w-sm space-y-3 border-t-2 border-blue-100/50 dark:border-blue-900/30 pt-5">
            <div className="flex justify-between text-sm">
              <span className="text-blue-600/70 dark:text-slate-400">
                Subtotal
              </span>
              <span className="font-medium text-blue-900 dark:text-white">
                LKR {invoice.totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm border-t border-blue-100/50 dark:border-blue-900/30 pt-3">
              <span className="text-blue-600/70 dark:text-slate-400">
                Payment Method
              </span>
              <span className="font-medium text-blue-900 dark:text-white flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-blue-400 dark:text-blue-500" />
                {invoice.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between text-sm border-t border-blue-100/50 dark:border-blue-900/30 pt-3">
              <span className="text-blue-600/70 dark:text-slate-400">
                Status
              </span>
              <span
                className={`
                  font-medium
                  flex
                  items-center
                  gap-1
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  ${
                    invoice.status === "Completed"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                  }
                `}
              >
                {invoice.status === "Completed" ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <Clock className="h-3 w-3" />
                )}
                {invoice.status}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t-2 border-blue-200 dark:border-blue-800 pt-4">
              <span className="text-blue-900 dark:text-white">
                Total Amount
              </span>
              <span className="text-blue-600 dark:text-blue-400">
                LKR {invoice.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-blue-100/50 dark:border-blue-900/30">
            <p className="text-sm text-blue-500/60 dark:text-slate-400">
              Thank you for shopping with SMARTPOS PRO
            </p>
            <p className="text-xs text-blue-400/50 dark:text-slate-500 mt-1">
              {new Date().getFullYear()} © SmartPOS Pro. All rights reserved.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}