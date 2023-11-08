"use client";

import CustomDragLayer from "@/components/CustomDragLayer";
import EngineProvider from "@/context/engine/EngineProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Meta from "./_components/Meta";
import Options from "./_components/Options";
import Preview from "./_components/Preview";
import MetaSidebarProvider from "@/context/metaSidebar/MetaSidebarProvider";
import ConfigProvider from "@/context/config/ConfigProvider";
import Toolbar from "./_components/Toolbar";

export default function Home() {
  return (
    <main>
      <ConfigProvider>
        <EngineProvider>
          <MetaSidebarProvider>
            <DndProvider backend={HTML5Backend}>
              <CustomDragLayer />
              <div className="flex min-h-screen">
                <div className="p-4 w-1/4 border-r border-r-1">
                  <Options />
                </div>
                <div className="p-4 flex-1">
                  <Toolbar />
                  <Preview />
                </div>
                <div className="p-4 w-1/4 border-l border-l-1">
                  <Meta />
                </div>
              </div>
            </DndProvider>
          </MetaSidebarProvider>
        </EngineProvider>
      </ConfigProvider>
    </main>
  );
}
