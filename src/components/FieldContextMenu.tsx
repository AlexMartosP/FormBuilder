"use client";

import { useMetaSideBarContext } from "@/context/metaSidebar/MetaSidebarProvider";
import { ContextMenuContent, ContextMenuItem } from "./ui/ContextMenu";

export default function FieldContextMenu({ fieldKey }: { fieldKey: string }) {
  const { updateCurrentEditingField } = useMetaSideBarContext();

  return (
    <ContextMenuContent>
      <ContextMenuItem onClick={() => updateCurrentEditingField(fieldKey)}>
        Edit
      </ContextMenuItem>
      <ContextMenuItem>Remove</ContextMenuItem>
    </ContextMenuContent>
  );
}
