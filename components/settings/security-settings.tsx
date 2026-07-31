import {
  ShieldCheck,
} from "lucide-react";


export default function SecuritySettingsPage(){


return (

<main

className="
min-h-screen
space-y-6
rounded-3xl
bg-muted/30
p-6
"

>


<h1 className="text-3xl font-bold">
Security
</h1>


<p className="text-muted-foreground">
Manage account security settings
</p>





<div

className="
rounded-2xl
border
bg-background
p-6
"

>


<div className="flex gap-3 items-center">

<ShieldCheck className="text-primary"/>

<h2 className="font-semibold">
Security Options
</h2>


</div>




<ul className="mt-5 space-y-3 text-sm">

<li>
• Change Password
</li>

<li>
• Two Factor Authentication
</li>

<li>
• Active Sessions
</li>


</ul>



</div>



</main>


);


}