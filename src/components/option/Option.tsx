import { TOption } from "@/internals/types/options";

export default function Option({ option }: { option: TOption }) {
  return (
    <div
      className="p-2 shadow text-card-foreground bg-card border rounded-md"
      role="BoxPreview"
    >
      <div className="flex gap-2 items-center">
        <span>{<option.icon size={20} />}</span>
        <span className="text-sm text-muted-foreground font-medium">
          {option.label}
        </span>
      </div>
    </div>
  );
}
