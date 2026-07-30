"use client"

import * as React from "react"

import {
  Dialog as DialogPrimitive,
} from "@base-ui/react/dialog"

import {
  cn,
} from "@/lib/utils"

import {
  Button,
} from "@/components/ui/button"

import {
  XIcon,
} from "lucide-react"





function Dialog({
  ...props
}: DialogPrimitive.Root.Props) {

  return (

    <DialogPrimitive.Root

      data-slot="dialog"

      {...props}

    />

  )

}







function DialogTrigger({

  children,

  ...props

}: DialogPrimitive.Trigger.Props) {


  return (

    <DialogPrimitive.Trigger

      data-slot="dialog-trigger"

      {...props}

    >

      {children}

    </DialogPrimitive.Trigger>

  )


}







function DialogPortal({

  ...props

}: DialogPrimitive.Portal.Props) {


  return (

    <DialogPrimitive.Portal

      data-slot="dialog-portal"

      {...props}

    />

  )

}







function DialogClose({

  ...props

}: DialogPrimitive.Close.Props) {


  return (

    <DialogPrimitive.Close

      data-slot="dialog-close"

      {...props}

    />

  )

}








function DialogOverlay({

  className,

  ...props

}: DialogPrimitive.Backdrop.Props) {


  return (

    <DialogPrimitive.Backdrop


      data-slot="dialog-overlay"


      className={cn(


        `
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm

        data-open:animate-in
        data-open:fade-in-0

        data-closed:animate-out
        data-closed:fade-out-0
        `,


        className


      )}


      {...props}


    />

  )


}









function DialogContent({

  className,

  children,

  showCloseButton = true,

  ...props


}: DialogPrimitive.Popup.Props & {

  showCloseButton?: boolean

}) {



  return (


    <DialogPortal>


      <DialogOverlay />





      <DialogPrimitive.Popup


        data-slot="dialog-content"


        className={cn(


          `
          fixed
          left-[50%]
          top-[50%]

          z-50

          w-full
          max-w-lg

          translate-x-[-50%]
          translate-y-[-50%]

          rounded-2xl

          border

          bg-background

          p-6

          shadow-xl

          outline-none

          data-open:animate-in
          data-open:zoom-in-95

          data-closed:animate-out
          data-closed:zoom-out-95
          `,


          className


        )}


        {...props}


      >



        {children}





        {


          showCloseButton && (


            <DialogPrimitive.Close


              data-slot="dialog-close"


              render={


                <Button

                  variant="ghost"

                  size="icon-sm"

                  className="
                  absolute
                  right-3
                  top-3
                  "

                />


              }


            >



              <XIcon

                className="
                h-4
                w-4
                "

              />



              <span className="sr-only">

                Close

              </span>




            </DialogPrimitive.Close>


          )

        }




      </DialogPrimitive.Popup>



    </DialogPortal>


  )


}









function DialogHeader({

  className,

  ...props

}: React.ComponentProps<"div">) {



  return (


    <div


      data-slot="dialog-header"


      className={cn(

        `
        flex
        flex-col
        gap-2
        `,

        className

      )}


      {...props}


    />


  )


}









function DialogFooter({

  className,

  children,

  ...props

}: React.ComponentProps<"div">) {



  return (


    <div


      data-slot="dialog-footer"


      className={cn(

        `
        flex
        justify-end
        gap-2
        pt-4
        `,

        className

      )}


      {...props}


    >


      {children}


    </div>


  )


}








function DialogTitle({

  className,

  ...props

}: DialogPrimitive.Title.Props) {


  return (


    <DialogPrimitive.Title


      data-slot="dialog-title"


      className={cn(

        `
        text-lg
        font-semibold
        `,

        className

      )}


      {...props}


    />


  )


}









function DialogDescription({

  className,

  ...props

}: DialogPrimitive.Description.Props) {


  return (


    <DialogPrimitive.Description


      data-slot="dialog-description"


      className={cn(

        `
        text-sm
        text-muted-foreground
        `,

        className

      )}


      {...props}


    />


  )


}






export {

  Dialog,

  DialogClose,

  DialogContent,

  DialogDescription,

  DialogFooter,

  DialogHeader,

  DialogOverlay,

  DialogPortal,

  DialogTitle,

  DialogTrigger,

}