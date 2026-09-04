"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { FadeIn } from "@/components/ui/motion";
import { FavoritesTab } from "./FavoritesTab";
import { FollowingTab } from "./FollowingTab";
import { PurchaseHistoryTab } from "./PurchaseHistoryTab";
import { MyCollectionTab } from "./MyCollectionTab";

const tabs = [
  { id: "collection", label: "My Collection" },
  { id: "favorites", label: "Favorites" },
  { id: "following", label: "Following" },
  { id: "history", label: "Purchase History" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function DashboardTabs() {
  const [active, setActive] = useState<TabId>("collection");

  return (
    <div>
      <div className="flex flex-wrap gap-8 border-b border-hairline mb-10" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={clsx(
              "pb-4 text-sm uppercase tracking-wider transition-colors duration-300 ease-premium -mb-px border-b-2",
              active === tab.id
                ? "border-copper text-espresso"
                : "border-transparent text-espresso-soft hover:text-copper"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <FadeIn key={active}>
        {active === "collection" && <MyCollectionTab />}
        {active === "favorites" && <FavoritesTab />}
        {active === "following" && <FollowingTab />}
        {active === "history" && <PurchaseHistoryTab />}
      </FadeIn>
    </div>
  );
}
