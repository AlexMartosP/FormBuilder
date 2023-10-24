"use client";

import { useEngine } from "@/context/EngineProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";

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
      <form>
        {engine.fields.map((engineField) => (
          <FormField
            key={engineField.key}
            control={form.control}
            name={engineField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{engineField.label}</FormLabel>
                <FormControl>
                  <engineField.element {...engineField.props} {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        ))}
      </form>
    </Form>
  );
}
