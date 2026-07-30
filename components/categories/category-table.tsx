"use client";

import {
  useState,
} from "react";


import {
  Trash2,
  RefreshCw,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import EditCategoryDialog from "./edit-category-dialog";




interface Category {

  _id: string;

  name: string;

  description?: string;

  status: string;

}




interface CategoryTableProps {

  categories: Category[];

}





export default function CategoryTable({

  categories,

}: CategoryTableProps) {



  const [categoryList, setCategoryList] =
    useState<Category[]>(categories);



  const [loading, setLoading] =
    useState(false);






  async function refreshCategories() {


    try {


      setLoading(true);



      const response =
        await fetch("/api/categories", {
          cache: "no-store",
        });



      const data =
        await response.json();




      if(data.success){

        setCategoryList(
          data.categories
        );

      }



    } catch(error){


      console.log(
        "Refresh error:",
        error
      );


    } finally {


      setLoading(false);


    }


  }








  async function deleteCategory(id:string){



    const confirmDelete =
      confirm(
        "Are you sure you want to delete this category?"
      );



    if(!confirmDelete)
      return;





    try{


      const response =
        await fetch(

          `/api/categories/${id}`,

          {
            method:"DELETE",
          }

        );



      const data =
        await response.json();




      if(data.success){


        setCategoryList((prev)=>

          prev.filter(

            (item)=>

              item._id !== id

          )

        );


      }




    }catch(error){


      console.log(
        "Delete error:",
        error
      );


    }



  }








  return (


    <div className="space-y-4">



      <div className="flex justify-end">


        <Button


          variant="outline"


          onClick={refreshCategories}


          disabled={loading}


        >


          <RefreshCw

            className={`
            mr-2
            h-4
            w-4

            ${
              loading
              ?
              "animate-spin"
              :
              ""
            }
            `}

          />


          Refresh


        </Button>


      </div>








      <div className="
        overflow-hidden
        rounded-2xl
        border
        bg-background
      ">


        <table className="w-full">


          <thead className="border-b bg-muted/40">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-right">
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


          {
            categoryList.length === 0

            ?

            (

              <tr>

                <td
                  colSpan={4}
                  className="
                  p-6
                  text-center
                  text-muted-foreground
                  "
                >

                  No categories found

                </td>

              </tr>

            )


            :


            categoryList.map((category)=>(


              <tr
                key={category._id}
                className="
                border-b
                hover:bg-muted/30
                "
              >



                <td className="p-4 font-medium">

                  {category.name}

                </td>




                <td className="p-4 text-muted-foreground">

                  {category.description || "-"}

                </td>





                <td className="p-4">


                  <span
                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium

                    ${
                      category.status === "Active"

                      ?

                      "bg-green-500/10 text-green-600"

                      :

                      "bg-red-500/10 text-red-600"

                    }
                    `}
                  >

                    {category.status}


                  </span>


                </td>







                <td className="p-4">


                  <div className="
                    flex
                    justify-end
                    gap-2
                  ">


                    <EditCategoryDialog

                      category={{

                        _id: category._id,

                        name: category.name,

                        description:
                          category.description ?? "",

                        status:
                          category.status === "Inactive"
                          ?
                          "Inactive"
                          :
                          "Active"

                      }}

                    />





                    <Button

                      variant="destructive"

                      size="icon"

                      onClick={()=>

                        deleteCategory(
                          category._id
                        )

                      }

                    >

                      <Trash2
                        className="
                        h-4
                        w-4
                        "
                      />

                    </Button>



                  </div>


                </td>



              </tr>


            ))

          }



          </tbody>


        </table>


      </div>


    </div>


  );


}