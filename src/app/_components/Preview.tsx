"use client";

import Columns from "@/components/Columns";
import EmptyColumn from "@/components/EmptyColumn";
import PreviewField from "@/components/PreviewField";
import { Form } from "@/components/ui/Form";
import { useEngine } from "@/context/EngineProvider";
import ColumnField from "@/internals/fieldClasses/columnsField";
import InputField from "@/internals/fieldClasses/inputField";
import { SomeField } from "@/internals/types/fields";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Preview() {
  const { engine } = useEngine();

  // Form schema
  const formSchema = z.object({
    ...engine.schema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: engine.defaultValues,
  });

  function handleSubmit(e: z.infer<typeof formSchema>) {
    console.log(e);
  }

  function renderField(field: SomeField) {
    if (field instanceof InputField) {
      return (
        <PreviewField
          key={field.key}
          engineField={field}
          control={form.control}
        />
      );
    } else if (field instanceof ColumnField) {
      return (
        <Columns key={field.id} amount={field.amount}>
          {field.columns.length > 0 ? (
            <>{field.columns.map((innerField) => renderField(innerField))}</>
          ) : (
            <>
              {new Array(field.amount).fill(null).map((_, i) => (
                <EmptyColumn key={i} />
              ))}
            </>
          )}
        </Columns>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {engine.fields.map((engineField) => renderField(engineField))}
        <button>Submit</button>
      </form>
    </Form>
  );
}
