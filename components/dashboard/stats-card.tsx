"use client";

import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Wallet,
  ArrowUpRight,
} from "lucide-react";


interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  description: string;
}


const icons = {
  sales: DollarSign,
  orders: ShoppingCart,
  revenue: TrendingUp,
  profit: Wallet,
};


const iconStyles = {
  sales: "bg-emerald-500/10 text-emerald-500",
  orders: "bg-blue-500/10 text-blue-500",
  revenue: "bg-purple-500/10 text-purple-500",
  profit: "bg-orange-500/10 text-orange-500",
};



export default function StatsCard({
  title,
  value,
  icon,
  description,
}: StatsCardProps) {


  const Icon =
    icons[icon as keyof typeof icons];


  const iconStyle =
    iconStyles[icon as keyof typeof iconStyles];



  return (

    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-card
        p-6
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl
      "
    >


      {/* Glow Effect */}

      <div
        className="
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-primary/10
          blur-2xl
          transition
          group-hover:bg-primary/20
        "
      />




      {/* Header */}

      <div
        className="
          relative
          flex
          items-center
          justify-between
        "
      >


        <p
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >
          {title}
        </p>



        {Icon && (

          <div
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl

              ${iconStyle}
            `}
          >

            <Icon
              className="
                h-5
                w-5
              "
            />

          </div>

        )}


      </div>





      {/* Value */}

      <div
        className="
          relative
          mt-5
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          {value}
        </h2>



        <div
          className="
            mt-3
            flex
            items-center
            gap-1
            text-xs
            text-emerald-500
          "
        >

          <ArrowUpRight
            className="
              h-4
              w-4
            "
          />

          <span>
            {description}
          </span>


        </div>


      </div>




    </div>

  );
}