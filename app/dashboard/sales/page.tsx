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
  
  const [cashReceived,setCashReceived] =
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



const [discount,setDiscount] = useState(0);


const [tax,setTax] = useState(5);



const taxAmount = useMemo(()=>{

  return (subtotal * tax) / 100;

},[subtotal,tax]);



const grandTotal = useMemo(()=>{

  return subtotal - discount + taxAmount;

},[
  subtotal,
  discount,
  taxAmount
]);

const change = useMemo(()=>{

  return cashReceived - grandTotal;

},[
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

invoiceNumber:`INV-${Date.now()}`,

customerName,

paymentMethod,

totalAmount: grandTotal,

cashReceived,

change:
cashReceived - grandTotal,


products: cart.map((item)=>({

product:item.productId,

name:item.name,

quantity:item.quantity,

price:item.price,

subtotal:
item.price * item.quantity,

}))

};

      const res = await fetch("/api/sales", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
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
  }  return (

    <div
      className="
      min-h-screen
      space-y-6
      rounded-3xl
      bg-muted/30
      p-6
      "
    >


      <h1
        className="
        text-3xl
        font-bold
        "
      >
        Sales / POS
      </h1>



      {
        message && (

          <div
            className="
            rounded-xl
            border
            p-3
            text-sm
            "
          >

            {message}

          </div>

        )
      }





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


        <Card className="rounded-2xl">


          <CardHeader>

            <CardTitle>
              Products
            </CardTitle>

          </CardHeader>




          <CardContent>


            <Input

              placeholder="Search product..."

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

            />





            <div
              className="
              mt-5
              space-y-3
              "
            >


              {
                filteredProducts.map(
                  (product)=>(


                    <div

                      key={product._id}

                      className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      p-3
                      "

                    >


                      <div>


                        <p
                          className="
                          font-medium
                          "
                        >

                          {product.name}

                        </p>



                        <p
                          className="
                          text-sm
                          text-muted-foreground
                          "
                        >

                          Stock:
                          {" "}
                          {product.stock}

                        </p>



                        <p
                          className="
                          text-sm
                          "
                        >

                         LKR {product.sellingPrice.toLocaleString()}

                        </p>



                      </div>






                      <Button

                        onClick={()=>
                          addToCart(product)
                        }

                      >

                        Add

                      </Button>





                    </div>


                  )
                )
              }



            </div>




          </CardContent>



        </Card>







        {/* =========================
            CART
        ========================== */}


        <Card className="rounded-2xl">


          <CardHeader>

            <CardTitle>
              Cart
            </CardTitle>

          </CardHeader>





          <CardContent
            className="
            space-y-5
            "
          >



            {
              cart.length === 0 ?


              (

                <p
                  className="
                  text-muted-foreground
                  "
                >

                  Cart is empty

                </p>

              )

              :


              cart.map(
                (item)=>(


                  <div

                    key={item.productId}

                    className="
                    rounded-xl
                    border
                    p-3
                    space-y-3
                    "

                  >



                    <div
                      className="
                      flex
                      justify-between
                      "
                    >


                      <div>


                        <p
                          className="
                          font-medium
                          "
                        >

                          {item.name}

                        </p>



                        <p
                          className="
                          text-sm
                          "
                        >

                          LKR{item.price}

                        </p>



                      </div>




                      <Button

                        variant="destructive"

                        size="sm"

                        onClick={()=>
                          removeItem(
                            item.productId
                          )
                        }

                      >

                        Remove

                      </Button>



                    </div>







                    <div
                      className="
                      flex
                      items-center
                      justify-between
                      "
                    >


                      <Button

                        variant="outline"

                        size="sm"

                        onClick={()=>
                          decrease(
                            item.productId
                          )
                        }

                      >

                        -

                      </Button>





                      <span
                        className="
                        font-bold
                        "
                      >

                        {item.quantity}

                      </span>






                      <Button

                        variant="outline"

                        size="sm"

                        onClick={()=>
                          increase(
                            item.productId
                          )
                        }

                      >

                        +

                      </Button>



                    </div>






                    <p
                      className="
                      text-right
                      font-semibold
                      "
                    >

                      Subtotal:
                      {" "}
                      LKR
                      {
                        item.price *
                        item.quantity
                      }

                    </p>




                  </div>


                )

              )

            }







            <div
              className="
              border-t
              pt-5
              space-y-4
              "
            >




              <Input

                placeholder="Customer name"

                value={customerName}

                onChange={(e)=>
                  setCustomerName(
                    e.target.value
                  )
                }

              />







              <select

                value={paymentMethod}

                onChange={(e)=>
                  setPaymentMethod(
                    e.target.value
                  )
                }

                className="
                w-full
                rounded-xl
                border
                bg-background
                p-2
                "

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







 <h2
  className="
  text-2xl
  font-bold
  "
>
  Total:
  {" "}
  LKR{grandTotal}
</h2>

<div className="space-y-3">


<Input

type="number"

placeholder="Cash Received"

value={cashReceived}

onChange={(e)=>
setCashReceived(
Number(e.target.value)
)
}

/>



<div
className="
flex
justify-between
rounded-xl
border
p-3
"
>

<span>
Change
</span>


<span className="font-bold">

LKR
{
cashReceived > grandTotal
?
(cashReceived - grandTotal).toFixed(2)
:
"0.00"
}

</span>


</div>



</div>

<Input

type="number"

placeholder="Cash Received"

value={cashReceived}

onChange={(e)=>
  setCashReceived(
    Number(e.target.value)
  )
}

/>


<p className="font-semibold">

Change:
{" "}
LKR{change}

</p>






              <Button

                className="
                w-full
                rounded-xl
                "

                disabled={loading}

                onClick={
                  handleCompleteSale
                }

              >

                {
                  loading
                  ?
                  "Processing..."
                  :
                  "Complete Sale"
                }


              </Button>





            </div>





          </CardContent>




        </Card>







      </div>




    </div>


  );

}