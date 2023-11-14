import Field from "@/components/formBuilder/internal/internalField/Field";
import OptionsField from "@/components/formBuilder/internal/internalField/OptionsField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useEngine } from "@/context/engine/EngineProvider";
import { useMetaSideBarContext } from "@/context/metaSidebar/MetaSidebarProvider";
import { RuleSet } from "@/internals/types/fieldTypes/rules";
import { isSpecialField } from "@/internals/utils/helpers/isSpecialField";

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

  function updateProp(key: string, value: string) {
    if (currentEditingField) {
      currentEditingField.props[key].value = value;

      updateField(currentEditingField.key, currentEditingField);
    }
  }

  function updateOptions(optionId: string, value: string, label: string) {
    if (currentEditingField && isSpecialField(currentEditingField)) {
      currentEditingField.options = currentEditingField.options.map(
        (option) => {
          if (option.id === optionId) {
            return {
              id: optionId,
              value,
              label,
            };
          }

          return option;
        }
      );

      updateField(currentEditingField.key, currentEditingField);
    }
  }

  function deleteOption(optionId: string) {
    if (currentEditingField && isSpecialField(currentEditingField)) {
      currentEditingField.options = currentEditingField.options.filter(
        (option) => option.id !== optionId
      );

      updateField(currentEditingField.key, currentEditingField);
    }
  }

  return (
    <div>
      <p>Editing {currentEditingField.label}</p>
      <div className="py-4"></div>
      <h2>Basic</h2>
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
      <h2>Props</h2>
      {Object.entries(currentEditingField.props).map(([key, value]) => (
        <>
          {key !== "type" && (
            <div key={key}>
              <Field
                label={value.label}
                value={value.value}
                type={value.type}
                options={
                  isSpecialField(currentEditingField)
                    ? currentEditingField.options
                    : undefined
                }
                onChange={(e) => updateProp(key, e.target.value)}
              />
            </div>
          )}
        </>
      ))}
      <div className="py-4"></div>
      {isSpecialField(currentEditingField) && (
        <>
          <h2>Options</h2>
          <OptionsField
            options={currentEditingField.options}
            onChange={(changedId, value, label) =>
              updateOptions(changedId, value, label)
            }
            onDelete={deleteOption}
          />
          <div className="py-4"></div>
        </>
      )}
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
                  type="text_input"
                  placeholder={value.label}
                  value={value.value.toString()}
                  onChange={(e) =>
                    updateRuleValue(key as keyof RuleSet, e.target.value)
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
