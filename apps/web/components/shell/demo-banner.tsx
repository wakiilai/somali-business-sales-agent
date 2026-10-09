export function DemoBanner() {
  return (
    <div
      className="flex items-center justify-center gap-2 border-b px-4 py-2 text-center text-xs font-medium"
      style={{
        backgroundColor: "var(--surface-subtle)",
        borderColor: "var(--border)",
        color: "var(--muted-foreground)",
      }}
      role="alert"
    >
      <span
        className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning"
      >
        Demo data
      </span>
      This is a demonstration. All data is synthetic. No real customers or products.
    </div>
  );
}