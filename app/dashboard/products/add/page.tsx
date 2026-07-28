import Link from "next/link";

import ProductForm from "@/components/products/product-form";

import {
  ArrowLeft,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";



export default function AddProductPage() {


  return (

    <div
      className="
        min-h-screen
        space-y-6
        rounded-3xl
        bg-muted/30
        p-6
      "
    >





      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >


        <Link href="/dashboard/products">


          <Button
            variant="outline"
            size="icon"
            className="
              rounded-xl
            "
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


          <h1
            className="
              text-3xl
              font-bold
            "
          >

            Add Product

          </h1>



          <p
            className="
              text-muted-foreground
            "
          >

            Create a new product for your inventory

          </p>



        </div>



      </div>









      {/* Form */}


      <ProductForm />





    </div>

  );

}