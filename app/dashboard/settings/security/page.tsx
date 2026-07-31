"use client";

import { useState } from "react";

import { LockKeyhole, Eye, EyeOff, ShieldCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function changePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.log("Password change error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      className="
        rounded-2xl
        border-0
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        bg-white
        dark:bg-slate-800/90
        backdrop-blur-sm
      "
    >
      <CardHeader className="border-b border-blue-100/50 dark:border-blue-900/30 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-blue-100
              dark:bg-blue-900/30
              transition-colors
              duration-300
            "
          >
            <LockKeyhole
              className="
                h-6
                w-6
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <div>
            <CardTitle
              className="
                text-xl
                font-semibold
                text-blue-900
                dark:text-white
              "
            >
              Change Password
            </CardTitle>
            <p
              className="
                text-sm
                text-blue-600/70
                dark:text-slate-400
              "
            >
              Update your account password
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        <div className="space-y-1.5">
          <label
            className="
              text-sm
              font-medium
              text-blue-700
              dark:text-slate-300
            "
          >
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
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
                pr-12
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
              "
            />
            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
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
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
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
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password (min 6 characters)"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
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
                pr-12
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
              "
            />
            <button
              type="button"
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
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
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p
            className="
              text-xs
              text-blue-400/60
              dark:text-slate-500
            "
          >
            Password must be at least 6 characters
          </p>
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
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
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
                pr-12
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
              "
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
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
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {newPassword && confirmPassword && newPassword !== confirmPassword && (
          <div
            className="
              rounded-xl
              bg-red-50
              dark:bg-red-900/20
              border-2
              border-red-200
              dark:border-red-900/30
              p-3
              text-sm
              text-red-600
              dark:text-red-400
              flex
              items-center
              gap-2
            "
          >
            <ShieldCheck className="h-4 w-4" />
            Passwords do not match
          </div>
        )}

        {newPassword && newPassword.length < 6 && (
          <div
            className="
              rounded-xl
              bg-yellow-50
              dark:bg-yellow-900/20
              border-2
              border-yellow-200
              dark:border-yellow-900/30
              p-3
              text-sm
              text-yellow-600
              dark:text-yellow-400
              flex
              items-center
              gap-2
            "
          >
            <ShieldCheck className="h-4 w-4" />
            Password must be at least 6 characters
          </div>
        )}

        <Button
          onClick={changePassword}
          disabled={loading}
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
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Changing...
            </div>
          ) : (
            "Change Password"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}