const INTERVAL = 60 * 1000;


async function generateSale(){

  try{

    const response = await fetch(
      "http://localhost:3000/api/cron/sales"
    );


    const data = await response.json();


    console.log(
      "AUTO SALE:",
      data.message
    );


  }catch(error){

    console.log(
      "AUTO SALE ERROR:",
      error
    );

  }

}





console.log(
  "Auto sales started..."
);



generateSale();



setInterval(
  generateSale,
  INTERVAL
);