import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

// Simulates the approval state machine in miniature
function ApprovalMini() {
  const [state, setState] = useState<"idle" | "confirming" | "loading" | "success" | "failure">("idle");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <p data-testid="current-state">{state}</p>

      <Button onClick={() => { setDialogOpen(true); setState("confirming"); }} data-testid="approve-btn">
        Approve
      </Button>

      <Dialog open={dialogOpen && state !== "idle"} onOpenChange={() => {}}>
        {state === "confirming" && (
          <>
            <DialogHeader><DialogTitle>Approve this request?</DialogTitle></DialogHeader>
            <Button
              data-testid="confirm-btn"
              onClick={() => { setState("loading"); setTimeout(() => setState("success"), 100); }}
            >
              Confirm approve
            </Button>
            <Button data-testid="cancel-btn" variant="secondary" onClick={() => { setDialogOpen(false); setState("idle"); }}>
              Cancel
            </Button>
          </>
        )}

        {state === "loading" && <p data-testid="loading-msg">Processing...</p>}

        {state === "success" && (
          <>
            <p data-testid="success-msg">Approved — audit event recorded.</p>
            <Button data-testid="done-btn" onClick={() => { setDialogOpen(false); setState("idle"); }}>Done</Button>
          </>
        )}

        {state === "failure" && (
          <>
            <p data-testid="failure-msg">Action failed. You can retry.</p>
            <Button data-testid="retry-btn" onClick={() => { setState("loading"); setTimeout(() => setState("success"), 100); }}>
              Retry
            </Button>
          </>
        )}
      </Dialog>
    </div>
  );
}

describe("Approval state machine", () => {
  it("starts in idle state", () => {
    render(<ApprovalMini />);
    expect(screen.getByTestId("current-state")).toHaveTextContent("idle");
  });

  it("opens confirmation dialog when Approve is clicked", async () => {
    render(<ApprovalMini />);
    fireEvent.click(screen.getByTestId("approve-btn"));
    expect(screen.getByTestId("current-state")).toHaveTextContent("confirming");
    expect(screen.getByText("Approve this request?")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-btn")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
  });

  it("transitions to loading then success on confirm", async () => {
    render(<ApprovalMini />);
    fireEvent.click(screen.getByTestId("approve-btn"));
    fireEvent.click(screen.getByTestId("confirm-btn"));
    expect(screen.getByTestId("loading-msg")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("success-msg")).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it("returns to idle when cancelled from confirmation", async () => {
    render(<ApprovalMini />);
    fireEvent.click(screen.getByTestId("approve-btn"));
    fireEvent.click(screen.getByTestId("cancel-btn"));
    expect(screen.getByTestId("current-state")).toHaveTextContent("idle");
  });

  it("does not render approval as auto-completed", () => {
    render(<ApprovalMini />);
    // In idle state, no success message should be visible
    expect(screen.queryByTestId("success-msg")).not.toBeInTheDocument();
    // In idle state, no "Approved" badge should appear
    expect(screen.queryByText(/approved/i)).not.toBeInTheDocument();
  });

  it("shows failure state with retry button", async () => {
    function ApprovalWithFailure() {
      const [state, setState] = useState<"idle" | "failure">("idle");

      return (
        <div>
          <p data-testid="current-state">{state}</p>
          <Button data-testid="trigger-fail" onClick={() => setState("failure")}>Fail</Button>
          {state === "failure" && (
            <>
              <p data-testid="failure-msg">Action failed. You can retry.</p>
              <Button data-testid="retry-btn" onClick={() => setState("idle")}>Retry</Button>
            </>
          )}
        </div>
      );
    }

    render(<ApprovalWithFailure />);
    fireEvent.click(screen.getByTestId("trigger-fail"));
    expect(screen.getByTestId("failure-msg")).toBeInTheDocument();
    expect(screen.getByTestId("retry-btn")).toBeInTheDocument();

    // Retry recovers
    fireEvent.click(screen.getByTestId("retry-btn"));
    expect(screen.getByTestId("current-state")).toHaveTextContent("idle");
  });
});