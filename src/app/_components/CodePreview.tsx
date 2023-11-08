"use client";

import { useEngine } from "@/context/engine/EngineProvider";
import ColumnField from "@/internals/fieldClasses/columnsField";
import { IEngine, Schema } from "@/internals/types/engine";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

const template = `
  import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/Form";
  import { Input } from "@/components/ui/Input";
  import { Button } from "@/components/ui/Button";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import * as z from "zod";

  type TForm = {
    onSubmit: () => void;
  }

  {{{typeOutput}}}

  export default function Form({onSubmit}) {
    {{{componentOutput}}}
  }
`;

export default function CodePreview() {
  const { engine } = useEngine();
  const [output, setOtput] = useState("");

  function renderReactHookFormZodCode() {
    const typeOutput = `
    type formSchema = z.object(
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
            ${getFormJSX(engine.structure, engine.fields)}
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
    output += `${key}: ${typeof value === "string" ? `"${value}"` : value},`;
  }

  output += "}";

  return output;
}

function getSchemaCode(schema: Schema) {
  let obj: Record<string, string> = {};

  for (let [key, value] of Object.entries(schema)) {
    obj[key] = value.code;
  }

  return obj;
}

function getFormJSX(
  structure: IEngine["structure"],
  fields: IEngine["fields"]
) {
  let output = "";

  for (let key of structure) {
    if (!(key instanceof ColumnField)) {
      const field = fields[key];

      output += `
      <FormField
        control={form.control}
        name="${field.name}"
        render={({ field }) => (
          <FormItem>
            <FormLabel>${field.label}</FormLabel>
            <FormControl>
              <Input />
            </FormControl>
          </FormItem>
        )}>
      </FormField>`;
    } else {
      output += `
      <div className="columns">
        ${getColumnsJSX(key.columns, fields)}
      </div>
      `;
    }
  }

  return output;
}

function getColumnsJSX(
  columns: ColumnField["columns"],
  fields: IEngine["fields"]
) {
  let output = "";

  for (let i = 0; i < columns.length; i++) {
    output += `<div className="column">`;

    for (let j = 0; j < columns[i].length; j++) {
      output += getFormJSX(columns[i], fields);
    }

    output += "</div>";
  }

  return output;
}
