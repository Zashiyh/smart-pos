import {
  Database,
  Server,
  Info,
  ShieldCheck,
} from "lucide-react";


export default function SystemPage(){


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


<div>

<h1 className="text-3xl font-bold">
System Settings
</h1>


<p className="text-muted-foreground">
Backup, database and application information
</p>


</div>







<div

className="
grid
gap-6
md:grid-cols-2
"

>



<div

className="
rounded-2xl
border
bg-background
p-6
"

>


<div className="flex items-center gap-3">


<div

className="
rounded-xl
bg-primary/10
p-3
"

>

<Database
className="h-6 w-6 text-primary"
/>

</div>


<div>

<h2 className="font-semibold">
Database
</h2>


<p className="text-sm text-muted-foreground">
MongoDB Atlas connection status
</p>


</div>


</div>


<div className="mt-5 rounded-xl bg-green-500/10 p-4 text-sm text-green-600">

Database Connected ✓

</div>


</div>









<div

className="
rounded-2xl
border
bg-background
p-6
"

>


<div className="flex items-center gap-3">


<div

className="
rounded-xl
bg-primary/10
p-3
"

>

<Server
className="h-6 w-6 text-primary"
/>

</div>


<div>

<h2 className="font-semibold">
Application
</h2>


<p className="text-sm text-muted-foreground">
SmartPOS Pro information
</p>


</div>


</div>




<div className="mt-5 space-y-2 text-sm">


<p>
Version: 1.0.0
</p>


<p>
Framework: Next.js 15
</p>


<p>
Database: MongoDB
</p>


</div>



</div>









<div

className="
rounded-2xl
border
bg-background
p-6
"

>


<div className="flex items-center gap-3">


<ShieldCheck className="text-primary"/>


<h2 className="font-semibold">
Backup & Security
</h2>


</div>



<p className="mt-4 text-sm text-muted-foreground">

Automatic backup and security controls will be available here.

</p>



</div>





<div

className="
rounded-2xl
border
bg-background
p-6
"

>


<div className="flex items-center gap-3">


<Info className="text-primary"/>


<h2 className="font-semibold">
System Information
</h2>


</div>



<p className="mt-4 text-sm text-muted-foreground">

SmartPOS Pro Point of Sale Management System

</p>



</div>





</div>





</main>


);


}