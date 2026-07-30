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



export default function AddCategoryDialog() {


  const [name,setName] = useState("");

  const [description,setDescription] = useState("");



  async function createCategory(){


    const res = await fetch(
      "/api/categories",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          name,
          description,
        }),
      }
    );


    const data = await res.json();


    if(data.success){

      alert("Category Added");

      setName("");

      setDescription("");

    }


  }



  return (

    <Dialog>


      <DialogTrigger>

        <Button>
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
              setName(e.target.value)
            }

          />



          <Textarea

            placeholder="Description"

            value={description}

            onChange={(e)=>
              setDescription(e.target.value)
            }

          />



          <Button
            onClick={createCategory}
            className="w-full"
          >

            Save Category

          </Button>



        </div>



      </DialogContent>


    </Dialog>

  );

}