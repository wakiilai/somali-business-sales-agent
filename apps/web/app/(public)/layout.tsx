import { PublicShell } from "@/components/shell/public-shell";
import { DemoBanner } from "@/components/shell/demo-banner";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicShell>
      <DemoBanner />
      {children}
    </PublicShell>
  );
}