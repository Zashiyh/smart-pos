import ProductTable from "@/components/products/product-table";
import ProductForm from "@/components/products/product-form";

export const dynamic = "force-dynamic";
interface Product {
  _id: string;
  name: string;
  barcode: string;
  sku: string;
  category: string;
  brand: string;
  supplier: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  status: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("PRODUCT API ERROR:", res.status);
      return [];
    }

    const data = await res.json();

    console.log("PRODUCT API:", data);

    return data.products || [];
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    return [];
  }
}
export default async function ProductsPage() {
  const products = await getProducts();

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
          Products
        </h1>
        <p
          className="
            text-blue-600/70
            dark:text-slate-400
            mt-1
          "
        >
          Manageeeee inventory products
        </p>
      </div>

      {/* ADD PRODUCT SECTION */}
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
        <div className="mb-4">
          <h2
            className="
              text-xl
              font-semibold
              text-blue-900
              dark:text-white
            "
          >
            Add Product
          </h2>
          <p
            className="
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Create new inventory product
          </p>
        </div>

        <ProductForm />
      </section>

      {/* PRODUCT TABLE */}
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
        <ProductTable products={products} />
      </section>
    </main>
  );
}