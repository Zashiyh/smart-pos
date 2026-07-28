import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



interface StatCardProps {

  title:string;

  value:number | string;

  icon:any;

  description:string;

}





export default function StatCard({

  title,
  value,
  icon:Icon,
  description,

}:StatCardProps){



return (

<Card className="rounded-2xl">



<CardHeader

className="
flex
flex-row
items-center
justify-between
"

>


<CardTitle className="text-sm">

{title}

</CardTitle>



<Icon

className="
h-5
w-5
text-muted-foreground
"

/>


</CardHeader>








<CardContent>



<p

className="
text-3xl
font-bold
"

>

{value}

</p>





<p

className="
mt-2
text-sm
text-muted-foreground
"

>

{description}

</p>




</CardContent>





</Card>


);


}