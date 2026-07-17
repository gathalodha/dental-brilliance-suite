import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { usePageVisibility, isPageVisible } from "@/hooks/useContent";

/**
 * Wraps a public page whose visibility is toggled from the admin's
 * Page Visibility section. Hidden pages redirect to Home.
 */
export function PageGate({ slug, children }: { slug: string; children: ReactNode }) {
  const { data, isLoading } = usePageVisibility();
  const navigate = useNavigate();
  const visible = isPageVisible(data, slug);

  useEffect(() => {
    if (!isLoading && !visible) {
      navigate({ to: "/", replace: true });
    }
  }, [isLoading, visible, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-accent" />
      </div>
    );
  }
  if (!visible) return null;
  return <>{children}</>;
}
