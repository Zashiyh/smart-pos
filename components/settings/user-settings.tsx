import {
  UserRound,
} from "lucide-react";


export default function UsersSettingsPage(){


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
User & Roles
</h1>


<p className="text-muted-foreground">
Manage employees and permissions
</p>




<div

className="
rounded-2xl
border
bg-background
p-6
"

>


<div className="flex items-center gap-3">

<UserRound className="text-primary"/>

<h2 className="font-semibold">
Employees
</h2>


</div>



<p className="mt-4 text-muted-foreground">

Admin, Manager and Cashier roles will appear here.

</p>


</div>



</main>

);


}