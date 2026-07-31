"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";

export default function AddCategoryDialog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function createCategory() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            status: "Active",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Category Added");
        setName("");
        setDescription("");
        setOpen(false);
        window.location.reload();
      } else {
        alert(
          data.message || "Failed to add category"
        );
      }
    } catch (error) {
      console.log(
        "Add category error:",
        error
      );
      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          type="button"
          className="
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
            flex
            items-center
            gap-2
          "
        >
          <Plus className="h-4 w-4" />
          Add Category
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
            Add Category
          </DialogTitle>
          <p
            className="
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Create a new product category
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
              placeholder="Enter category name"
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
              placeholder="Enter category description"
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
            onClick={createCategory}
            disabled={loading || !name.trim()}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              "Save Category"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}