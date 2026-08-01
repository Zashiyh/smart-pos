import CustomerForm from "@/components/customers/customer-form";
import CustomerTable from "@/components/customers/customer-table";

export const dynamic = "force-dynamic";

export default function CustomersPage() {
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
      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
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
            Customers
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
            👥 Manage customer information and purchase history
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="
            rounded-xl
            bg-gradient-to-r
            from-blue-500
            to-blue-600
            dark:from-blue-600
            dark:to-blue-700
            text-white
            px-4
            py-2.5
            text-sm
            font-medium
            hover:shadow-lg
            hover:shadow-blue-500/30
            dark:hover:shadow-blue-600/20
            transition-all
            duration-300
            flex
            items-center
            gap-2
          "
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* ADD CUSTOMER */}
      <section
        className="
          rounded-2xl
          border-0
          p-6
          bg-white
          dark:bg-slate-800/90
          border-blue-100/50
          dark:border-blue-900/30
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          backdrop-blur-sm
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            text-blue-900
            dark:text-white
            mb-4
            flex
            items-center
            gap-2
          "
        >
          <span className="text-2xl">➕</span>
          Add Customer
        </h2>

        <CustomerForm />
      </section>

      {/* CUSTOMER TABLE */}
      <section
        className="
          rounded-2xl
          border-0
          p-6
          bg-white
          dark:bg-slate-800/90
          border-blue-100/50
          dark:border-blue-900/30
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          backdrop-blur-sm
        "
      >
        <CustomerTable />
      </section>
    </main>
  );
}