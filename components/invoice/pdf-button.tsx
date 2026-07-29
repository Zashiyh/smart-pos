"use client";

import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";



export default function PdfButton() {


  async function downloadPDF() {


    const invoice =
      document.getElementById("invoice");



    if (!invoice) {

      alert("Invoice section not found");

      return;

    }




    try {


      const canvas =
        await html2canvas(
          invoice,
          {


            scale: 2,


            useCORS: true,


            allowTaint: true,


            backgroundColor: "#ffffff",



            onclone: (document) => {



              const elements =
                document.querySelectorAll("*");



              elements.forEach(
                (element:any)=>{


                  // Remove unsupported colors

                  element.style.color =
                    "#000000";



                  element.style.backgroundColor =
                    "#ffffff";



                  element.style.borderColor =
                    "#dddddd";



                  element.style.boxShadow =
                    "none";



                  element.style.textShadow =
                    "none";



                }
              );







              // Fix Tailwind v4 colors

              const styles =
                document.querySelectorAll(
                  "style"
                );



              styles.forEach(
                (style:any)=>{


                  style.innerHTML =
                    style.innerHTML

                    .replace(
                      /oklch\([^)]+\)/g,
                      "#000000"
                    )

                    .replace(
                      /oklab\([^)]+\)/g,
                      "#000000"
                    )

                    .replace(
                      /lab\([^)]+\)/g,
                      "#000000"
                    );


                }
              );



            }



          }
        );







      const imgData =
        canvas.toDataURL(
          "image/png"
        );







      const pdf =
        new jsPDF({

          orientation:"portrait",

          unit:"mm",

          format:"a4",

        });







      const pdfWidth =
        pdf.internal.pageSize.getWidth();



      const pdfHeight =
        (
          canvas.height *
          pdfWidth
        )
        /
        canvas.width;







      pdf.addImage(

        imgData,

        "PNG",

        0,

        0,

        pdfWidth,

        pdfHeight

      );








      pdf.save(
        "SmartPOS-Invoice.pdf"
      );




    } catch(error) {


      console.error(
        "PDF Error:",
        error
      );


      alert(
        "PDF generation failed"
      );


    }


  }








  return (


    <Button

      onClick={downloadPDF}

      className="
      no-print
      rounded-xl
      "

    >


      <FileDown
        className="
        mr-2
        h-4
        w-4
        "
      />


      Download PDF



    </Button>


  );


}