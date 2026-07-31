"use client";

import {
  Bell,
  Mail,
  ShoppingCart,
  Package,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useState,
} from "react";



export default function NotificationSettings(){


const [settings,setSettings] = useState({

sales:true,

lowStock:true,

email:false,

system:true,

});



function toggle(key:keyof typeof settings){

setSettings({

...settings,

[key]:!settings[key]

});

}



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

<Bell

className="
h-6
w-6
text-primary
"

/>

</div>



<div>

<h2 className="text-xl font-semibold">
Notification Settings
</h2>


<p className="text-sm text-muted-foreground">
Manage system alerts and notifications
</p>


</div>


</div>







<div className="space-y-4">



{/* Sales Notification */}

<div

className="
flex
items-center
justify-between
rounded-xl
border
p-4
"

>


<div className="flex gap-3 items-center">


<ShoppingCart
className="h-5 w-5 text-primary"
/>


<div>

<h3 className="font-medium">
Sales Notifications
</h3>


<p className="text-sm text-muted-foreground">
Get alerts when new sales are completed
</p>


</div>


</div>




<button

onClick={()=>toggle("sales")}

className={`

h-6
w-11
rounded-full
transition

${
settings.sales
?
"bg-primary"
:
"bg-muted"
}

`}

>

<div

className={`

h-5
w-5
rounded-full
bg-white
transition
translate-y-[2px]

${
settings.sales
?
"translate-x-5"
:
"translate-x-1"
}

`}

/>

</button>


</div>








{/* Low Stock */}


<div

className="
flex
items-center
justify-between
rounded-xl
border
p-4
"

>


<div className="flex gap-3 items-center">


<Package
className="h-5 w-5 text-red-500"
/>


<div>

<h3 className="font-medium">
Low Stock Alert
</h3>


<p className="text-sm text-muted-foreground">
Receive alerts when stock is low
</p>


</div>


</div>




<button

onClick={()=>toggle("lowStock")}

className={`

h-6
w-11
rounded-full
transition

${
settings.lowStock
?
"bg-primary"
:
"bg-muted"
}

`}

>

<div

className={`

h-5
w-5
rounded-full
bg-white
transition
translate-y-[2px]

${
settings.lowStock
?
"translate-x-5"
:
"translate-x-1"
}

`}

/>

</button>


</div>










{/* Email */}


<div

className="
flex
items-center
justify-between
rounded-xl
border
p-4
"

>


<div className="flex gap-3 items-center">


<Mail
className="h-5 w-5 text-primary"
/>


<div>

<h3 className="font-medium">
Email Notifications
</h3>


<p className="text-sm text-muted-foreground">
Send reports through email
</p>


</div>


</div>




<button

onClick={()=>toggle("email")}

className={`

h-6
w-11
rounded-full
transition

${
settings.email
?
"bg-primary"
:
"bg-muted"
}

`}

>

<div

className={`

h-5
w-5
rounded-full
bg-white
transition
translate-y-[2px]

${
settings.email
?
"translate-x-5"
:
"translate-x-1"
}

`}

/>

</button>


</div>





</div>








<Button

className="
rounded-xl
"

>

Save Notification Settings

</Button>





</div>

);


}