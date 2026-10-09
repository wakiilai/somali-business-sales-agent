"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  House,
  ChatsCircle,
  Users,
  FileText,
  CheckSquare,
  Gear,
  Scroll,
} from "@phosphor-icons/react";

const staffNav = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/conversations", label: "Conversations", icon: ChatsCircle },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/quotations", label: "Quotations", icon: FileText },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/automations", label: "Automations", icon: Gear },
  { href: "/audit", label: "Audit", icon: Scroll },
];

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col border-r transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex h-14 items-center border-b px-4",
          collapsed && "justify-center px-2"
        )}
        style={{ borderColor: "var(--border)" }}
      >
        {collapsed ? (
          <span className="font-heading text-sm font-bold text-saffron">H</span>
        ) : (
          <span className="font-heading text-sm font-semibold text-foreground">
            Hilaac Electronics
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 p-2" role="navigation" aria-label="Staff navigation">
        {staffNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-saffron/15 text-saffron"
                  : "text-muted-foreground hover:bg-surface-subtle hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              aria-current={active ? "page" : undefined}
              title={collapsed ? label : undefined}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Demo badge */}
      <div
        className={cn(
          "border-t p-3",
          collapsed && "flex justify-center"
        )}
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
            "bg-warning/15 text-warning"
          )}
        >
          {collapsed ? "D" : "Demo"}
        </span>
      </div>
    </aside>
  );
}