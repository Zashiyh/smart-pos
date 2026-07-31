"use client";

import {
  useState,
} from "react";

import {
  Pencil,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Textarea,
} from "@/components/ui/textarea";

interface Category {
  _id: string;
  name: string;
  description?: string;
  status: string;
}

interface EditCategoryDialogProps {
  category: Category;
}

export default function EditCategoryDialog({
  category,
}: EditCategoryDialogProps) {
  const [name, setName] =
    useState(category.name);

  const [description, setDescription] =
    useState(category.description ?? "");

  const [status, setStatus] =
    useState(category.status || "Active");

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] = useState(false);

  async function updateCategory() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/categories/${category._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Category Updated");
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(
        "Update category error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="
            rounded-xl
            border-2
            border-blue-200
            dark:border-blue-900/30
            bg-white
            dark:bg-slate-800
            text-blue-600
            dark:text-blue-400
            hover:bg-blue-50
            dark:hover:bg-slate-700/50
            hover:text-blue-700
            dark:hover:text-blue-300
            transition-all
            duration-300
            hover:shadow-md
          "
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          rounded-2xl
          border-0
          shadow-2xl
          bg-white
          dark:bg-slate-800/95
          backdrop-blur-sm
          transition-colors
          duration-300
          max-w-md
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-2xl
              font-bold
              text-blue-900
              dark:text-white
            "
          >
            Edit Category
          </DialogTitle>
          <p
            className="
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Update category information
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label
              className="
                text-sm
                font-medium
                text-blue-700
                dark:text-slate-300
              "
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Category name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                text-blue-900
                dark:text-white
                placeholder:text-blue-400/50
                dark:placeholder:text-slate-500
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
                h-12
                px-4
              "
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="
                text-sm
                font-medium
                text-blue-700
                dark:text-slate-300
              "
            >
              Description
            </label>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                text-blue-900
                dark:text-white
                placeholder:text-blue-400/50
                dark:placeholder:text-slate-500
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
                px-4
                py-3
                min-h-[100px]
                resize-none
              "
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="
                text-sm
                font-medium
                text-blue-700
                dark:text-slate-300
              "
            >
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                text-blue-900
                dark:text-white
                px-4
                py-3
                outline-none
                cursor-pointer
                transition-all
                duration-300
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                h-12
              "
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <Button
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              dark:from-blue-600
              dark:to-blue-700
              text-white
              hover:shadow-lg
              hover:shadow-blue-500/30
              dark:hover:shadow-blue-600/20
              transition-all
              duration-300
              font-semibold
              h-12
              text-base
              mt-2
            "
            onClick={updateCategory}
            disabled={loading || !name.trim()}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Updating...
              </div>
            ) : (
              "Update Category"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}