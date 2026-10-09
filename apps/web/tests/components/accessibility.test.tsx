import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkipToContent } from "@/components/shell/skip-to-content";
import { DemoBanner } from "@/components/shell/demo-banner";

describe("Accessibility primitives", () => {
  it("provides a skip link to the main content landmark", () => {
    render(<SkipToContent />);
    const link = screen.getByRole("link", { name: /skip to content/i });
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("announces demo data via a live region", () => {
    render(<DemoBanner />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});