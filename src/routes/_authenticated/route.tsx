import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: Guard,
});

function Guard() {
  const { user, loading, isAdmin } = useAuth();
  if (loading) {
    return <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/auth" />;
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Awaiting admin access</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your email ({user.email}) is not in the admin list. Ask a project owner to add it:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-secondary p-4 text-left text-xs">
{`INSERT INTO public.admin_emails (email)
VALUES ('${user.email}');`}
        </pre>
      </div>
    );
  }
  return <Outlet />;
}
