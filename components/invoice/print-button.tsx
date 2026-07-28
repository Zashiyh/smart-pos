"use client";


import {
  Printer
} from "lucide-react";


import {
 Button
} from "@/components/ui/button";



export default function PrintButton(){


return (

<Button

className="rounded-xl"

onClick={()=>window.print()}

>

<Printer

className="
mr-2
h-4
w-4
"

/>


Print Invoice


</Button>


);


}