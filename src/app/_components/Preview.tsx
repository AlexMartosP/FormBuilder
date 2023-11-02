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
import { Indexes } from "@/internals/types/engine";
import { IColumnField, SomeField } from "@/internals/types/fields";
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

  function renderField(
    fieldKey: string | ColumnField,
    indexes: Indexes[string]
  ) {
    if (!(fieldKey instanceof ColumnField)) {
      const fieldMeta = engine.fields[fieldKey];

      if (fieldMeta instanceof InputField) {
        return (
          <BottomDropZone
            key={fieldMeta.key}
            fieldKey={fieldMeta.key}
            indexes={indexes}
          >
            {!indexes.columnIndex ? (
              <SidesDropZone fieldKey={fieldMeta.key} indexes={indexes}>
                <FormField
                  control={form.control}
                  name={fieldMeta.name}
                  render={({ field }) => (
                    <FormItem>
                      <DraggableInputField
                        engineField={fieldMeta}
                        indexes={indexes}
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
                      indexes={indexes}
                      {...field}
                    />
                  </FormItem>
                )}
              ></FormField>
            )}
          </BottomDropZone>
        );
      }
    } else if (fieldKey instanceof ColumnField) {
      return (
        <BottomDropZone
          key={fieldKey.key}
          fieldKey={fieldKey.key}
          indexes={indexes}
        >
          <Columns amount={fieldKey.amount}>
            {fieldKey.columns.map((column, c) => (
              <div className="flex-1">
                {column.length > 0 ? (
                  <>
                    {column.map((innerFieldKey, f) =>
                      renderField(innerFieldKey, {
                        topIndex: indexes.topIndex,
                        columnIndex: c,
                        fieldIndex: f,
                      })
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
        {engine.structure.map((fieldKey, i) =>
          renderField(fieldKey, {
            topIndex: i,
            columnIndex: null,
            fieldIndex: i,
          })
        )}
        <button>Submit</button>
      </form>
    </Form>
  );
}
