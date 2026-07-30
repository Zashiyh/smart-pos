"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";




interface SidebarItemProps {

item:any;

}




export default function SidebarItem({

item

}:SidebarItemProps){



const pathname = usePathname();


const Icon = item.icon;



const active =
pathname === item.href;





return (


<Link

href={item.href}


className={`

group

flex
items-center
gap-3

rounded-xl

px-4
py-3

text-sm
font-medium

transition-all
duration-300


${
active

?

`
bg-primary
text-primary-foreground
shadow-lg
shadow-primary/30
`

:

`
text-muted-foreground
hover:bg-muted
hover:text-foreground
`

}


`}

>




<div

className={`

flex
h-9
w-9
items-center
justify-center

rounded-lg


${
active

?

"bg-white/20"

:

"bg-muted group-hover:bg-primary/10"

}

`}

>


<Icon

className="
h-5
w-5
"

/>


</div>





<span>

{item.title}

</span>





</Link>


);


}