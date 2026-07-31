import Link from "next/link";

import {
  Store,
  UserRound,
  ShieldCheck,
  Bell,
  Palette,
  Database,
} from "lucide-react";





const settingsCards = [

  {
    title:"Store Settings",
    description:
      "Manage store information, currency and invoice settings",
    icon:Store,
    link:"/dashboard/settings/store",
  },


  {
    title:"User & Roles",
    description:
      "Manage employees and user permissions",
    icon:UserRound,
    link:"/dashboard/settings/users",
  },


  {
    title:"Security",
    description:
      "Password, authentication and account security",
    icon:ShieldCheck,
    link:"/dashboard/settings/security",
  },


  {
    title:"Notifications",
    description:
      "Manage alerts and system notifications",
    icon:Bell,
    link:"/dashboard/settings/notifications",
  },


  {
    title:"Appearance",
    description:
      "Theme and interface customization",
    icon:Palette,
    link:"/dashboard/settings/appearance",
  },


  {
    title:"System",
    description:
      "Backup, database and application information",
    icon:Database,
    link:"/dashboard/settings/system",
  },


];








export default function SettingsPage(){



return (


<main

className="
min-h-screen
space-y-8
rounded-3xl
bg-muted/30
p-6
"

>



<div>


<h1

className="
text-3xl
font-bold
"

>

Settings

</h1>



<p

className="
text-muted-foreground
"

>

Manage your SmartPOS Pro configuration

</p>


</div>








<div

className="
grid
gap-6
md:grid-cols-2
xl:grid-cols-3
"

>


{

settingsCards.map((item)=>(



<Link

href={item.link}

key={item.title}

className="block"

>



<div


className="
cursor-pointer
rounded-2xl
border
bg-background
p-6
transition
hover:bg-muted/40
"

>



<div

className="
flex
items-center
gap-4
"

>



<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-primary/10
"

>


<item.icon

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
font-semibold
"

>

{item.title}

</h2>




<p

className="
mt-1
text-sm
text-muted-foreground
"

>

{item.description}

</p>



</div>





</div>



</div>



</Link>



))


}



</div>







</main>


);


}