import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";

export default function Columns({
  children,
  amount,
}: {
  children: ReactNode;
  amount: number;
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        amount === 1 && "grid-cols-1",
        amount === 2 && "grid-cols-2"
      )}
    >
      {children}
    </div>
  );
}
