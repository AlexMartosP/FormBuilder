"use client";

import Columns from "@/components/Columns";
import EmptyColumn from "@/components/EmptyColumn";
import PreviewField from "@/components/PreviewField";
import { Form } from "@/components/ui/Form";
import { useEngine } from "@/context/EngineProvider";
import ColumnField from "@/engine/columns";
import Field from "@/engine/field";
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

  return (
    <Form {...form}>
      <form className="space-y-4">
        {engine.fields.map((engineField) => {
          if (engineField instanceof Field) {
            return (
              <PreviewField
                key={engineField.key}
                engineField={engineField}
                control={form.control}
              />
            );
          } else if (engineField instanceof ColumnField) {
            return (
              <Columns key={engineField.id} amount={engineField.amount}>
                {engineField.columns.length > 0 ? (
                  <>
                    {engineField.columns.map((innerField) => (
                      <PreviewField
                        key={innerField.key}
                        engineField={innerField}
                        control={form.control}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {new Array(engineField.amount).fill(null).map((_, i) => (
                      <EmptyColumn key={i} />
                    ))}
                  </>
                )}
              </Columns>
            );
          }
        })}
      </form>
    </Form>
  );
}
