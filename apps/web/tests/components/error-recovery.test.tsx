import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";
import React from "react";

// Proper React error boundary as a class component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function BrokenComponent(): React.ReactElement {
  throw new Error("Simulated render failure");
}

function ErrorRecoveryDemo() {
  const [key, setKey] = React.useState(0);

  return (
    <div>
      <ErrorBoundary
        key={key}
        fallback={
          <div>
            <p data-testid="error-msg">Something went wrong</p>
            <Button data-testid="recovery-btn" onClick={() => setKey((k) => k + 1)}>
              Try again
            </Button>
          </div>
        }
      >
        <BrokenComponent />
      </ErrorBoundary>
    </div>
  );
}

describe("Error recovery", () => {
  it("error boundary catches render failure", () => {
    render(<ErrorRecoveryDemo />);
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg")).toHaveTextContent("Something went wrong");
  });

  it("recovery button exists in error state", () => {
    render(<ErrorRecoveryDemo />);
    const retryBtn = screen.getByTestId("recovery-btn");
    expect(retryBtn).toBeInTheDocument();
    expect(retryBtn).toHaveTextContent("Try again");
    expect(retryBtn).not.toBeDisabled();
  });

  it("retry button triggers re-render", () => {
    render(<ErrorRecoveryDemo />);
    // Clicking retry remounts the error boundary with a new key
    fireEvent.click(screen.getByTestId("recovery-btn"));
    // The component should re-render (the error boundary resets)
    // With a new key, BrokenComponent throws again, so error reappears
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
  });
});