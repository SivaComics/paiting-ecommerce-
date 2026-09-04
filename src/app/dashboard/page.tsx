"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { mockCollectorName } from "@/lib/data/collector";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = (user?.name || mockCollectorName).split(" ")[0];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow={`Welcome back, ${firstName}`}
        title="My Collection"
        description="Your favorites, followed artists, purchase history, and certificates of authenticity, all in one place."
        className="mb-12"
      />
      <DashboardTabs />
    </div>
  );
}
