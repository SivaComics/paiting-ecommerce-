"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!user) {
    return (
      <Link
        href="/sign-in"
        aria-label="Sign in"
        className="inline-flex items-center text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
      >
        <User size={20} strokeWidth={1.5} />
      </Link>
    );
  }

  return (
    <div className="relative inline-flex items-center" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Account menu for ${user.name}`}
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-cream text-xs font-serif hover:bg-copper transition-colors duration-300 ease-premium"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-3 w-56 bg-cream border border-hairline shadow-premium z-50"
        >
          <div className="px-5 py-4 border-b border-hairline">
            <p className="text-xs uppercase tracking-wider text-copper mb-1">Signed in as</p>
            <p className="font-serif text-base text-espresso truncate">{user.name}</p>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 text-sm text-espresso-soft hover:text-copper hover:bg-cream-deep/60 transition-colors duration-300 ease-premium"
          >
            My Collection
          </Link>
          <button
            type="button"
            onClick={() => {
              signOut();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-5 py-3 text-sm text-espresso-soft hover:text-copper hover:bg-cream-deep/60 transition-colors duration-300 ease-premium"
          >
            <LogOut size={14} strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
