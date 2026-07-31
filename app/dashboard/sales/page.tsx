"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Banknote,
  Wallet,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  sellingPrice: number;
  stock: number;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default function SalesPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const [customerName, setCustomerName] =
    useState("Walk-in Customer");
  
  const [cashReceived, setCashReceived] =
    useState(0);  

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/products");

    const data = await res.json();

    if (data.success) {
      setProducts(data.products);
    }
  }

  function addToCart(product: Product) {
    const existing = cart.find(
      (item) => item.productId === product._id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

      return;
    }

    setCart([
      ...cart,
      {
        productId: product._id,
        name: product.name,
        price: product.sellingPrice,
        quantity: 1,
      },
    ]);
  }

  function increase(id: string) {
    setCart(
      cart.map((item) =>
        item.productId === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decrease(id: string) {
    setCart(
      cart
        .map((item) =>
          item.productId === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id: string) {
    setCart(
      cart.filter(
        (item) => item.productId !== id
      )
    );
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(5);

  const taxAmount = useMemo(() => {
    return (subtotal * tax) / 100;
  }, [subtotal, tax]);

  const grandTotal = useMemo(() => {
    return subtotal - discount + taxAmount;
  }, [
    subtotal,
    discount,
    taxAmount
  ]);

  const change = useMemo(() => {
    return cashReceived - grandTotal;
  }, [
    cashReceived,
    grandTotal
  ]);

  async function handleCompleteSale() {
    if (cart.length === 0) {
      setMessage("Cart is empty");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const body = {
        invoiceNumber: `INV-${Date.now()}`,
        customerName,
        paymentMethod,
        totalAmount: grandTotal,
        cashReceived,
        change: cashReceived - grandTotal,
        products: cart.map((item) => ({
          product: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        }))
      };

      const res = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setCart([]);

      await loadProducts();

      router.push(
        `/dashboard/invoices/${data.sale._id}`
      );
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
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
          Sales / POS
        </h1>
        <p
          className="
            text-blue-600/70
            dark:text-slate-400
            mt-1
          "
        >
          Point of Sale System
        </p>
      </div>

      {message && (
        <div
          className={`
            rounded-xl
            p-4
            text-sm
            font-medium
            ${
              message.includes("success")
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30"
                : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/30"
            }
            border-2
            transition-colors
            duration-300
          `}
        >
          {message}
        </div>
      )}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        {/* =========================
            PRODUCTS
        ========================== */}
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
              <Search className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              Products
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <Input
              placeholder="Search product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
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
              "
            />

            <div
              className="
                mt-5
                space-y-3
                max-h-[500px]
                overflow-y-auto
                pr-2
              "
            >
              {filteredProducts.map(
                (product) => (
                  <div
                    key={product._id}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border-2
                      border-blue-100/50
                      dark:border-blue-900/30
                      p-3
                      hover:bg-blue-50/50
                      dark:hover:bg-slate-700/30
                      transition-all
                      duration-200
                    "
                  >
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
                        Stock: {product.stock}
                      </p>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-blue-700
                          dark:text-blue-400
                        "
                      >
                        LKR {product.sellingPrice.toLocaleString()}
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        addToCart(product)
                      }
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
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* =========================
            CART
        ========================== */}
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
              <ShoppingCart className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              Cart
              <span
                className="
                  ml-auto
                  text-sm
                  font-medium
                  bg-blue-100
                  dark:bg-blue-900/30
                  text-blue-700
                  dark:text-blue-400
                  px-3
                  py-1
                  rounded-full
                "
              >
                {cart.length} items
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            {cart.length === 0 ? (
              <div
                className="
                  text-center
                  py-12
                  text-blue-400/60
                  dark:text-slate-500
                "
              >
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Cart is empty</p>
                <p className="text-sm">
                  Add products to start
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="
                      rounded-xl
                      border-2
                      border-blue-100/50
                      dark:border-blue-900/30
                      p-3
                      space-y-3
                      hover:bg-blue-50/30
                      dark:hover:bg-slate-700/20
                      transition-all
                      duration-200
                    "
                  >
                    <div
                      className="
                        flex
                        justify-between
                        items-start
                      "
                    >
                      <div>
                        <p
                          className="
                            font-medium
                            text-blue-900
                            dark:text-white
                          "
                        >
                          {item.name}
                        </p>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-blue-700
                            dark:text-blue-400
                          "
                        >
                          LKR {item.price}
                        </p>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          removeItem(
                            item.productId
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
                        "
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          decrease(
                            item.productId
                          )
                        }
                        className="
                          rounded-xl
                          border-2
                          border-blue-200
                          dark:border-blue-900/30
                          hover:bg-blue-50
                          dark:hover:bg-slate-700/50
                          transition-all
                          duration-200
                          w-10
                          h-10
                          p-0
                        "
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span
                        className="
                          font-bold
                          text-xl
                          text-blue-900
                          dark:text-white
                          min-w-[40px]
                          text-center
                        "
                      >
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          increase(
                            item.productId
                          )
                        }
                        className="
                          rounded-xl
                          border-2
                          border-blue-200
                          dark:border-blue-900/30
                          hover:bg-blue-50
                          dark:hover:bg-slate-700/50
                          transition-all
                          duration-200
                          w-10
                          h-10
                          p-0
                        "
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <p
                      className="
                        text-right
                        font-semibold
                        text-blue-900
                        dark:text-white
                      "
                    >
                      Subtotal: LKR{" "}
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div
              className="
                border-t-2
                border-blue-100/50
                dark:border-blue-900/30
                pt-5
                space-y-4
              "
            >
              <Input
                placeholder="Customer name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(
                    e.target.value
                  )
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
                "
              />

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
                className="
                  w-full
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
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-blue-600/70 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-blue-600/70 dark:text-slate-400">
                  <span>Discount</span>
                  <span>LKR {discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-blue-600/70 dark:text-slate-400">
                  <span>Tax ({tax}%)</span>
                  <span>LKR {taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-blue-900 dark:text-white pt-2 border-t-2 border-blue-100/50 dark:border-blue-900/30">
                  <span>Total</span>
                  <span>LKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Input
                type="number"
                placeholder="Cash Received"
                value={cashReceived}
                onChange={(e) =>
                  setCashReceived(
                    Number(e.target.value)
                  )
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
                "
              />

              {cashReceived > 0 && (
                <div
                  className="
                    flex
                    justify-between
                    rounded-xl
                    border-2
                    p-3
                    border-emerald-200
                    dark:border-emerald-900/30
                    bg-emerald-50/50
                    dark:bg-emerald-900/10
                  "
                >
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                    Change
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    LKR {change > 0 ? change.toLocaleString() : "0.00"}
                  </span>
                </div>
              )}

              <Button
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-emerald-600
                  dark:from-emerald-600
                  dark:to-emerald-700
                  text-white
                  hover:shadow-lg
                  hover:shadow-emerald-500/30
                  dark:hover:shadow-emerald-600/20
                  transition-all
                  duration-300
                  font-semibold
                  h-12
                  text-base
                "
                disabled={loading || cart.length === 0}
                onClick={handleCompleteSale}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "Complete Sale"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}