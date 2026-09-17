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

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      signIn({ name, email });
      router.push("/dashboard");
    }, 700);
  }

  return (
    <AuthShell
      eyebrow={`Join ${SITE_NAME}`}
      title="Create Your Account"
      subtitle="Save favorites, follow artists, and track your collection in one place."
      footer={
        <>
          Already collecting with us?{" "}
          <Link href="/sign-in" className="text-copper hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthField
          id="name"
          label="Full Name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adrienne Kessler"
        />
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
          autoComplete="new-password"
          required
          minLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          required
          minLength={4}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
        />
        {error && <p className="text-sm text-copper">{error}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : "Create Account"}
        </Button>
        <p className="text-xs text-espresso-soft leading-relaxed">
          By creating an account, you agree to {SITE_NAME}&apos;s collector terms and privacy practices.
        </p>
      </form>
    </AuthShell>
  );
}
