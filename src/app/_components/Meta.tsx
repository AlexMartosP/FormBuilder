import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useEngine } from "@/context/engine/EngineProvider";
import { useMetaSideBarContext } from "@/context/metaSidebar/MetaSidebarProvider";

export default function Meta() {
  const { currentEditingField } = useMetaSideBarContext();
  const { updateField } = useEngine();

  if (!currentEditingField) {
    return null;
  }

  function handleInput(key: "name" | "label", value: string) {
    if (currentEditingField) {
      currentEditingField[key] = value;

      // updateField(currentEditingField);
    }
  }

  return (
    <div>
      <p>Editing {currentEditingField.label}</p>
      <div>
        <Label>Name</Label>
        <Input onChange={(e) => handleInput("name", e.target.value)} />
      </div>
      <div>
        <Label>Label</Label>
        <Input onChange={(e) => handleInput("label", e.target.value)} />
      </div>
    </div>
  );
}
