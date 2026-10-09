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
} from "@phosphor-icons/react";

const mobileNav = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/conversations", label: "Chats", icon: ChatsCircle },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/quotations", label: "Quotes", icon: FileText },
  { href: "/approvals", label: "Approve", icon: CheckSquare },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t lg:hidden"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex h-16 items-center justify-around px-2">
        {mobileNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md px-3 py-1 text-[11px] font-medium transition-colors",
                active
                  ? "text-saffron"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}