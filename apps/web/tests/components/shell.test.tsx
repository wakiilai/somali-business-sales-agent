import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { AnchorHTMLAttributes } from "react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { Sidebar } from "@/components/navigation/sidebar";

describe("Staff shell", () => {
  it("renders the workspace identity and primary navigation", () => {
    render(<Sidebar collapsed={false} />);

    expect(screen.getByText("Hilaac Electronics")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /staff navigation/i })
    ).toBeInTheDocument();

    for (const label of [
      "Dashboard",
      "Conversations",
      "Leads",
      "Quotations",
      "Approvals",
      "Automations",
      "Audit",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("marks the active route for assistive technology", () => {
    render(<Sidebar collapsed={false} />);
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("labels the demo workspace clearly", () => {
    render(<Sidebar collapsed={false} />);
    expect(screen.getByText("Demo")).toBeInTheDocument();
  });
});