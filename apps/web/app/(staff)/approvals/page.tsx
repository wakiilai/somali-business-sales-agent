"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { approvals as initialApprovals } from "@/lib/fixtures/approvals";
import { relativeTime, fullDate } from "@/lib/formatters/date";
import { statusLabel, type StatusVariant } from "@/lib/formatters/status";
import type { Approval } from "@/lib/contracts/approval";
import {
  Check,
  X,
  Clock,
  Warning,
  Question,
  Spinner,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";

type ApprovalState = "idle" | "confirming" | "loading" | "success" | "failure" | "timeout";

const riskVariant: Record<string, StatusVariant> = {
  low: "info",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

const riskIcon: Record<string, typeof Warning> = {
  low: Check,
  medium: Warning,
  high: Warning,
  critical: Warning,
};

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [activeApproval, setActiveApproval] = useState<Approval | null>(null);
  const [state, setState] = useState<ApprovalState>("idle");
  const [action, setAction] = useState<"approve" | "reject">("approve");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Timeout after 12s in loading state
  useEffect(() => {
    if (state === "loading") {
      timeoutRef.current = setTimeout(() => {
        setState("timeout");
      }, 12000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [state]);

  const pending = approvals.filter((a) => a.status === "pending");
  const decided = approvals.filter((a) => a.status !== "pending");

  function openConfirm(approval: Approval, act: "approve" | "reject") {
    setActiveApproval(approval);
    setAction(act);
    setState("confirming");
  }

  function handleConfirm() {
    if (!activeApproval) return;
    setState("loading");

    // Simulate async approval
    setTimeout(() => {
      // 80% success rate for demo
      const succeeded = Math.random() > 0.2;
      if (succeeded) {
        setApprovals((prev) =>
          prev.map((a) =>
            a.id === activeApproval.id
              ? { ...a, status: action === "approve" ? ("approved" as const) : ("rejected" as const), decidedBy: "Store Owner", decidedAt: new Date().toISOString() }
              : a
          )
        );
        setState("success");
      } else {
        setState("failure");
      }
    }, 1500);
  }

  function handleRetry() {
    setState("loading");
    setTimeout(() => {
      if (!activeApproval) return;
      setApprovals((prev) =>
        prev.map((a) =>
          a.id === activeApproval.id
            ? { ...a, status: action === "approve" ? ("approved" as const) : ("rejected" as const), decidedBy: "Store Owner", decidedAt: new Date().toISOString() }
            : a
        )
      );
      setState("success");
    }, 1500);
  }

  function closeDialog() {
    setState("idle");
    setActiveApproval(null);
  }

  return (
    <div className="space-y-8">
      {/* Pending queue */}
      <section>
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="size-5 text-warning" />
          Pending Approvals
          <Badge variant="warning" className="ml-2">Demo data</Badge>
          {pending.length > 0 && (
            <Badge variant="brand">{pending.length}</Badge>
          )}
        </h2>

        {pending.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12 text-center">
              <Check className="size-10 text-success mb-3" />
              <p className="text-sm font-medium text-foreground">All caught up</p>
              <p className="text-xs text-muted-foreground mt-1">No pending approvals</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {pending.map((approval) => {
              const RiskIcon = riskIcon[approval.risk] ?? Question;
              return (
                <Card
                  key={approval.id}
                  className={cn(
                    "transition-shadow hover:shadow-md",
                    approval.risk === "high" || approval.risk === "critical"
                      ? "border-danger/30"
                      : undefined
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={riskVariant[approval.risk]}>
                          <RiskIcon className="size-3 mr-1" />
                          {approval.risk.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{approval.type}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {relativeTime(approval.createdAt)}
                      </span>
                    </div>
                    <CardTitle className="text-base mt-2">{approval.title}</CardTitle>
                    <CardDescription>{approval.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium text-foreground">Requested by:</span>{" "}
                        {approval.requestedBy}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Scope:</span>{" "}
                        {approval.tenantScope}
                      </p>
                    </div>
                    <div
                      className="rounded-md px-3 py-2 text-xs mt-2"
                      style={{ backgroundColor: "var(--surface-subtle)" }}
                    >
                      <p className="font-medium text-foreground mb-1">Evidence</p>
                      <p className="text-muted-foreground">{approval.evidence}</p>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex gap-2 py-3">
                    <Button
                      onClick={() => openConfirm(approval, "approve")}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      <Check className="size-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => openConfirm(approval, "reject")}
                      variant="danger"
                      size="sm"
                      className="flex-1"
                    >
                      <X className="size-4" />
                      Reject
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Decided history */}
      {decided.length > 0 && (
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            Decided
          </h2>
          <div className="space-y-3">
            {decided.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between rounded-lg border px-4 py-3"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      approval.status === "approved"
                        ? "success"
                        : "danger"
                    }
                  >
                    {approval.status === "approved" ? (
                      <Check className="size-3 mr-1" />
                    ) : (
                      <X className="size-3 mr-1" />
                    )}
                    {statusLabel(approval.status)}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-foreground">{approval.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Decided by {approval.decidedBy} — {approval.decidedAt ? fullDate(approval.decidedAt) : ""}
                    </p>
                  </div>
                </div>
                <Badge variant={riskVariant[approval.risk]}>{approval.risk}</Badge>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Confirmation / Loading / Success / Failure dialog */}
      <div aria-live="polite" aria-atomic="true">
      <Dialog open={state !== "idle"} onOpenChange={() => state === "success" && closeDialog()}>
        {state === "confirming" && activeApproval && (
          <>
            <DialogHeader>
              <DialogTitle>
                {action === "approve" ? "Approve" : "Reject"} this request?
              </DialogTitle>
              <DialogDescription>
                {action === "approve"
                  ? "This action will approve the request and record an audit event."
                  : "This action will reject the request and record an audit event."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Action:</span> {activeApproval.title}
              </p>
              <p>
                <span className="font-medium">Risk level:</span>{" "}
                <Badge variant={riskVariant[activeApproval.risk]} className="ml-1">
                  {activeApproval.risk.toUpperCase()}
                </Badge>
              </p>
              <p>
                <span className="font-medium">Requested by:</span> {activeApproval.requestedBy}
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant={action === "approve" ? "primary" : "danger"}
              >
                {action === "approve" ? "Confirm approve" : "Confirm reject"}
              </Button>
            </DialogFooter>
          </>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center py-8 text-center">
            <Spinner className="size-8 animate-spin text-saffron mb-4" />
            <p className="font-heading text-base font-semibold text-foreground">
              Processing...
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {action === "approve" ? "Approving" : "Rejecting"} the request. This may take a moment.
            </p>
          </div>
        )}

        {state === "success" && activeApproval && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Check className="size-5 text-success" />
                {action === "approve" ? "Approved" : "Rejected"}
              </DialogTitle>
              <DialogDescription>
                The request has been {action === "approve" ? "approved" : "rejected"} and an audit event has been recorded.
              </DialogDescription>
            </DialogHeader>

            {/* Audit preview */}
            <div
              className="mt-4 rounded-md border px-4 py-3 text-xs space-y-1"
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderColor: "var(--border)",
              }}
            >
              <p className="font-medium text-foreground mb-1">Audit event preview</p>
              <p>
                <span className="text-muted-foreground">Actor:</span>{" "}
                staff / store-owner
              </p>
              <p>
                <span className="text-muted-foreground">Action:</span>{" "}
                {action === "approve" ? "approval_granted" : "approval_rejected"}
              </p>
              <p>
                <span className="text-muted-foreground">Resource:</span>{" "}
                approval / {activeApproval.id}
              </p>
              <p>
                <span className="text-muted-foreground">Result:</span>{" "}
                success
              </p>
              <p>
                <span className="text-muted-foreground">Timestamp:</span>{" "}
                {new Date().toISOString()}
              </p>
              <p>
                <span className="text-muted-foreground">Correlation:</span>{" "}
                {`appr-${activeApproval.id}-${action}`}
              </p>
            </div>

            <DialogFooter>
              <Button onClick={closeDialog} variant="secondary">
                Done
              </Button>
            </DialogFooter>
          </>
        )}

        {state === "failure" && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-danger/15 mb-4">
              <Warning className="size-5 text-danger" />
            </div>
            <p className="font-heading text-base font-semibold text-foreground">
              Action failed
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              The request could not be processed. You can retry.
            </p>
            <div className="mt-4 flex gap-2">
              <Button onClick={closeDialog} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={handleRetry} variant="primary" size="sm">
                <ArrowCounterClockwise className="size-4" />
                Retry
              </Button>
            </div>
          </div>
        )}

        {state === "timeout" && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-warning/15 mb-4">
              <Clock className="size-5 text-warning" />
            </div>
            <p className="font-heading text-base font-semibold text-foreground">
              Request timed out
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              The approval request took too long to process. You can retry or cancel.
            </p>
            <div className="mt-4 flex gap-2">
              <Button onClick={closeDialog} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={handleRetry} variant="primary" size="sm">
                <ArrowCounterClockwise className="size-4" />
                Retry
              </Button>
            </div>
          </div>
        )}
      </Dialog>
      </div>
    </div>
  );
}