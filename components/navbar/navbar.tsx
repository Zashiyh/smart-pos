"use client";

import {
  Search,
  Bell,
  UserCircle,
  ChevronDown,
  LogOut,
  User,
  AlertTriangle,
  ShoppingCart,
  Package,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ThemeToggle from "../theme-toggle";

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          "/api/auth/me",
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("User fetch error:", error);
      }
    }
    getUser();
  }, []);

  // notifications
  useEffect(() => {
    async function getNotifications() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();

        if (data.success) {
          setNotifications(data.notifications || []);
          const unread = data.notifications?.filter(
            (n: any) => !n.read
          ).length || 0;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getNotifications();
  }, []);

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: "PUT",
      });
      setNotifications(
        notifications.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.log(error);
    }
  }

  async function markAllAsRead() {
    try {
      await fetch("/api/notifications/mark-all-read", {
        method: "PUT",
      });
      setNotifications(
        notifications.map((n) => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
    router.refresh();
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "low_stock":
        return <Package className="h-4 w-4 text-red-500" />;
      case "sale":
        return <ShoppingCart className="h-4 w-4 text-emerald-500" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <header
      className="
        fixed
        right-0
        top-0
        z-50
        flex
        h-20
        items-center
        justify-between
        border-b
        bg-background/80
        dark:bg-slate-900/80
        px-6
        backdrop-blur-xl
        lg:left-72
        transition-colors
        duration-300
        border-gray-200
        dark:border-slate-700
      "
    >
      {/* Search */}
      <div
        className="
          flex
          h-11
          w-full
          max-w-lg
          items-center
          gap-3
          rounded-2xl
          border
          bg-muted/30
          dark:bg-slate-800/50
          dark:border-slate-700
          px-4
          transition-colors
          duration-300
          focus-within:ring-2
          focus-within:ring-blue-500
          focus-within:border-transparent
        "
      >
        <Search
          className="
            h-5
            w-5
            text-muted-foreground
            dark:text-slate-400
          "
        />
        <input
          type="text"
          placeholder="Search products, sales..."
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
            text-gray-900
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-slate-500
          "
        />
      </div>

      {/* Actions */}
      <div
        className="
          ml-4
          flex
          items-center
          gap-3
        "
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setNotificationOpen(!notificationOpen)
            }
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              dark:border-slate-700
              hover:bg-muted
              dark:hover:bg-slate-800
              transition
              text-gray-700
              dark:text-slate-300
            "
          >
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-[10px]
                  font-bold
                  text-white
                  animate-pulse
                "
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-80
                max-h-[400px]
                overflow-y-auto
                rounded-2xl
                border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                shadow-xl
                dark:shadow-slate-900/50
                animate-in
                fade-in
                slide-in-from-top-2
                duration-200
                z-50
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  p-4
                  border-b
                  border-gray-200
                  dark:border-slate-700
                "
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {notifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="
                      text-xs
                      text-blue-600
                      dark:text-blue-400
                      hover:text-blue-700
                      dark:hover:text-blue-300
                      transition-colors
                      font-medium
                    "
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="divide-y divide-gray-200 dark:divide-slate-700">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground dark:text-slate-400">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    No notifications
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className={`
                        p-4
                        hover:bg-muted/50
                        dark:hover:bg-slate-700/30
                        transition-colors
                        duration-200
                        cursor-pointer
                        ${!item.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}
                      `}
                      onClick={() => markAsRead(item._id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="
                            flex-shrink-0
                            h-8
                            w-8
                            rounded-full
                            bg-muted
                            dark:bg-slate-700
                            flex
                            items-center
                            justify-center
                          "
                        >
                          {getNotificationIcon(item.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className="
                              text-sm
                              font-medium
                              text-gray-900
                              dark:text-white
                            "
                          >
                            {item.title}
                          </p>
                          <p
                            className="
                              text-xs
                              text-muted-foreground
                              dark:text-slate-400
                              mt-0.5
                              line-clamp-2
                            "
                          >
                            {item.message}
                          </p>
                          <p
                            className="
                              text-[10px]
                              text-gray-400
                              dark:text-slate-500
                              mt-1
                            "
                          >
                            {new Date(
                              item.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>

                        {!item.read && (
                          <div className="flex-shrink-0">
                            <span
                              className="
                                h-2
                                w-2
                                rounded-full
                                bg-blue-500
                                block
                              "
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div
                  className="
                    p-3
                    border-t
                    border-gray-200
                    dark:border-slate-700
                    text-center
                  "
                >
                  <button
                    onClick={() => {
                      setNotificationOpen(false);
                      router.push("/dashboard/notifications");
                    }}
                    className="
                      text-sm
                      text-blue-600
                      dark:text-blue-400
                      hover:text-blue-700
                      dark:hover:text-blue-300
                      transition-colors
                      font-medium
                    "
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              dark:border-slate-700
              px-3
              py-2
              hover:bg-muted
              dark:hover:bg-slate-800
              transition-colors
              duration-300
            "
          >
            <UserCircle
              className="
                h-7
                w-7
                text-primary
                dark:text-blue-400
              "
            />

            <div className="hidden text-left md:block">
              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                {user?.role || "User"}
              </p>
              <p
                className="
                  text-xs
                  text-muted-foreground
                  dark:text-slate-400
                "
              >
                {user?.email || "Loading..."}
              </p>
            </div>

            <ChevronDown
              className="
                h-4
                w-4
                text-gray-600
                dark:text-slate-400
              "
            />
          </button>

          {open && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-64
                rounded-2xl
                border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                p-3
                shadow-xl
                dark:shadow-slate-900/50
                animate-in
                fade-in
                slide-in-from-top-2
                duration-200
              "
            >
              {/* User Info */}
              <div
                className="
                  mb-3
                  border-b
                  border-gray-200
                  dark:border-slate-700
                  pb-3
                "
              >
                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.name || "User"}
                </p>
                <p
                  className="
                    text-sm
                    text-muted-foreground
                    dark:text-slate-400
                  "
                >
                  {user?.email || "Loading..."}
                </p>
                <p
                  className="
                    mt-1
                    text-xs
                    text-muted-foreground
                    dark:text-slate-500
                  "
                >
                  Role: {user?.role || "User"}
                </p>
              </div>

              {/* Profile */}
              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  p-3
                  hover:bg-muted
                  dark:hover:bg-slate-700
                  transition-colors
                  duration-200
                  text-gray-700
                  dark:text-slate-300
                "
              >
                <User className="h-5 w-5" />
                Profile
              </button>

              <div
                className="
                  my-2
                  border-t
                  border-gray-200
                  dark:border-slate-700
                "
              />

              {/* Logout */}
              <button
                type="button"
                onClick={logout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  p-3
                  text-red-500
                  hover:bg-red-500/10
                  dark:hover:bg-red-500/20
                  transition-colors
                  duration-200
                "
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}