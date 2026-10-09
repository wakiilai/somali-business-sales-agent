import { test, expect } from "@playwright/test";

test.describe("Hilaac Electronics — smoke tests", () => {
  test("/chat loads and shows demo-data notice", async ({ page }) => {
    await page.goto("/chat");
    await expect(page.getByRole("alert").getByText("Demo data")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Hilaac Electronics" })
    ).toBeVisible();
  });

  test("/dashboard loads with operational cards", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=New Inquiries")).toBeVisible();
    await expect(page.locator("text=Pending Approvals")).toBeVisible();
    await expect(page.getByRole("alert").getByText("Demo data")).toBeVisible();
  });

  test("/approvals renders queue with approve/reject buttons", async ({ page }) => {
    await page.goto("/approvals");
    await expect(page.locator("text=Pending Approvals")).toBeVisible();
    // Approve button should exist for at least one pending approval
    const approveBtn = page.locator("button", { hasText: "Approve" }).first();
    await expect(approveBtn).toBeVisible();
  });

  test("/audit renders event log", async ({ page }) => {
    await page.goto("/audit");
    const auditHeading = page.getByRole("heading", { name: /Audit Log/ });
    await expect(auditHeading).toBeVisible();
    await expect(auditHeading.getByText("Demo data")).toBeVisible();
  });
});