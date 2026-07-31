import {
  Palette,
} from "lucide-react";



export default function AppearanceSettingsPage(){


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
Appearance
</h1>


<p className="text-muted-foreground">
Customize application interface
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

<Palette className="text-primary"/>

<h2 className="font-semibold">
Theme Settings
</h2>


</div>





<div className="mt-5 space-y-3">


<button className="rounded-xl border px-5 py-3">
Light Mode
</button>


<button className="rounded-xl border px-5 py-3">
Dark Mode
</button>


<button className="rounded-xl border px-5 py-3">
System Default
</button>



</div>



</div>



</main>


);


}