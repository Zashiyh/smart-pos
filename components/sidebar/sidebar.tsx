"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  Truck,
  ShoppingCart,
  BarChart3,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react";


const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Tag,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: Truck,
  },
  {
    title: "Sales",
    href: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];



export default function Sidebar() {

  const pathname = usePathname();



  return (

    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-72
        flex-col
        border-r
        bg-background/80
        backdrop-blur-xl
      "
    >


      {/* Logo */}

      <div
        className="
          flex
          h-20
          items-center
          border-b
          px-8
        "
      >

        <h1
          className="
            text-2xl
            font-black
            tracking-tight
          "
        >

          Smart

          <span className="text-primary">
            POS
          </span>

          Pro

        </h1>

      </div>





      {/* Menu */}

      <nav
        className="
          flex-1
          space-y-2
          overflow-y-auto
          px-4
          py-6
        "
      >

        {
          menuItems.map((item)=>{

            const Icon = item.icon;

            const active =
              pathname === item.href;



            return (

              <Link
                key={item.title}
                href={item.href}

                className={`

                  group

                  flex
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-sm
                  font-medium

                  transition-all
                  duration-300


                  ${
                    active

                    ? 
                    
                    `
                    bg-primary
                    text-primary-foreground
                    shadow-lg
                    shadow-primary/30
                    `

                    :

                    `
                    text-muted-foreground
                    hover:bg-muted
                    hover:text-foreground
                    `
                  }

                `}
              >


                <div
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg

                    ${
                      active

                      ?

                      "bg-white/20"

                      :

                      "bg-muted group-hover:bg-primary/10"

                    }

                  `}
                >

                  <Icon
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <span>
                  {item.title}
                </span>


              </Link>

            );

          })
        }


      </nav>





      {/* User Footer */}

      <div
        className="
          border-t
          p-4
        "
      >


        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            p-3
          "
        >

          <UserCircle
            className="
              h-10
              w-10
              text-primary
            "
          />


          <div
            className="
              flex-1
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


          <LogOut
            className="
              h-4
              w-4
              text-muted-foreground
            "
          />


        </div>



        <p
          className="
            mt-4
            text-center
            text-xs
            text-muted-foreground
          "
        >
          SmartPOS Pro v1.0
        </p>


      </div>


    </aside>

  );
}