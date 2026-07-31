"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

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

interface EditSupplierDialogProps {
  supplier: Supplier;
}

export default function EditSupplierDialog({
  supplier,
}: EditSupplierDialogProps) {
  const [name, setName] =
    useState(supplier.name);

  const [company, setCompany] =
    useState(supplier.company);

  const [phone, setPhone] =
    useState(supplier.phone);

  const [email, setEmail] =
    useState(supplier.email);

  const [address, setAddress] =
    useState(supplier.address);

  const [city, setCity] =
    useState(supplier.city);

  const [paymentTerms, setPaymentTerms] =
    useState(supplier.paymentTerms);

  const [status, setStatus] =
    useState(supplier.status);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] = useState(false);

  async function updateSupplier() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/suppliers/${supplier._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            company,
            phone,
            email,
            address,
            city,
            paymentTerms,
            status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Supplier Updated");
        setOpen(false);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
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
          max-w-2xl
          rounded-2xl
          border-0
          shadow-2xl
          bg-white
          dark:bg-slate-800/95
          backdrop-blur-sm
          transition-colors
          duration-300
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
            Edit Supplier
          </DialogTitle>
          <p
            className="
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Update supplier information
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label
                className="
                  text-sm
                  font-medium
                  text-blue-700
                  dark:text-slate-300
                "
              >
                Supplier Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Supplier Name"
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
                Company
              </label>
              <Input
                placeholder="Company"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
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
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
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
                Email
              </label>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
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
                City
              </label>
              <Input
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
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
                Payment Terms
              </label>
              <Input
                placeholder="Payment Terms"
                value={paymentTerms}
                onChange={(e) =>
                  setPaymentTerms(e.target.value)
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
              Address
            </label>
            <Textarea
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
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
            onClick={updateSupplier}
            disabled={loading || !name.trim() || !phone.trim()}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Updating...
              </div>
            ) : (
              "Update Supplier"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}