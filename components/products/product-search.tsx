"use client";


import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


interface ProductSearchProps {

  value:string;

  onChange:(value:string)=>void;

}



export default function ProductSearch(
{
  value,
  onChange

}:ProductSearchProps

){



return (

<div

className="
flex
items-center
gap-3
rounded-xl
border
px-4
"

>


<Search

className="
h-5
w-5
text-muted-foreground
"

/>



<Input

placeholder="Search products..."

value={value}

onChange={(e)=>onChange(e.target.value)}

className="
border-0
focus-visible:ring-0
"

/>



</div>


);


}