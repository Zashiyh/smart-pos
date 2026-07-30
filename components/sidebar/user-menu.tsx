"use client";


import {
  UserCircle,
  LogOut,
} from "lucide-react";




export default function UserMenu(){


return (

<div

className="
border-t
p-4
"

>



<div

className="
flex
items-center
gap-3
rounded-xl
border
p-3
"

>


<UserCircle

className="
h-10
w-10
text-primary
"

/>




<div

className="
flex-1
"

>


<p

className="
text-sm
font-semibold
"

>

Admin

</p>



<p

className="
text-xs
text-muted-foreground
"

>

Administrator

</p>



</div>





<LogOut

className="
h-4
w-4
text-muted-foreground
"

/>



</div>





<p

className="
mt-4
text-center
text-xs
text-muted-foreground
"

>

SmartPOS Pro v1.0

</p>



</div>


);


}