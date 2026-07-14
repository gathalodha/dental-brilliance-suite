import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Maison Dentaire Admin" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [loading, user, navigate]);

  async function handle(kind: "in" | "up") {
    setBusy(true);
    const { error } = kind === "in" ? await signIn(email, password) : await signUp(email, password);
    setBusy(false);
    if (error) return toast.error(error.message);
    if (kind === "up") toast.success("Check your email to confirm, then sign in.");
    else navigate({ to: "/admin" });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-accent">← Back to site</Link>
      <h1 className="mt-6 font-display text-4xl">Admin access</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to manage clinic content. New signups must be added to the admin list before they see the dashboard.
      </p>

      <Tabs defaultValue="in" className="mt-8">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="in">Sign in</TabsTrigger>
          <TabsTrigger value="up">Sign up</TabsTrigger>
        </TabsList>
        {(["in", "up"] as const).map((kind) => (
          <TabsContent key={kind} value={kind} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`e-${kind}`}>Email</Label>
              <Input id={`e-${kind}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`p-${kind}`}>Password</Label>
              <Input id={`p-${kind}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full" disabled={busy} onClick={() => handle(kind)}>
              {busy ? "Please wait…" : kind === "in" ? "Sign in" : "Create account"}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
