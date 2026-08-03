"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCog,
  UserPlus,
  Store,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Cashier",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage("Account created successfully.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-50/50
        via-white
        to-blue-100/30
        dark:from-slate-900
        dark:via-slate-800
        dark:to-blue-950/50
        p-6
        transition-colors
        duration-300
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border-0
          bg-white
          dark:bg-slate-800/90
          p-8
          shadow-xl
          dark:shadow-slate-900/50
          backdrop-blur-sm
          transition-colors
          duration-300
          border-blue-100/50
          dark:border-blue-900/30
        "
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              dark:from-blue-600
              dark:to-blue-700
              shadow-lg
              shadow-blue-500/30
              dark:shadow-blue-600/20
            "
          >
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1
            className="
              mt-4
              text-3xl
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
            Create Account
          </h1>
          <p
            className="
              mt-2
              text-sm
              text-blue-600/70
              dark:text-slate-400
            "
          >
            Register a new SmartPOS user
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Name */}
          <div className="relative">
            <User
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                h-5
                w-5
                text-blue-400
                dark:text-slate-500
              "
            />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="
                w-full
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                px-4
                py-3
                pl-12
                outline-none
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
              "
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                h-5
                w-5
                text-blue-400
                dark:text-slate-500
              "
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="
                w-full
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                px-4
                py-3
                pl-12
                outline-none
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
              "
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                h-5
                w-5
                text-blue-400
                dark:text-slate-500
              "
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="
                w-full
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                px-4
                py-3
                pl-12
                pr-12
                outline-none
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
              "
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-blue-400
                dark:text-slate-500
                hover:text-blue-600
                dark:hover:text-slate-300
                transition-colors
                duration-200
              "
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Role */}
          <div className="relative">
            <UserCog
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                h-5
                w-5
                text-blue-400
                dark:text-slate-500
              "
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border-2
                border-blue-200
                dark:border-blue-900/30
                bg-white
                dark:bg-slate-800
                px-4
                py-3
                pl-12
                outline-none
                text-blue-900
                dark:text-white
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
                h-12
                cursor-pointer
                appearance-none
              "
            >
              <option value="Admin">Admin</option>
              <option value="Cashier">Cashier</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              dark:from-blue-600
              dark:to-blue-700
              py-3
              font-semibold
              text-white
              hover:shadow-lg
              hover:shadow-blue-500/30
              dark:hover:shadow-blue-600/20
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
              h-12
              text-base
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`
              mt-4
              text-center
              text-sm
              font-medium
              p-3
              rounded-xl
              ${
                message.includes("successfully")
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
              }
              transition-colors
              duration-300
            `}
          >
            {message}
          </p>
        )}

        {/* Login Link */}
        <p
          className="
            mt-6
            text-center
            text-sm
            text-blue-600/70
            dark:text-slate-400
          "
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="
              font-semibold
              text-blue-600
              dark:text-blue-400
              hover:text-blue-700
              dark:hover:text-blue-300
              transition-colors
              duration-200
              hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}