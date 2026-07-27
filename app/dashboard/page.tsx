import StatsCard from "@/components/dashboard/stats-card";
import SalesOverview from "@/components/dashboard/sales-overview";
import RecentSales from "@/components/dashboard/recent-sales";
import LowStock from "@/components/dashboard/low-stock";
import TopProducts from "@/components/dashboard/top-products";
import FadeIn from "@/components/animations/fade-in";


export default function DashboardPage() {


  const stats = [
    {
      title: "Today's Sales",
      value: "£12,450",
      icon: "sales",
      description: "+12% from yesterday",
    },
    {
      title: "Today's Orders",
      value: "248",
      icon: "orders",
      description: "+8% from yesterday",
    },
    {
      title: "Monthly Revenue",
      value: "£86,200",
      icon: "revenue",
      description: "This month's income",
    },
    {
      title: "Total Profit",
      value: "£32,500",
      icon: "profit",
      description: "After expenses",
    },
  ];



  return (

    <div
      className="
        min-h-screen
        space-y-8
        rounded-3xl
        bg-muted/30
        p-6
      "
    >


      {/* Header */}

      <FadeIn>

        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Dashboard
          </h1>


          <p
            className="
              text-muted-foreground
            "
          >
            Welcome back to SmartPOS Pro
          </p>


        </div>

      </FadeIn>





      {/* Stats Cards */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {stats.map((item, index) => (

          <FadeIn
            key={item.title}
            delay={index * 0.1}
          >

            <StatsCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              description={item.description}
            />

          </FadeIn>

        ))}

      </div>





      {/* Sales Overview */}

      <FadeIn delay={0.4}>

        <SalesOverview />

      </FadeIn>






      {/* Recent Sales + Low Stock */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >

        <FadeIn delay={0.5}>

          <RecentSales />

        </FadeIn>



        <FadeIn delay={0.6}>

          <LowStock />

        </FadeIn>


      </div>






      {/* Top Products */}

      <FadeIn delay={0.7}>

        <TopProducts />

      </FadeIn>



    </div>

  );
}