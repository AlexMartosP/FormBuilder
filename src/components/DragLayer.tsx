"use client";

import { useDragLayer } from "react-dnd";

export default function DragLayer() {
  const collectedProps = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
  }));

  return <div></div>;
}
