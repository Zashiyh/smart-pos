import ProductTable from "@/components/products/product-table";


interface Product {

  _id: string;
  name: string;
  barcode: string;
  sku: string;
  category: string;
  brand: string;
  supplier: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  status: string;

}



async function getProducts(): Promise<Product[]> {


  try {


    const response = await fetch(
      "http://localhost:3000/api/products",
      {
        cache: "no-store",
      }
    );



    const data = await response.json();


    console.log("PRODUCT DATA:", data);



    if(data.success){

      return data.products;

    }


    return [];



  } catch(error){


    console.log(
      "PRODUCT FETCH ERROR:",
      error
    );


    return [];


  }


}





export default async function ProductsPage(){



  const products =
    await getProducts();




  return (


    <main

      className="
      min-h-screen
      rounded-3xl
      bg-muted/30
      p-6
      space-y-6
      "

    >



      <div>


        <h1

          className="
          text-3xl
          font-bold
          "

        >

          Products

        </h1>



        <p

          className="
          text-muted-foreground
          "

        >

          Manage inventory products

        </p>


      </div>





      <ProductTable

        products={products}

      />





    </main>


  );

}