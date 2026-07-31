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
      space-y-6
      rounded-3xl
      bg-muted/30
      p-6
      "
    >
      <section
        className="
        flex
        items-center
        justify-between
        "
      >
        <div>
          <h1 className="text-3xl font-bold">
            Suppliers
          </h1>

          <p className="text-muted-foreground">
            Manage all suppliers
          </p>
        </div>

        <AddSupplierDialog />
      </section>

      <SupplierTable
        suppliers={suppliers}
      />
    </main>
  );
}