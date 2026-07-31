"use client";

import {
  Save,
  Store,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";



export default function StoreSettings(){


return (


<div

className="
rounded-2xl
border
bg-background
p-6
space-y-6
"

>



<div

className="
flex
items-center
gap-3
"

>


<div

className="
rounded-xl
bg-primary/10
p-3
"

>


<Store

className="
h-6
w-6
text-primary
"

/>


</div>




<div>


<h2

className="
text-xl
font-semibold
"

>

Store Information

</h2>


<p

className="
text-sm
text-muted-foreground
"

>

Update your store details

</p>


</div>



</div>









<div

className="
grid
gap-4
md:grid-cols-2
"

>


<input

placeholder="Store Name"

className="
h-11
rounded-xl
border
bg-background
px-4
outline-none
"

/>




<input

placeholder="Phone Number"

className="
h-11
rounded-xl
border
bg-background
px-4
outline-none
"

/>





<input

placeholder="Email Address"

className="
h-11
rounded-xl
border
bg-background
px-4
outline-none
"

/>






<input

placeholder="Currency (LKR)"

defaultValue="LKR"

className="
h-11
rounded-xl
border
bg-background
px-4
outline-none
"

/>



</div>








<textarea

placeholder="Store Address"

className="
min-h-32
w-full
rounded-xl
border
bg-background
p-4
outline-none
"

/>








<div

className="
grid
gap-4
md:grid-cols-2
"

>


<input

placeholder="Tax Percentage (%)"

className="
h-11
rounded-xl
border
bg-background
px-4
outline-none
"

/>




<input

placeholder="Invoice Prefix"

defaultValue="INV"

className="
h-11
rounded-xl
border
bg-background
px-4
outline-none
"

/>



</div>









<Button

className="
rounded-xl
"

>


<Save

className="
mr-2
h-4
w-4
"

/>


Save Changes


</Button>







</div>


);


}