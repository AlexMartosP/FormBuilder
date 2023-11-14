import Field from "@/components/formBuilder/internal/internalField/Field";
import OptionsField from "@/components/formBuilder/internal/internalField/OptionsField";
import SelectField from "@/components/formBuilder/internal/internalField/SelectField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useEngine } from "@/context/engine/EngineProvider";
import { useMetaSideBarContext } from "@/context/metaSidebar/MetaSidebarProvider";
import fields from "@/internals/constants/fields";
import { RuleSet } from "@/internals/types/fieldTypes/rules";
import fieldHasOptions from "@/internals/utils/helpers/fieldHasOptions";
import fieldIsMultiple from "@/internals/utils/helpers/fieldIsMultiple";
import { isSpecialField } from "@/internals/utils/helpers/isSpecialField";

export default function Meta() {
  const { currentEditingField } = useMetaSideBarContext();
  const { updateField, engine } = useEngine();

  if (!currentEditingField) {
    return null;
  }

  const field = engine.fields[currentEditingField];
  const defaultValue = engine.defaultValues[field.name];

  function updateMeta(key: "name" | "label", value: string) {
    if (field) {
      field[key] = value;

      updateField(field.key, field);
    }
  }

  function updateDefaultValue(value: unknown) {
    if (currentEditingField) {
      updateField(field.key, field, value);
    }
  }

  function enableRule(rule: keyof RuleSet) {
    if (field) {
      if (field.rules[rule]) {
        field.rules[rule]!.enabled = !field.rules[rule]!.enabled;

        updateField(field.key, field);
      }
    }
  }

  function updateRuleValue(rule: keyof RuleSet, value: string) {
    if (field) {
      if (field.rules[rule]) {
        field.rules[rule]!.value = value;

        updateField(field.key, field);
      }
    }
  }

  function updateProp(key: string, value: string) {
    if (field) {
      field.props[key].value = value;

      updateField(field.key, field);
    }
  }

  function updateOptions(optionId: string, value: string, label: string) {
    if (field && isSpecialField(field)) {
      field.options = field.options.map((option) => {
        if (option.id === optionId) {
          return {
            id: optionId,
            value,
            label,
          };
        }

        return option;
      });

      updateField(field.key, field);
    }
  }

  function deleteOption(optionId: string) {
    if (field && isSpecialField(field)) {
      field.options = field.options.filter((option) => option.id !== optionId);

      updateField(field.key, field);
    }
  }

  return (
    <div>
      <p>Editing {field.label}</p>
      <div className="py-4"></div>
      <h2>Basic</h2>
      <div>
        <Label>Name</Label>
        <Input
          onChange={(e) => updateMeta("name", e.target.value)}
          value={field.name}
        />
      </div>
      <div className="py-2"></div>
      <div>
        <Label>Default value</Label>
        {fieldHasOptions(field) && !fields[field.id].multiple ? (
          <SelectField
            options={field.options}
            placeholder={defaultValue as string}
            onChange={() => {}}
          />
        ) : (
          <Input
            onChange={(e) => updateDefaultValue(e.target.value)}
            value={defaultValue as string}
          />
        )}
      </div>
      <div className="py-2"></div>
      <div>
        <Label>Label</Label>
        <Input
          onChange={(e) => updateMeta("label", e.target.value)}
          value={field.label}
        />
      </div>
      <div className="py-4"></div>
      <h2>Props</h2>
      {Object.entries(field.props).map(([key, value]) => (
        <div key={key}>
          {key !== "type" && (
            <div>
              <Field
                label={value.label}
                value={value.value}
                type={value.type}
                options={isSpecialField(field) ? field.options : undefined}
                onChange={(e) => updateProp(key, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <div className="py-4"></div>
      {isSpecialField(field) && (
        <>
          <h2>Options</h2>
          <OptionsField
            options={field.options}
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
        {Object.entries(field.rules).map(([key, value]) => (
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
