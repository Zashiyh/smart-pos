"use client";

import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">

      {/* Sidebar */}

      <Sidebar />


      {/* Main Area */}

      <div className="lg:pl-72">

        {/* Navbar */}

        <Navbar />


        {/* Page Content */}

        <main className="pt-20 px-6 lg:px-8">

          {children}

        </main>


      </div>

    </div>
  );
}