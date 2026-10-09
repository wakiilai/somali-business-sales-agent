"use client";

"use client";

import { useState } from "react";
import { Sidebar } from "@/components/navigation/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarSimple } from "@phosphor-icons/react";

interface PageHeader {
  title: string;
  description?: string;
}

interface StaffShellProps {
  children: React.ReactNode;
  header: PageHeader;
  breadcrumbs?: React.ReactNode;
}

export function StaffShell({ children, header, breadcrumbs }: StaffShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex h-14 shrink-0 items-center gap-4 border-b px-6"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <SidebarSimple className="size-5" />
          </Button>
          {breadcrumbs}
          <div className="flex-1">
            <h1 className="font-heading text-base font-semibold text-foreground">
              {header.title}
            </h1>
            {header.description && (
              <p className="text-xs text-muted-foreground">{header.description}</p>
            )}
          </div>
          <span className="text-xs text-muted-foreground">Sales Manager · Demo access</span>
        </header>

        {/* Main content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto pb-16 lg:pb-0"
        >
          <div className="mx-auto max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}