"use client";

import { ItemTypes } from "@/internals/types/DND";
import { TOption } from "@/internals/types/options";
import { useDrag } from "react-dnd";
import Option from "./Option";
import { useEffect, useRef } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function DraggableOption({ option }: { option: TOption }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.Option,
    item: () => {
      return {
        ...option,
        width: widthElementRef.current?.getBoundingClientRect().width,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const widthElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div ref={widthElementRef}>
      <div
        ref={drag}
        role="DraggableBox"
        style={{
          opacity: isDragging ? "0.5" : "1",
        }}
      >
        <Option option={option} />
      </div>
    </div>
  );
}
