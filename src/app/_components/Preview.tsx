"use client";

import Columns from "@/components/Columns";
import EmptyColumn from "@/components/EmptyColumn";
import BottomDropZone from "@/components/dropzones/BottomDropZone";
import SidesDropZone from "@/components/dropzones/SidesDropZone";
import DraggableInputField from "@/components/inputField/DraggableInputField";
import { Form, FormField, FormItem } from "@/components/ui/Form";
import { useEngine } from "@/context/engine/EngineProvider";
import ColumnField from "@/internals/fieldClasses/columnsField";
import InputField from "@/internals/fieldClasses/inputField";
import { SomeField } from "@/internals/types/fields";
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

  function renderField(fieldMeta: SomeField, columnKey?: string) {
    if (fieldMeta instanceof InputField) {
      return (
        <BottomDropZone
          key={fieldMeta.key}
          fieldKey={fieldMeta.key}
          columnKey={columnKey}
        >
          {!columnKey ? (
            <SidesDropZone fieldKey={fieldMeta.key} columnKey={columnKey}>
              <FormField
                control={form.control}
                name={fieldMeta.name}
                render={({ field }) => (
                  <FormItem>
                    <DraggableInputField
                      engineField={fieldMeta}
                      columnKey={columnKey}
                      {...field}
                    />
                  </FormItem>
                )}
              ></FormField>
            </SidesDropZone>
          ) : (
            <FormField
              control={form.control}
              name={fieldMeta.name}
              render={({ field }) => (
                <FormItem>
                  <DraggableInputField
                    engineField={fieldMeta}
                    columnKey={columnKey}
                    {...field}
                  />
                </FormItem>
              )}
            ></FormField>
          )}
        </BottomDropZone>
      );
    } else if (fieldMeta instanceof ColumnField) {
      return (
        <BottomDropZone key={fieldMeta.key} fieldKey={fieldMeta.key}>
          <Columns amount={fieldMeta.amount}>
            {fieldMeta.columns.map((column) => (
              <div className="flex-1">
                {column.length > 0 ? (
                  <>
                    {column.map((innerField) =>
                      renderField(innerField, fieldMeta.key)
                    )}
                  </>
                ) : (
                  <>
                    {new Array(1).fill(null).map((_, i) => (
                      <EmptyColumn key={i} />
                    ))}
                  </>
                )}
              </div>
            ))}
          </Columns>
        </BottomDropZone>
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
