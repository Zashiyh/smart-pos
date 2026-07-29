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

      <div className="no-print">

        <Sidebar />

      </div>



      {/* Main Content */}

      <div className="lg:pl-72">


        {/* Navbar */}

        <div className="no-print">

          <Navbar />

        </div>



        <main
          className="
            pt-20
            px-6
            lg:px-8
          "
        >

          {children}

        </main>


      </div>


    </div>

  );
}