"use client";

import {
  Search,
  Bell,
  UserCircle,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ThemeToggle from "../theme-toggle";


export default function Navbar() {


  const router = useRouter();

  const [open, setOpen] = useState(false);



  async function logout() {

    await fetch(
      "/api/auth/logout",
      {
        method: "POST",
      }
    );


    router.push("/login");

    router.refresh();

  }



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

          <Bell
            className="
              h-5
              w-5
            "
          />


          <span
            className="
              absolute
              right-2
              top-2
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
          />

        </button>









        {/* Profile Dropdown */}


        <div
          className="
            relative
          "
        >



          <button
            type="button"
            onClick={() => setOpen(!open)}
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
                text-left
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
                h-4
                w-4
              "
            />



          </button>









          {open && (


            <div
              className="
                absolute
                right-0
                mt-3
                w-64
                rounded-2xl
                border
                bg-background
                p-3
                shadow-xl
              "
            >





              {/* User Info */}


              <div
                className="
                  mb-3
                  border-b
                  pb-3
                "
              >

                <p
                  className="
                    font-semibold
                  "
                >
                  Sashika Madushan
                </p>



                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >
                  admin@smartpos.com
                </p>


              </div>









              {/* Profile Button */}


              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  p-3
                  hover:bg-muted
                "
              >

                <User
                  className="
                    h-5
                    w-5
                  "
                />

                Profile


              </button>








              {/* Divider */}


              <div
                className="
                  my-2
                  border-t
                "
              />








              {/* Logout */}


              <button
                type="button"
                onClick={logout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  p-3
                  text-red-500
                  hover:bg-red-500/10
                "
              >

                <LogOut
                  className="
                    h-5
                    w-5
                  "
                />

                Logout


              </button>






            </div>


          )}



        </div>



      </div>



    </header>

  );

}