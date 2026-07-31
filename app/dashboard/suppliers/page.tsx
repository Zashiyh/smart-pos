import AddSupplierDialog from "@/components/suppliers/add-supplier-dialog";
import SupplierTable from "@/components/suppliers/supplier-table";

interface Supplier {
  _id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  paymentTerms: string;
  status: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3000";

async function getSuppliers(): Promise<Supplier[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/suppliers`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!data.success) {
      return [];
    }

    return data.suppliers ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

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
      <section
        className="
          flex
          items-center
          justify-between
          flex-wrap
          gap-4
        "
      >
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
            Suppliers
          </h1>
          <p
            className="
              text-blue-600/70
              dark:text-slate-400
              mt-1
            "
          >
            Manage all suppliers
          </p>
        </div>

        <AddSupplierDialog />
      </section>

      {/* Supplier Table */}
      <section
        className="
          rounded-2xl
          border
          p-6
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          border-blue-100/50
          dark:border-blue-900/30
          bg-white
          dark:bg-slate-800/90
          backdrop-blur-sm
        "
      >
        <SupplierTable
          suppliers={suppliers}
        />
      </section>
    </main>
  );
}