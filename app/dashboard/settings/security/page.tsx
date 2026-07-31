"use client";

import { useState } from "react";

import { LockKeyhole } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";



export default function SecuritySettings(){


const [currentPassword,setCurrentPassword] =
useState("");


const [newPassword,setNewPassword] =
useState("");


const [confirmPassword,setConfirmPassword] =
useState("");



const [loading,setLoading] =
useState(false);







async function changePassword(){


if(
!currentPassword ||
!newPassword ||
!confirmPassword
){

alert(
"Please fill all fields"
);

return;

}




if(newPassword !== confirmPassword){


alert(
"New passwords do not match"
);


return;


}





if(newPassword.length < 6){


alert(
"Password must be at least 6 characters"
);


return;


}





try{


setLoading(true);



const response =
await fetch(

"/api/auth/change-password",

{

method:"PUT",

headers:{

"Content-Type":"application/json",

},


body:JSON.stringify({

currentPassword,

newPassword,

}),


}

);





const data =
await response.json();





alert(data.message);






if(data.success){


setCurrentPassword("");

setNewPassword("");

setConfirmPassword("");


}




}catch(error){


console.log(
"Password change error:",
error
);



alert(
"Something went wrong"
);



}finally{


setLoading(false);


}


}









return (



<Card className="rounded-2xl">



<CardHeader>


<div className="flex items-center gap-3">


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


<LockKeyhole

className="
h-6
w-6
text-primary
"

/>


</div>





<div>


<CardTitle>

Change Password

</CardTitle>



<p

className="
text-sm
text-muted-foreground
"

>

Update your account password

</p>


</div>


</div>


</CardHeader>









<CardContent className="space-y-4">






<input


type="password"


placeholder="Current Password"


value={currentPassword}


onChange={(e)=>
setCurrentPassword(e.target.value)
}


className="
h-11
w-full
rounded-xl
border
bg-background
px-4
outline-none
"

/>









<input


type="password"


placeholder="New Password"


value={newPassword}


onChange={(e)=>
setNewPassword(e.target.value)
}


className="
h-11
w-full
rounded-xl
border
bg-background
px-4
outline-none
"

/>









<input


type="password"


placeholder="Confirm New Password"


value={confirmPassword}


onChange={(e)=>
setConfirmPassword(e.target.value)
}


className="
h-11
w-full
rounded-xl
border
bg-background
px-4
outline-none
"

/>









<Button


onClick={changePassword}


disabled={loading}


className="
rounded-xl
"


>


{

loading

?

"Changing..."

:

"Change Password"

}


</Button>






</CardContent>




</Card>


);


}