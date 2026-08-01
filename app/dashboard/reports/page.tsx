import StatsCard from "@/components/dashboard/stats-card";
import RevenueChart from "@/components/dashboard/revenue-chart";
import SalesChart from "@/components/dashboard/sales-chart";
import TopProducts from "@/components/dashboard/top-products";
import RecentSales from "@/components/dashboard/recent-sales";
import LowStock from "@/components/dashboard/low-stock";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;  

import {
  Wallet,
  ShoppingCart,
  Package,
  TrendingUp,
  BarChart3,
  Calendar,
} from "lucide-react";
export const dynamic = "force-dynamic";

// GET REPORT STATS


async function getReports() {
  try {

    const res = await fetch(
      `${API_URL}/api/dashboard/stats`,
      {
        cache: "no-store",
      }
    );


    if (!res.ok) {
      console.log("REPORT STATS STATUS:", res.status);
      return null;
    }


    const data = await res.json();


    if (data.success) {
      return data.stats;
    }


    return null;


  } catch (error) {

    console.log(
      "Reports stats error:",
      error
    );

    return null;

  }
}


// GET PRODUCTS


async function getProducts() {

  try {

    const res = await fetch(
      `${API_URL}/api/products`,
      {
        cache: "no-store",
      }
    );


    if (!res.ok) {
      console.log(
        "PRODUCT API STATUS:",
        res.status
      );

      return [];
    }


    const data = await res.json();


    console.log(
      "REPORT PRODUCTS:",
      data.products
    );


    if (data.success) {

      return data.products || [];

    }


    return [];


  } catch(error) {

    console.log(
      "Products fetch error:",
      error
    );

    return [];

  }

}


// REPORT PAGE


export default async function ReportsPage() {
  const [statsData, products] = await Promise.all([
    getReports(),
    getProducts()
  ]);

  const cards = [
    {
      title: "Today's Revenue",
      value: `LKR ${(statsData?.todayRevenue ?? 0).toLocaleString("en-LK")}`,
      icon: Wallet,
      description: "Revenue today",
      trend: "+12.5%",
      trendUp: true,
      color: "from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500",
    },
    {
      title: "Today's Orders",
      value: String(statsData?.todayOrders ?? 0),
      icon: ShoppingCart,
      description: "Orders completed",
      trend: "+8.3%",
      trendUp: true,
      color: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
    },
    {
      title: "Total Products",
      value: String(statsData?.totalProducts ?? 0),
      icon: Package,
      description: "Inventory items",
      trend: "+2.1%",
      trendUp: true,
      color: "from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500",
    },
    {
      title: "Low Stock",
      value: String(statsData?.lowStockProducts ?? 0),
      icon: TrendingUp,
      description: "Need restock",
      trend: "-5.0%",
      trendUp: false,
      color: "from-red-500 to-red-600 dark:from-red-400 dark:to-red-500",
    }
  ];

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-50/50
        via-white
        to-blue-100/30
        dark:from-slate-900
        dark:via-slate-800
        dark:to-blue-950/50
        p-6
        space-y-8
        transition-colors
        duration-300
      "
    >
      {/* Header */}
      <div>
        <h1
          className="
            text-4xl
            font-bold
            bg-gradient-to-r
            from-blue-600
            to-blue-800
            dark:from-white
            dark:to-blue-200
            bg-clip-text
            text-transparent
          "
        >
          Reports
        </h1>
        <p
          className="
            text-blue-600/70
            dark:text-slate-400
            mt-1
            flex
            items-center
            gap-2
          "
        >
          <Calendar className="w-4 h-4" />
          Business reports and analytics for {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {cards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            description={card.description}
            trend={card.trend}
            trendUp={card.trendUp}
            color={card.color}
          />
        ))}
      </div>

      {/* Charts */}
      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <RevenueChart />
        <SalesChart />
      </div>

      {/* Recent Sales & Low Stock */}
      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <RecentSales />
        <LowStock products={products} />
      </div>

      {/* Top Products */}
      <TopProducts />
    </main>
  );
}