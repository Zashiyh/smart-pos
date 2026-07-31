"use client";

import {
  useState,
} from "react";

import {
  Trash2,
  RefreshCw,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import EditCategoryDialog from "./edit-category-dialog";

interface Category {
  _id: string;
  name: string;
  description?: string;
  status: string;
}

interface CategoryTableProps {
  categories: Category[];
}

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  const [categoryList, setCategoryList] =
    useState<Category[]>(categories);

  const [loading, setLoading] =
    useState(false);

  async function refreshCategories() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/categories",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (data.success) {
        setCategoryList(
          data.categories
        );
      }
    } catch (error) {
      console.log(
        "Refresh error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setCategoryList(
          (prev) =>
            prev.filter(
              (item) =>
                item._id !== id
            )
        );
      }
    } catch (error) {
      console.log(
        "Delete error:",
        error
      );
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={refreshCategories}
          disabled={loading}
          className="
            rounded-xl
            border-2
            border-blue-200
            dark:border-blue-900/30
            bg-white
            dark:bg-slate-800
            text-blue-700
            dark:text-slate-300
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            transition-all
            duration-300
          "
        >
          <RefreshCw
            className={`
              mr-2
              h-4
              w-4
              ${loading ? "animate-spin" : ""}
              text-blue-500
              dark:text-blue-400
            `}
          />
          Refresh
        </Button>
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border-0
          shadow-sm
          bg-white
          dark:bg-slate-800/90
          backdrop-blur-sm
          transition-colors
          duration-300
        "
      >
        <table className="w-full">
          <thead className="border-b border-blue-100/50 dark:border-blue-900/30 bg-blue-50/30 dark:bg-slate-700/20">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Description
              </th>
              <th className="p-4 text-left text-sm font-semibold text-blue-700 dark:text-slate-300">
                Status
              </th>
              <th className="p-4 text-right text-sm font-semibold text-blue-700 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categoryList.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="
                    p-6
                    text-center
                    text-blue-500/60
                    dark:text-slate-500
                  "
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categoryList.map((category) => (
                <tr
                  key={category._id}
                  className="
                    border-b
                    border-blue-100/50
                    dark:border-blue-900/30
                    hover:bg-blue-50/50
                    dark:hover:bg-slate-700/30
                    transition-colors
                    duration-200
                  "
                >
                  <td className="p-4 font-medium text-blue-900 dark:text-white">
                    {category.name}
                  </td>

                  <td className="p-4 text-blue-600/70 dark:text-slate-400">
                    {category.description || "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        transition-colors
                        duration-300
                        ${
                          category.status === "Active"
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        }
                      `}
                    >
                      {category.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div
                      className="
                        flex
                        justify-end
                        gap-2
                      "
                    >
                      <EditCategoryDialog
                        category={category}
                      />

                      <Button
                        variant="destructive"
                        size="icon"
                        type="button"
                        onClick={() =>
                          deleteCategory(
                            category._id
                          )
                        }
                        className="
                          rounded-xl
                          bg-red-500
                          hover:bg-red-600
                          dark:bg-red-600
                          dark:hover:bg-red-700
                          transition-all
                          duration-300
                          hover:shadow-lg
                          hover:shadow-red-500/30
                          dark:hover:shadow-red-600/20
                        "
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}