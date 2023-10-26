import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Columns({
  children,
  amount,
}: {
  children: ReactNode;
  amount: number;
}) {
  return <div className="flex gap-4">{children}</div>;
}
