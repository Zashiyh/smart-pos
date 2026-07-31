"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";



export default function AddCategoryDialog(){


  const [name,setName] =
    useState("");


  const [description,setDescription] =
    useState("");



  const [loading,setLoading] =
    useState(false);







  async function createCategory(){


    try{


      setLoading(true);




      const response =
        await fetch(
          "/api/categories",
          {
            method:"POST",

            headers:{
              "Content-Type":"application/json",
            },

            body:JSON.stringify({

              name,

              description,

              status:"Active",

            }),

          }
        );







      const data =
        await response.json();






      if(data.success){


        alert("Category Added");


        setName("");

        setDescription("");


        window.location.reload();


      }else{


        alert(
          data.message || "Failed to add category"
        );


      }





    }catch(error){


      console.log(
        "Add category error:",
        error
      );


      alert(
        "Something went wrong"
      );



    }finally{


      setLoading(false);


    }



  }









  return (


    <Dialog>



      <DialogTrigger>


        <Button type="button">

          Add Category

        </Button>


      </DialogTrigger>









      <DialogContent>





        <DialogHeader>


          <DialogTitle>

            Add Category

          </DialogTitle>


        </DialogHeader>









        <div className="space-y-4">






          <Input


            placeholder="Category name"


            value={name}


            onChange={(e)=>

              setName(
                e.target.value
              )

            }


          />








          <Textarea


            placeholder="Description"


            value={description}


            onChange={(e)=>

              setDescription(
                e.target.value
              )

            }


          />









          <Button


            className="w-full"


            onClick={createCategory}


            disabled={loading}


          >



            {

              loading

              ?

              "Saving..."

              :

              "Save Category"

            }



          </Button>






        </div>







      </DialogContent>






    </Dialog>


  );


}