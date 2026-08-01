"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onSuccess?: () => void;
}

export default function Checkout({
  cart,
  total,
  onSuccess,
}: CheckoutProps) {
  const router = useRouter();

  const [customerName, setCustomerName] =
    useState("Walk-in Customer");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [loading, setLoading] =
    useState(false);

  async function completeSale() {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const body = {
        invoiceNumber: `INV-${Date.now()}`,
        customerName,
        paymentMethod,
        totalAmount: total,

        products: cart.map((item) => ({
          product: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
      };

      const response = await fetch("/api/sales", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        setLoading(false);
        return;
      }

      if (onSuccess) {
        onSuccess();
      }

     router.push(
  `/invoices/${data.sale._id}`
);
    } catch (error) {
      console.error(error);
      alert("Sale failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="rounded-2xl">

      <CardHeader>

        <CardTitle>

          Checkout

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Customer
          </label>

          <Input
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="w-full rounded-md border bg-background p-2"
          >

            <option value="Cash">
              Cash
            </option>

            <option value="Card">
              Card
            </option>

            <option value="Online">
              Online
            </option>

          </select>

        </div>

        <div className="border-t pt-4">

          <h2 className="text-2xl font-bold">

            Total: £{total}

          </h2>

        </div>

        <Button
          className="w-full rounded-xl"
          onClick={completeSale}
          disabled={loading}
        >

          {loading
            ? "Processing..."
            : "Complete Sale"}

        </Button>

      </CardContent>

    </Card>
  );
}