import { test, expect } from "@playwright/test";

test.describe("Approval gates", () => {
  test("approval-required action does not render as completed without confirmation", async ({ page }) => {
    await page.goto("/approvals");

    // There should be pending approvals visible
    const pendingSection = page.locator("text=Pending Approvals");
    await expect(pendingSection).toBeVisible();

    // No pending item should show an "Approved" badge
    const approvedBadgesInPending = page.locator("section:has-text('Pending Approvals') >> text=Approved");
    await expect(approvedBadgesInPending).toHaveCount(0);
  });

  test("approve button opens confirmation dialog", async ({ page }) => {
    await page.goto("/approvals");

    // Click the first Approve button
    const approveBtn = page.locator("button", { hasText: "Approve" }).first();
    await approveBtn.click();

    // A confirmation dialog should appear
    await expect(page.locator("text=Approve this request?")).toBeVisible();
    await expect(page.locator("button", { hasText: "Confirm approve" })).toBeVisible();
    await expect(page.locator("button", { hasText: "Cancel" })).toBeVisible();
  });

  test("unavailable catalog product abstains in chat", async ({ page }) => {
    await page.goto("/chat");

    // Ask about MacBook Air (unavailable in fixtures)
    const input = page.locator("input[placeholder*='Ku qor']");
    await input.fill("MacBook Air");
    await page.keyboard.press("Enter");

    // Wait for response
    await page.waitForTimeout(2000);

    // Should show an abstaining response
    const abstentionSection = page.locator("text=If catalog data is unavailable");
    await expect(abstentionSection).toBeVisible();
  });
});