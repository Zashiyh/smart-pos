"use client";

import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  Truck,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react";

import SidebarItem from "./sidebar-item";
import UserMenu from "./user-menu";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: Tag,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    title: "Sales",
    href: "/dashboard/sales",
    icon: ShoppingCart,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
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
        bg-white/80
        dark:bg-slate-900/80
        backdrop-blur-xl
        transition-colors
        duration-300
        border-blue-100/50
        dark:border-blue-900/30
      "
    >
      {/* LOGO */}
      <div
        className="
          flex
          h-20
          items-center
          border-b
          px-8
          border-blue-100/50
          dark:border-blue-900/30
        "
      >
        <h1
          className="
            text-2xl
            font-black
            tracking-tight
            text-blue-900
            dark:text-white
          "
        >
          Smart
          <span className="text-blue-500 dark:text-blue-400">
            POS
          </span>
          Pro
        </h1>
      </div>

      {/* NAVIGATION */}
      <nav
        className="
          flex-1
          space-y-2
          overflow-y-auto
          px-4
          py-6
        "
      >
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
          />
        ))}
      </nav>

      {/* USER */}
      <UserMenu />
    </aside>
  );
}