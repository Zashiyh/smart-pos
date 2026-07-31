import StoreSettings from "@/components/settings/store-settings";


export default function StorePage(){

  return (

    <main
      className="
      min-h-screen
      rounded-3xl
      bg-muted/30
      p-6
      space-y-6
      "
    >

      <h1 className="text-3xl font-bold">
        Store Settings
      </h1>


      <StoreSettings />


    </main>

  );

}