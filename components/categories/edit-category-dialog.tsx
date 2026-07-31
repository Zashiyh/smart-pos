"use client";

import {
  useState,
} from "react";

import {
  Pencil,
} from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import {
  Button,
} from "@/components/ui/button";


import {
  Input,
} from "@/components/ui/input";


import {
  Textarea,
} from "@/components/ui/textarea";





interface Category {

  _id: string;

  name: string;

  description?: string;

  status: string;

}





interface EditCategoryDialogProps {

  category: Category;

}








export default function EditCategoryDialog({

  category,

}: EditCategoryDialogProps) {




const [name,setName] =
useState(category.name);



const [description,setDescription] =
useState(category.description ?? "");



const [status,setStatus] =
useState(category.status || "Active");



const [loading,setLoading] =
useState(false);









async function updateCategory(){



try{



setLoading(true);





const response =
await fetch(

`/api/categories/${category._id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json",

},


body:JSON.stringify({

name,

description,

status,

}),


}

);







const data =
await response.json();






if(data.success){


alert("Category Updated");


window.location.reload();


}





}catch(error){


console.log(
"Update category error:",
error
);



}finally{


setLoading(false);


}



}









return (



<Dialog>





<DialogTrigger>


<Button


variant="outline"


size="icon"


type="button"


>


<Pencil

className="
h-4
w-4
"

/>


</Button>


</DialogTrigger>









<DialogContent>





<DialogHeader>


<DialogTitle>

Edit Category

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









<select


value={status}


onChange={(e)=>

setStatus(
e.target.value
)

}


className="
w-full
rounded-lg
border
bg-background
p-2
"


>


<option value="Active">

Active

</option>



<option value="Inactive">

Inactive

</option>



</select>









<Button


className="w-full"


onClick={updateCategory}


disabled={loading}


>



{

loading

?

"Updating..."

:

"Update Category"

}



</Button>








</div>







</DialogContent>







</Dialog>



);


}