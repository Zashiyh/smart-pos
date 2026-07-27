"use client";

import {
  Search,
  Bell,
  UserCircle,
  ChevronDown,
} from "lucide-react";

import ThemeToggle from "../theme-toggle";


export default function Navbar() {


  return (

    <header
      className="
        fixed
        right-0
        top-0
        z-50
        flex
        h-20
        items-center
        justify-between
        border-b
        bg-background/80
        px-6
        backdrop-blur-xl
        lg:left-72
      "
    >



      {/* Search */}

      <div
        className="
          flex
          h-11
          w-full
          max-w-lg
          items-center
          gap-3
          rounded-2xl
          border
          bg-muted/30
          px-4
        "
      >

        <Search
          className="
            h-5
            w-5
            text-muted-foreground
          "
        />


        <input
          type="text"
          placeholder="Search products, sales..."
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
          "
        />

      </div>





      {/* Actions */}

      <div
        className="
          ml-4
          flex
          items-center
          gap-3
        "
      >



        {/* Theme Toggle */}

        <ThemeToggle />





        {/* Notification */}

        <button
          type="button"
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            hover:bg-muted
          "
        >

          <Bell className="h-5 w-5" />


          <span
            className="
              absolute
              right-2
              top-2
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
              ring-2
              ring-background
            "
          />

        </button>






        {/* Profile */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-3
            py-2
            hover:bg-muted
          "
        >

          <UserCircle
            className="
              h-7
              w-7
              text-primary
            "
          />


          <div
            className="
              hidden
              md:block
            "
          >

            <p
              className="
                text-sm
                font-semibold
              "
            >
              Admin
            </p>


            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              Administrator
            </p>

          </div>


          <ChevronDown
            className="
              hidden
              h-4
              w-4
              md:block
            "
          />


        </div>



      </div>



    </header>

  );
}