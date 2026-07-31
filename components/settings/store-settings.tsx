"use client";

import {
  Save,
  Store,
  Building2,
  Phone,
  Mail,
  MapPin,
  Percent,
  FileText,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import { useState } from "react";

export default function StoreSettings() {
  const [storeData, setStoreData] = useState({
    storeName: "SmartPOS Store",
    phone: "+94 77 123 4567",
    email: "info@smartpos.com",
    currency: "LKR",
    address: "123 Main Street, Colombo, Sri Lanka",
    tax: "12",
    invoicePrefix: "INV",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save store settings logic here
    alert("Store settings saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="
          rounded-2xl
          border-0
          bg-white
          dark:bg-slate-800/90
          p-6
          space-y-6
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          backdrop-blur-sm
          border-blue-100/50
          dark:border-blue-900/30
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-blue-100/50
            dark:border-blue-900/30
            pb-4
          "
        >
          <div
            className="
              rounded-xl
              bg-blue-100
              dark:bg-blue-900/30
              p-3
              transition-colors
              duration-300
            "
          >
            <Store
              className="
                h-6
                w-6
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-blue-900
                dark:text-white
              "
            >
              Store Information
            </h2>
            <p
              className="
                text-sm
                text-blue-600/70
                dark:text-slate-400
              "
            >
              Update your store details
            </p>
          </div>
        </div>

        {/* Main Fields */}
        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
          <div className="space-y-1.5">
            <label
              className="
                text-sm
                font-medium
                text-blue-700
                dark:text-slate-300
              "
            >
              Store Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  h-4
                  w-4
                  text-blue-400
                  dark:text-slate-500
                "
              />
              <input
                name="storeName"
                placeholder="Store Name"
                value={storeData.storeName}
                onChange={handleChange}
                className="
                  h-12
                  w-full
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
                  px-4
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all
                  duration-300
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
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  h-4
                  w-4
                  text-blue-400
                  dark:text-slate-500
                "
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={storeData.phone}
                onChange={handleChange}
                className="
                  h-12
                  w-full
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
                  px-4
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all
                  duration-300
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
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  h-4
                  w-4
                  text-blue-400
                  dark:text-slate-500
                "
              />
              <input
                name="email"
                placeholder="Email Address"
                value={storeData.email}
                onChange={handleChange}
                className="
                  h-12
                  w-full
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
                  px-4
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all
                  duration-300
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
              Currency <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Store
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  h-4
                  w-4
                  text-blue-400
                  dark:text-slate-500
                "
              />
              <input
                name="currency"
                placeholder="Currency"
                value={storeData.currency}
                onChange={handleChange}
                className="
                  h-12
                  w-full
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
                  px-4
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all
                  duration-300
                "
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label
            className="
              text-sm
              font-medium
              text-blue-700
              dark:text-slate-300
            "
          >
            Store Address
          </label>
          <div className="relative">
            <MapPin
              className="
                absolute
                left-3
                top-3
                h-4
                w-4
                text-blue-400
                dark:text-slate-500
              "
            />
            <textarea
              name="address"
              placeholder="Store Address"
              value={storeData.address}
              onChange={handleChange}
              className="
                min-h-32
                w-full
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
                p-4
                pl-10
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
                resize-none
              "
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
          <div className="space-y-1.5">
            <label
              className="
                text-sm
                font-medium
                text-blue-700
                dark:text-slate-300
              "
            >
              Tax Percentage (%)
            </label>
            <div className="relative">
              <Percent
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  h-4
                  w-4
                  text-blue-400
                  dark:text-slate-500
                "
              />
              <input
                name="tax"
                type="number"
                placeholder="Tax Percentage (%)"
                value={storeData.tax}
                onChange={handleChange}
                className="
                  h-12
                  w-full
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
                  px-4
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all
                  duration-300
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
              Invoice Prefix
            </label>
            <div className="relative">
              <FileText
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  h-4
                  w-4
                  text-blue-400
                  dark:text-slate-500
                "
              />
              <input
                name="invoicePrefix"
                placeholder="Invoice Prefix"
                value={storeData.invoicePrefix}
                onChange={handleChange}
                className="
                  h-12
                  w-full
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
                  px-4
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all
                  duration-300
                "
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          type="submit"
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
            flex
            items-center
            gap-2
          "
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}