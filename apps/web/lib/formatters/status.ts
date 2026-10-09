export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    // Conversation
    active: "Active",
    waiting: "Waiting",
    handed_off: "Handed Off",
    resolved: "Resolved",
    // Lead
    new: "New",
    contacted: "Contacted",
    qualified: "Qualified",
    proposal_sent: "Proposal Sent",
    won: "Won",
    lost: "Lost",
    // Quotation
    draft: "Draft",
    pending_approval: "Pending Approval",
    approved: "Approved",
    rejected: "Rejected",
    expired: "Expired",
    // Approval
    pending: "Pending",
    // Product
    in_stock: "In Stock",
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
    unavailable: "Unavailable",
    // Automation
    running: "Running",
    completed: "Completed",
    failed: "Failed",
    retrying: "Retrying",
    // Audit
    success: "Success",
    failure: "Failure",
    denied: "Denied",
  };
  return labels[status] ?? status;
}

export type StatusVariant = "success" | "warning" | "danger" | "info" | "default" | "brand";

export function statusVariant(status: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    active: "success",
    resolved: "success",
    won: "success",
    approved: "success",
    completed: "success",
    success: "success",
    in_stock: "success",

    waiting: "warning",
    contacted: "warning",
    proposal_sent: "warning",
    pending_approval: "warning",
    pending: "warning",
    running: "warning",
    retrying: "warning",
    low_stock: "warning",

    handed_off: "info",
    new: "info",
    qualified: "info",
    draft: "info",
    info: "info",

    rejected: "danger",
    lost: "danger",
    failed: "danger",
    danger: "danger",
    out_of_stock: "danger",
    denied: "danger",
    expired: "danger",
    unavailable: "danger",

    high: "danger",
    medium: "warning",
    low: "info",
    critical: "danger",
  };
  return map[status] ?? "default";
}