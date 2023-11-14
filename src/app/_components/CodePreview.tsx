"use client";

import { useConfig } from "@/context/config/ConfigProvider";
import { useEngine } from "@/context/engine/EngineProvider";
import ColumnField from "@/internals/fieldClasses/columnsField";
import { IEngine, Schema } from "@/internals/types/engine";
import {
  AllFields,
  SomeField,
  SomeFieldExceptColumn,
  SpecialField,
} from "@/internals/types/fieldTypes/fields";
import { SupportedFields, SupportedStylers } from "@/internals/types/supports";
import getProps from "@/internals/utils/getProps";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

const template = `
  "use client";

  import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/Form";
  import { Input } from "@/components/ui/Input";
  import { Button } from "@/components/ui/Button";
  import { Checkbox } from "@/components/ui/Checkbox";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import * as z from "zod";

  type TForm = {
    onSubmit: () => void;
  }

  {{{typeOutput}}}

  export default function FormComp({onSubmit}: TForm) {
    {{{componentOutput}}}
  }
`;

export default function CodePreview() {
  const { engine } = useEngine();
  const { config } = useConfig();
  const [output, setOtput] = useState("");

  function renderReactHookFormZodCode() {
    const typeOutput = `
    const formSchema = z.object(
      ${objectToString(getSchemaCode(engine.schema))}
      );
      `;

    let componentOutput = "";
    componentOutput = `
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: ${objectToString(engine.defaultValues)}
      })

      function handleSubmit(e: z.infer<typeof formSchema>) {
        onSubmit(e);
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            ${getFormJSX(engine.structure, engine.fields, config.styler)}
            <Button>Submit</Button>
          </form>
        </Form>
      )
    `;

    return template
      .replace("{{{typeOutput}}}", typeOutput)
      .replace("{{{componentOutput}}}", componentOutput);
  }

  useEffect(() => {
    async function prettify() {
      const prettyString = renderReactHookFormZodCode();

      setOtput(prettyString);
    }
    prettify();
  }, []);

  return (
    <SyntaxHighlighter
      language="typescript"
      showLineNumbers
      wrapLines
      style={tomorrowNightBright}
    >
      {output}
    </SyntaxHighlighter>
  );
}

function objectToString(obj: object) {
  let output: string = "{";

  for (let [key, value] of Object.entries(obj)) {
    output += `${key}: ${valueToString(value)},`;
  }

  output += "}";

  return output;
}

function arrayToString(arr: any[]) {
  let output: string = "[";

  for (let item of arr) {
    output += valueToString(item);
  }

  output += "]";

  return output;
}

function valueToString(value: any): string {
  if (typeof value === "string" && !value.startsWith("//")) {
    return `"${value}"`;
  }

  if (typeof value === "string" && value.startsWith("//")) {
    return value.substring(2);
  }

  // Potential infinite recursion
  if (Array.isArray(value)) {
    return arrayToString(value);
  }

  return value;
}

function getSchemaCode(schema: Schema) {
  let obj: Record<string, string> = {};

  for (let [key, value] of Object.entries(schema)) {
    obj[key] = "//" + value.code;
  }

  return obj;
}

function objectToProps(obj: Object) {
  let output: string = "";

  for (let [key, value] of Object.entries(obj)) {
    output += `${key}=${valueToString(value)} `;
  }

  return output;
}

function shadcn_input(field: SomeFieldExceptColumn) {
  return `<Input ${objectToProps(getProps(field))} {...field} />`;
}

function shadcn_checkbox(field: SpecialField) {
  return `<div>
    ${field.options
      .map(
        (option) =>
          `<div className="flex items-center gap-2">
          <Checkbox
          id="${option.value}"
          value="${option.value}"
          checked={field.value ? field.value.includes("${option.value}") : false}
          onCheckedChange={(checked) => {
            return checked
              ? field.onChange([...field.value, "${option.value}"])
              : field.onChange(field.value?.filter((v) => v !== "${option.value}"));
          }}
        />
        <FormLabel htmlFor="${option.value}">${option.label}</FormLabel>
      </div>`
      )
      .join("")}
  </div>`;
}

type FieldsWCode = {
  [fieldKey in SupportedFields]: {
    [styleKey in SupportedStylers]: (field: any) => string;
  };
};
const fieldTemplates: FieldsWCode = {
  text_input: {
    shadcn: shadcn_input,
  },
  email_input: {
    shadcn: shadcn_input,
  },
  phone_input: {
    shadcn: shadcn_input,
  },
  number_input: {
    shadcn: shadcn_input,
  },
  checkbox: {
    shadcn: shadcn_checkbox,
  },
  radio: {
    shadcn: shadcn_input,
  },
};

function getFormJSX(
  structure: IEngine["structure"],
  fields: IEngine["fields"],
  styler: SupportedStylers
) {
  let output = "";

  for (let key of structure) {
    if (!(key instanceof ColumnField)) {
      const field = fields[key];

      output += `<FormField
      control={form.control}
      name="${field.name}"
      render={({ field }) => (
        <FormItem>
          <FormLabel>${field.label}</FormLabel>
          <FormControl>
             ${fieldTemplates[field.id][styler](field)}
          </FormControl>
        </FormItem>
      )}>
    </FormField>`;
    } else {
      output += `
      <div className="flex gap-4">
        ${getColumnsJSX(key.columns, fields, styler)}
      </div>
      `;
    }
  }

  return output;
}

function getColumnsJSX(
  columns: ColumnField["columns"],
  fields: IEngine["fields"],
  styler: SupportedStylers
) {
  let output = "";

  for (let i = 0; i < columns.length; i++) {
    output += `<div className="column">`;

    for (let j = 0; j < columns[i].length; j++) {
      output += getFormJSX(columns[i], fields, styler);
    }

    output += "</div>";
  }

  return output;
}
