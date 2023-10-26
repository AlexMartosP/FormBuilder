import { TOption } from "@/internals/types/options";
import Option from "./Option";

export default function OptionDragPreview({
  option,
  width,
}: {
  option: TOption;
  width: number;
}) {
  return (
    <div
      style={{
        width,
      }}
    >
      <Option option={option} />
    </div>
  );
}
