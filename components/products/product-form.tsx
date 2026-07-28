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


  function validateForm(){


    if(!form.name.trim()){

      return "Product name is required";

    }



    if(!form.category){


      return "Please select a category";

    }




    if(Number(form.costPrice) < 0){


      return "Cost price cannot be negative";

    }





    if(Number(form.sellingPrice) < 0){


      return "Selling price cannot be negative";

    }





    if(Number(form.stock) < 0){


      return "Stock cannot be negative";

    }





    if(Number(form.minStock) < 0){


      return "Minimum stock cannot be negative";

    }






    if(
      Number(form.sellingPrice) <
      Number(form.costPrice)
    ){


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




    if(validationError){


      setMessage(validationError);

      return;


    }




    setLoading(true);

    setMessage("");





    try {


      const response = await fetch(
        "/api/products",
        {


          method:"POST",


          headers:{


            "Content-Type":"application/json"


          },



          body:JSON.stringify({


            ...form,


            costPrice:Number(form.costPrice),


            sellingPrice:Number(form.sellingPrice),


            stock:Number(form.stock),


            minStock:Number(form.minStock),



          })



        }

      );







      const data = await response.json();







      if(!response.ok || !data.success){


        throw new Error(

          data.message ||
          "Product adding failed"

        );


      }








      setMessage(

        "Product added successfully!"

      );








      setTimeout(()=>{


        router.push(
          "/dashboard/products"
        );


        router.refresh();



      },1000);






    }catch(error:any){



      setMessage(

        error.message

      );



    }
    finally{


      setLoading(false);


    }



  }









  return (


    <Card
      className="
      rounded-3xl
      "
    >



      <CardHeader>


        <CardTitle>

          Add New Product

        </CardTitle>


      </CardHeader>






      <CardContent>



        <form

          onSubmit={handleSubmit}

          className="
          grid
          gap-5
          "

        >




          <Input

            name="name"

            placeholder="Product Name"

            value={form.name}

            onChange={handleChange}

            required

          />






          <Input

            name="barcode"

            placeholder="Barcode"

            value={form.barcode}

            onChange={handleChange}

          />







          <Input

            name="sku"

            placeholder="SKU Code"

            value={form.sku}

            onChange={handleChange}

          />







          <select

            name="category"

            value={form.category}

            onChange={handleChange}

            required

            className="
            rounded-xl
            border
            bg-background
            px-4
            py-3
            "

          >


            <option value="">
              Select Category
            </option>


            <option value="Grocery">
              Grocery
            </option>


            <option value="Beverages">
              Beverages
            </option>


            <option value="Dairy">
              Dairy
            </option>


            <option value="Bakery">
              Bakery
            </option>


            <option value="Frozen Foods">
              Frozen Foods
            </option>


            <option value="Household">
              Household
            </option>


            <option value="Personal Care">
              Personal Care
            </option>


            <option value="Electronics">
              Electronics
            </option>


            <option value="Pharmacy">
              Pharmacy
            </option>



          </select>







          <Input

            name="brand"

            placeholder="Brand"

            value={form.brand}

            onChange={handleChange}

          />






          <Input

            name="supplier"

            placeholder="Supplier"

            value={form.supplier}

            onChange={handleChange}

          />








          <div
            className="
            grid
            gap-4
            md:grid-cols-2
            "
          >


            <Input

              type="number"

              name="costPrice"

              placeholder="Cost Price"

              value={form.costPrice}

              onChange={handleChange}

              required

            />




            <Input

              type="number"

              name="sellingPrice"

              placeholder="Selling Price"

              value={form.sellingPrice}

              onChange={handleChange}

              required

            />



          </div>








          <div
            className="
            grid
            gap-4
            md:grid-cols-2
            "
          >



            <Input

              type="number"

              name="stock"

              placeholder="Stock Quantity"

              value={form.stock}

              onChange={handleChange}

              required

            />





            <Input

              type="number"

              name="minStock"

              placeholder="Minimum Stock"

              value={form.minStock}

              onChange={handleChange}

            />




          </div>







          <Input

            name="unit"

            placeholder="Unit (pcs, kg, bottle)"

            value={form.unit}

            onChange={handleChange}

          />







          <Input

            type="date"

            name="expiryDate"

            value={form.expiryDate}

            onChange={handleChange}

          />







          <Input

            name="image"

            placeholder="Image URL"

            value={form.image}

            onChange={handleChange}

          />









          <Button

            type="submit"

            disabled={loading}

            className="
            rounded-xl
            "

          >


            {
              loading
              ?
              "Saving..."
              :
              "Save Product"
            }



          </Button>









          {
            message && (


              <p

                className={`
                text-center
                text-sm
                ${
                  message.includes("success")
                  ?
                  "text-green-600"
                  :
                  "text-red-600"
                }
                `}

              >

                {message}


              </p>



            )
          }






        </form>




      </CardContent>




    </Card>



  );


}