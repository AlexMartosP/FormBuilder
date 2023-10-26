"use client";

import Image from "next/image";
import Options from "./_components/Options";
import Preview from "./_components/Preview";
import EngineProvider from "@/context/engine/EngineProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "@/components/CustomDragLayer";

export default function Home() {
  return (
    <main>
      <EngineProvider>
        <DndProvider backend={HTML5Backend}>
          <CustomDragLayer />
          <div className="flex min-h-screen">
            <div className="p-4 w-1/4 border-r border-r-1">
              <Options />
            </div>
            <div className="p-4 flex-1">
              <Preview />
            </div>
          </div>
        </DndProvider>
      </EngineProvider>
    </main>
  );
}
