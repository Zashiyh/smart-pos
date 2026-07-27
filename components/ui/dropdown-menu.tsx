"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"



function DropdownMenu({
  ...props
}: MenuPrimitive.Root.Props) {

  return (
    <MenuPrimitive.Root
      data-slot="dropdown-menu"
      {...props}
    />
  )
}



function DropdownMenuPortal({
  ...props
}: MenuPrimitive.Portal.Props) {

  return (
    <MenuPrimitive.Portal
      data-slot="dropdown-menu-portal"
      {...props}
    />
  )
}



function DropdownMenuTrigger({
  ...props
}: MenuPrimitive.Trigger.Props) {

  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}





function DropdownMenuContent({

  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props

}: MenuPrimitive.Popup.Props &
Pick<
MenuPrimitive.Positioner.Props,
"align" |
"alignOffset" |
"side" |
"sideOffset"
>) {


  return (

    <MenuPrimitive.Portal>


      <MenuPrimitive.Positioner

        className="
          isolate
          z-[9999]
          outline-none
        "

        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}

      >


        <MenuPrimitive.Popup

          data-slot="dropdown-menu-content"

          className={cn(

            `
            z-[9999]
            min-w-32
            overflow-hidden
            rounded-xl
            border
            bg-popover
            p-1
            text-popover-foreground
            shadow-xl
            ring-1
            ring-foreground/10

            animate-in
            fade-in-0
            zoom-in-95

            data-[side=bottom]:slide-in-from-top-2
            data-[side=top]:slide-in-from-bottom-2

            `,

            className

          )}

          {...props}

        />


      </MenuPrimitive.Positioner>


    </MenuPrimitive.Portal>

  )
}







function DropdownMenuItem({

  className,
  inset,
  ...props

}: MenuPrimitive.Item.Props & {

  inset?: boolean

}) {


  return (

    <MenuPrimitive.Item

      data-slot="dropdown-menu-item"

      data-inset={inset}

      className={cn(

        `
        flex
        cursor-default
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        outline-none
        select-none

        hover:bg-accent
        hover:text-accent-foreground

        data-disabled:pointer-events-none
        data-disabled:opacity-50

        `,

        className

      )}

      {...props}

    />

  )
}







function DropdownMenuSub({
  ...props
}: MenuPrimitive.SubmenuRoot.Props) {


  return (

    <MenuPrimitive.SubmenuRoot

      data-slot="dropdown-menu-sub"

      {...props}

    />

  )

}







function DropdownMenuSubTrigger({

  className,
  children,
  ...props

}: MenuPrimitive.SubmenuTrigger.Props) {


  return (

    <MenuPrimitive.SubmenuTrigger

      data-slot="dropdown-menu-sub-trigger"

      className={cn(

        `
        flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        hover:bg-accent
        `,

        className

      )}

      {...props}

    >

      {children}

      <ChevronRightIcon className="ml-auto h-4 w-4"/>


    </MenuPrimitive.SubmenuTrigger>

  )

}







function DropdownMenuSeparator({

  className,
  ...props

}: MenuPrimitive.Separator.Props) {


  return (

    <MenuPrimitive.Separator

      data-slot="dropdown-menu-separator"

      className={cn(
        "my-1 h-px bg-border",
        className
      )}

      {...props}

    />

  )

}







function DropdownMenuCheckboxItem({

  className,
  children,
  checked,
  ...props

}: MenuPrimitive.CheckboxItem.Props) {


  return (

    <MenuPrimitive.CheckboxItem

      data-slot="dropdown-menu-checkbox-item"

      checked={checked}

      className={cn(

        `
        flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        hover:bg-accent
        `,

        className

      )}

      {...props}

    >

      <CheckIcon className="h-4 w-4"/>

      {children}


    </MenuPrimitive.CheckboxItem>

  )

}







function DropdownMenuRadioGroup({
  ...props
}: MenuPrimitive.RadioGroup.Props) {


  return (

    <MenuPrimitive.RadioGroup

      data-slot="dropdown-menu-radio-group"

      {...props}

    />

  )

}






function DropdownMenuRadioItem({

  className,
  children,
  ...props

}: MenuPrimitive.RadioItem.Props) {


  return (

    <MenuPrimitive.RadioItem

      data-slot="dropdown-menu-radio-item"

      className={cn(

        `
        flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        hover:bg-accent
        `,

        className

      )}

      {...props}

    >

      <CheckIcon className="h-4 w-4"/>

      {children}


    </MenuPrimitive.RadioItem>

  )

}







function DropdownMenuGroup({
  ...props
}: MenuPrimitive.Group.Props) {


  return (

    <MenuPrimitive.Group

      data-slot="dropdown-menu-group"

      {...props}

    />

  )

}






function DropdownMenuLabel({
  className,
  ...props
}: MenuPrimitive.GroupLabel.Props) {


  return (

    <MenuPrimitive.GroupLabel

      data-slot="dropdown-menu-label"

      className={cn(
        "px-3 py-2 text-xs font-medium text-muted-foreground",
        className
      )}

      {...props}

    />

  )

}






function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {


  return (

    <span

      data-slot="dropdown-menu-shortcut"

      className={cn(
        "ml-auto text-xs text-muted-foreground",
        className
      )}

      {...props}

    />

  )

}






export {

  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuShortcut,

}