"use client";

interface PublicShellProps {
  children: React.ReactNode;
}

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Minimal header */}
      <header
        className="flex h-14 shrink-0 items-center border-b px-6"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <span className="font-heading text-sm font-semibold text-foreground">
          Hilaac Electronics
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          Demo
        </span>
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}