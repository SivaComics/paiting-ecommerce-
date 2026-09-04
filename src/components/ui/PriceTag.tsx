import { formatPrice } from "@/lib/format";
import { clsx } from "clsx";

export function PriceTag({
  price,
  currency = "USD",
  availability,
  className,
}: {
  price: number;
  currency?: string;
  availability?: "available" | "on-hold" | "sold";
  className?: string;
}) {
  if (availability === "sold") {
    return <span className={clsx("font-sans text-sm text-espresso-soft", className)}>Sold</span>;
  }
  return (
    <span className={clsx("font-sans text-sm text-espresso", className)}>
      {formatPrice(price, currency)}
      {availability === "on-hold" && <span className="ml-2 text-espresso-soft">On Hold</span>}
    </span>
  );
}
