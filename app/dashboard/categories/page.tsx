import AddCategoryDialog from "@/components/categories/add-category-dialog";

import CategoryTable from "@/components/categories/category-table";



interface Category {

  _id: string;

  name: string;

  description: string;

  status: string;

}



const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3000";





async function getCategories(): Promise<Category[]> {


  try {


    const response = await fetch(
      `${API_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );




    if (!response.ok) {

      throw new Error(
        "Failed to fetch categories"
      );

    }





    const data =
      await response.json();




    if (!data.success) {

      return [];

    }





    return data.categories || [];





  } catch (error) {


    console.error(
      "GET CATEGORIES ERROR:",
      error
    );


    return [];


  }


}









export default async function CategoriesPage() {


  const categories =
    await getCategories();




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





      <section

        className="
        flex
        items-center
        justify-between
        "

      >



        <div>



          <h1

            className="
            text-3xl
            font-bold
            "

          >

            Categories


          </h1>





          <p

            className="
            text-muted-foreground
            "

          >

            Manage product categories


          </p>



        </div>








        <AddCategoryDialog />





      </section>







      <CategoryTable

        categories={categories}

      />





    </main>


  );


}