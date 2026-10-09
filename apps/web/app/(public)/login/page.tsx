"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldWarning } from "@phosphor-icons/react";

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-warning/15">
            <ShieldWarning className="size-5 text-warning" />
          </div>
          <CardTitle className="font-heading text-xl">
            Hilaac Electronics
          </CardTitle>
          <CardDescription>
            Staff operations console
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="mb-6 rounded-md border px-4 py-3 text-center text-sm font-medium"
            style={{
              backgroundColor: "var(--surface-subtle)",
              borderColor: "var(--border)",
              color: "var(--warning)",
            }}
          >
            Demo access only.
            <br />
            No real authentication is connected.
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="demo@hilaac.so"
                disabled
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>
            <Button type="submit" className="w-full" disabled>
              Sign in (disabled)
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            This is a local demo. Navigate to{" "}
            <a href="/dashboard" className="underline hover:text-foreground">
              /dashboard
            </a>{" "}
            to view the staff console directly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}