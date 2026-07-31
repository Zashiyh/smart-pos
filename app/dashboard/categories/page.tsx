import AddCategoryDialog from "@/components/categories/add-category-dialog";
import CategoryTable from "@/components/categories/category-table";

interface Category {
  _id: string;
  name: string;
  description: string;
  status: string;
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "http://localhost:3000/api/categories",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log(
        "Category API Error:",
        response.status
      );
      return [];
    }

    const data = await response.json();

    console.log(
      "Categories:",
      data
    );

    if (!data.success) {
      return [];
    }

    return data.categories || [];
  } catch (error) {
    console.error(
      "GET CATEGORIES ERROR:",
      error
    );
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

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
            Categories
          </h1>
          <p
            className="
              text-blue-600/70
              dark:text-slate-400
              mt-1
            "
          >
            Manage product categories
          </p>
        </div>

        <AddCategoryDialog />
      </section>

      {/* Category Table */}
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
        <CategoryTable
          categories={categories}
        />
      </section>
    </main>
  );
}