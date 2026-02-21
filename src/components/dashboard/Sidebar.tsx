"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Table, BarChart3, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    label: "Manage Menu",
    icon: UtensilsCrossed,
    path: "/dashboard/menu",
  },
  {
    label: "Manage Tables",
    icon: Table,
    path: "/dashboard/tables",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/dashboard/reports",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    // Close sidebar after navigation (on all screen sizes)
    onClose();
  };

  return (
    <>
      {/* Overlay - Shows on mobile and desktop when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:bg-black/30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4 space-y-2 h-full overflow-y-auto">
          {/* Close Button Header - Shows on all screen sizes */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 text-gray-700"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {sidebarItems.map((item) => {
            const Icon = item.icon;
            // Check if current path matches or starts with the item path
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path)) ||
              (item.path === "/" && pathname === "/");

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  isActive
                    ? "bg-gray-800 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
