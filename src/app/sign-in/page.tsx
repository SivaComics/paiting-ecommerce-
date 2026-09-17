"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthField } from "@/components/auth/AuthField";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { SITE_NAME } from "@/lib/site";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const name = email.split("@")[0]?.replace(/[._]/g, " ") || "Collector";
    window.setTimeout(() => {
      signIn({ name: name.replace(/\b\w/g, (c) => c.toUpperCase()), email });
      router.push("/dashboard");
    }, 700);
  }

  return (
    <AuthShell
      eyebrow="Welcome Back"
      title="Sign In"
      subtitle="Access your saved favorites, followed artists, and collection."
      footer={
        <>
          New to {SITE_NAME}?{" "}
          <Link href="/sign-up" className="text-copper hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthField
          id="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          minLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </AuthShell>
  );
}
