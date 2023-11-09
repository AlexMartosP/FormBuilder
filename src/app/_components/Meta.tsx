import Field from "@/components/field/Field";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useEngine } from "@/context/engine/EngineProvider";
import { useMetaSideBarContext } from "@/context/metaSidebar/MetaSidebarProvider";
import { RuleSet } from "@/internals/types/fields";

export default function Meta() {
  const { currentEditingField } = useMetaSideBarContext();
  const { updateField } = useEngine();

  if (!currentEditingField) {
    return null;
  }

  function updateMeta(key: "name" | "label", value: string) {
    if (currentEditingField) {
      currentEditingField[key] = value;

      updateField(currentEditingField.key, currentEditingField);
    }
  }

  function enableRule(rule: keyof RuleSet) {
    if (currentEditingField) {
      if (currentEditingField.rules[rule]) {
        currentEditingField.rules[rule]!.enabled =
          !currentEditingField.rules[rule]!.enabled;

        updateField(currentEditingField.key, currentEditingField);
      }
    }
  }

  function updateRuleValue(rule: keyof RuleSet, value: string) {
    if (currentEditingField) {
      if (currentEditingField.rules[rule]) {
        currentEditingField.rules[rule]!.value = value;

        updateField(currentEditingField.key, currentEditingField);
      }
    }
  }

  return (
    <div>
      <p>Editing {currentEditingField.label}</p>
      <div className="py-4"></div>
      <div>
        <Label>Name</Label>
        <Input
          onChange={(e) => updateMeta("name", e.target.value)}
          value={currentEditingField.name}
        />
      </div>
      <div className="py-2"></div>
      <div>
        <Label>Label</Label>
        <Input
          onChange={(e) => updateMeta("label", e.target.value)}
          value={currentEditingField.label}
        />
      </div>
      <div className="py-4"></div>
      <h2>Rules</h2>
      <div className="py-2"></div>
      <div className="flex flex-col gap-4">
        {Object.entries(currentEditingField.rules).map(([key, value]) => (
          <div key={key}>
            <div className="flex gap-2">
              <Checkbox
                id={key}
                checked={value.enabled}
                onCheckedChange={() => enableRule(key as keyof RuleSet)}
              />
              <Label htmlFor={key}>{value.label}</Label>
            </div>
            {value.enabled && value.type !== "checkbox" && (
              <div className="pt-2 pb-4">
                <Field
                  placeholder={value.label}
                  defaultValue={value.value.toString()}
                  onChange={(value) =>
                    updateRuleValue(key as keyof RuleSet, value)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
