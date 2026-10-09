"use client";

import { usePathname } from "next/navigation";
import { StaffShell } from "@/components/shell/staff-shell";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { DemoBanner } from "@/components/shell/demo-banner";
import { resolveStaffCrumbs } from "@/lib/navigation";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { title, description, crumbs } = resolveStaffCrumbs(pathname);

  return (
    <>
      <StaffShell
        header={{ title, description }}
        breadcrumbs={<Breadcrumbs items={crumbs} />}
      >
        <DemoBanner />
        {children}
      </StaffShell>
      <MobileNav />
    </>
  );
}