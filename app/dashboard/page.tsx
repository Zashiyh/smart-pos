// app/dashboard/page.tsx
import StatsCard from "@/components/dashboard/stats-card";
import SalesOverview from "@/components/dashboard/sales-overview";
import RecentSales from "@/components/dashboard/recent-sales";
import LowStock from "@/components/dashboard/low-stock";
import TopProducts from "@/components/dashboard/top-products";
import FadeIn from "@/components/animations/fade-in";

import {
  Package,
  Boxes,
  AlertTriangle,
  Wallet,
  TrendingUp,
  ShoppingBag,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3000";

// =================================
// GET PRODUCTS
// =================================

async function getProducts() {
  try {
    const res = await fetch(
      `${API_URL}/api/products`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (data.success) {
      return data.products;
    }

    return [];
  } catch (error) {
    console.log(
      "Dashboard product error:",
      error
    );
    return [];
  }
}

async function getStats() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/dashboard/stats",
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (data.success) {
      return data.stats;
    }

    return null;
  } catch (error) {
    console.log(
      "Dashboard stats error:",
      error
    );
    return null;
  }
}

// =================================
// DASHBOARD PAGE
// =================================

export default async function DashboardPage() {
  const [products, statsData] = await Promise.all([
    getProducts(),
    getStats(),
  ]);

  const stats = [
    {
      title: "Total Products",
      value: statsData?.totalProducts ?? 0,
      icon: Package,
      description: "Products in inventory",
      trend: "+12%",
      trendUp: true,
      color: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Today's Revenue",
      value: `LKR ${(statsData?.todayRevenue ?? 0).toLocaleString(
        "en-LK"
      )}`,
      icon: Wallet,
      description: "Today's sales",
      trend: "+8.2%",
      trendUp: true,
      color: "from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Today's Orders",
      value: statsData?.todayOrders ?? 0,
      icon: Boxes,
      description: "Completed orders",
      trend: "+23%",
      trendUp: true,
      color: "from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Low Stock Items",
      value: statsData?.lowStockProducts ?? 0,
      icon: AlertTriangle,
      description: "Need restocking",
      trend: "-5%",
      trendUp: false,
      color: "from-red-500 to-red-600 dark:from-red-400 dark:to-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 p-6 space-y-8 transition-colors duration-300">
      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <FadeIn>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground dark:text-slate-400 mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              SmartPOS overview and analytics for {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-3">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20 transition-all flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </FadeIn>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <FadeIn
            key={item.title}
            delay={index * 0.1}
          >
            <div className="group relative overflow-hidden bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-slate-900/30 dark:hover:shadow-slate-900/50 transition-all duration-300 border border-gray-100/50 dark:border-slate-700/50 backdrop-blur-sm">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 dark:opacity-10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">
                      {item.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-slate-700">
                  {item.trendUp ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${item.trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {item.trend}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-slate-500">vs last week</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* SALES OVERVIEW */}
      <FadeIn delay={0.4}>
        <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-gray-100/50 dark:border-slate-700/50 p-6 hover:shadow-lg dark:hover:shadow-slate-900/30 transition-shadow duration-300 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">Weekly sales performance</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                Week
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                Month
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                Year
              </button>
            </div>
          </div>
          <SalesOverview />
        </div>
      </FadeIn>

      {/* RECENT SALES + LOW STOCK */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.5}>
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-gray-100/50 dark:border-slate-700/50 p-6 hover:shadow-lg dark:hover:shadow-slate-900/30 transition-shadow duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sales</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">Latest transactions</p>
              </div>
              <ShoppingBag className="w-5 h-5 text-gray-400 dark:text-slate-500" />
            </div>
            <RecentSales />
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-gray-100/50 dark:border-slate-700/50 p-6 hover:shadow-lg dark:hover:shadow-slate-900/30 transition-shadow duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Alert</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">Items needing restock</p>
              </div>
              <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
              </div>
            </div>
            <LowStock products={products} />
          </div>
        </FadeIn>
      </div>

      {/* TOP PRODUCTS */}
      <FadeIn delay={0.7}>
        <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-gray-100/50 dark:border-slate-700/50 p-6 hover:shadow-lg dark:hover:shadow-slate-900/30 transition-shadow duration-300 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">Best selling items this month</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400 dark:text-slate-500" />
              <span className="text-sm text-gray-500 dark:text-slate-400">128 customers</span>
            </div>
          </div>
          <TopProducts />
        </div>
      </FadeIn>
    </div>
  );
}