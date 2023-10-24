import Image from "next/image";
import Options from "./_components/Options";
import Preview from "./_components/Preview";
import EngineProvider from "@/context/EngineProvider";

export default function Home() {
  return (
    <main>
      <EngineProvider>
        <div className="flex min-h-screen">
          <div className="p-4 w-1/4 border-r border-r-1">
            <Options />
          </div>
          <div className="p-4 flex-1">
            <Preview />
          </div>
        </div>
      </EngineProvider>
    </main>
  );
}
