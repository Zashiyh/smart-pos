"use client";



// IMPORTS


import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";





export default function EditProductPage() {



 
  // STATES
 


  const [product, setProduct] = useState<any>(null);


  const [loading, setLoading] = useState(true);



  const router = useRouter();







 
  // GET PRODUCT ID
  // LOAD PRODUCT DATA



  useEffect(() => {



    const loadProduct = async()=>{


      try {



        const params = new URLSearchParams(
          window.location.search
        );



        const id = params.get("id");



        if(!id){

          return;

        }




        const res = await fetch(
          `/api/products/${id}`
        );



        const data = await res.json();




        console.log(data);





        if(data.success){


          setProduct(data.product);


        }





      } catch(error){


        console.log(
          "Load product error:",
          error
        );


      } finally {


        setLoading(false);


      }



    };




    loadProduct();



  }, []);










  // HANDLE INPUT CHANGE



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  )=>{



    setProduct({

      ...product,

      [e.target.name]: e.target.value

    });



  };










  // UPDATE PRODUCT
  // PUT API
 


  const handleUpdate = async()=>{


    try {



      const params = new URLSearchParams(
        window.location.search
      );



      const id = params.get("id");



      if(!id){

        return;

      }






      const res = await fetch(
        `/api/products/${id}`,
        {


          method:"PUT",



          headers:{


            "Content-Type":"application/json"


          },



          body:JSON.stringify(product)



        }
      );





      const data = await res.json();




      console.log(data);





      if(data.success){



        alert(
          "Product updated successfully"
        );



        router.push(
          "/dashboard/products"
        );



      }else{


        alert(
          "Update failed"
        );


      }






    } catch(error){



      console.log(
        "Update error:",
        error
      );



    }



  };










  // LOADING SCREEN



  if(loading){


    return (

      <div className="p-6">

        Loading product...

      </div>

    );


  }






  if(!product){


    return (

      <div className="p-6">

        Product not found

      </div>

    );


  }









  return (



    <div

      className="
      min-h-screen
      rounded-3xl
      bg-muted/30
      p-6
      space-y-6
      "

    >






      {/* ===============================
          HEADER
      =============================== */}



      <div className="flex items-center gap-4">





        <Link href="/dashboard/products">



          <Button

            variant="outline"

            size="icon"

            className="rounded-xl"

          >


            <ArrowLeft
              className="
              h-5
              w-5
              "
            />



          </Button>



        </Link>






        <div>



          <h1 className="text-3xl font-bold">


            Edit Product


          </h1>





          <p className="text-muted-foreground">


            Update product information


          </p>





        </div>






      </div>













      {/* ===============================
          PRODUCT FORM
      =============================== */}





      <div className="grid gap-4 md:grid-cols-2">





        <input

          name="name"

          className="border rounded-xl p-3"

          value={product.name || ""}

          onChange={handleChange}

          placeholder="Product Name"

        />






        <input

          name="barcode"

          className="border rounded-xl p-3"

          value={product.barcode || ""}

          onChange={handleChange}

          placeholder="Barcode"

        />







        <input

          name="sku"

          className="border rounded-xl p-3"

          value={product.sku || ""}

          onChange={handleChange}

          placeholder="SKU"

        />







        <input

          name="category"

          className="border rounded-xl p-3"

          value={product.category || ""}

          onChange={handleChange}

          placeholder="Category"

        />







        <input

          name="brand"

          className="border rounded-xl p-3"

          value={product.brand || ""}

          onChange={handleChange}

          placeholder="Brand"

        />








        <input

          name="supplier"

          className="border rounded-xl p-3"

          value={product.supplier || ""}

          onChange={handleChange}

          placeholder="Supplier"

        />








        <input

          name="costPrice"

          type="number"

          className="border rounded-xl p-3"

          value={product.costPrice || ""}

          onChange={handleChange}

          placeholder="Cost Price"

        />








        <input

          name="sellingPrice"

          type="number"

          className="border rounded-xl p-3"

          value={product.sellingPrice || ""}

          onChange={handleChange}

          placeholder="Selling Price"

        />








        <input

          name="stock"

          type="number"

          className="border rounded-xl p-3"

          value={product.stock || ""}

          onChange={handleChange}

          placeholder="Stock"

        />






      </div>









      {/* ===============================
          UPDATE BUTTON
      =============================== */}




      <Button

        className="rounded-xl"

        onClick={handleUpdate}

      >


        Update Product



      </Button>








    </div>



  );


}