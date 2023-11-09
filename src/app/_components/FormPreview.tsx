"use client";

import Columns from "@/components/Columns";
import EmptyColumn from "@/components/EmptyColumn";
import BottomDropZone from "@/components/dropzones/BottomDropZone";
import SidesDropZone from "@/components/dropzones/SidesDropZone";
import DraggableField from "@/components/field/DraggableField";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { useEngine } from "@/context/engine/EngineProvider";
import ColumnField from "@/internals/fieldClasses/columnsField";
import { Indexes, Schema } from "@/internals/types/engine";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function FormPreview() {
  const { engine } = useEngine();

  const formSchema = z.object({
    ...(getSchemaTypes(engine.schema) as z.ZodRawShape),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: async (data, context, options) => {
      console.log(formSchema);
      return zodResolver(formSchema)(data, context, options);
    },
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

      if (fieldMeta) {
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
                      <DraggableField
                        engineField={fieldMeta}
                        indexes={indexes}
                        {...field}
                      />
                      <FormMessage />
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
                    <DraggableField
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
              <div className="flex-1" key={c}>
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

function getSchemaTypes(schema: Schema) {
  let obj: Record<string, object> = {};

  for (let [key, value] of Object.entries(schema)) {
    obj[key] = value.type;
  }

  return obj;
}
