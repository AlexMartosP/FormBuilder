"use client";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type TForm = {
  onSubmit: () => void;
};

const formSchema = z.object({
  commentarius: z.coerce.number().min(1, {
    message: undefined,
  }),
  numerusTelephoni: z.string().email().min(1, {
    message: undefined,
  }),
  tempus: z.string().min(1, {
    message: undefined,
  }),
  liber: z.array(z.string()).min(1, {
    message: undefined,
  }),
  educatio: z.string().email().min(1, {
    message: undefined,
  }),
  locusNatalis: z.string().min(1, {
    message: undefined,
  }),
  scriptor: z.string().min(1, {
    message: undefined,
  }),
});

export default function FormComp({ onSubmit }: TForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commentarius: 0,
      numerusTelephoni: "",
      tempus: "",
      liber: ["default"],
      educatio: "",
      locusNatalis: "",
      scriptor: "",
    },
  });

  function handleSubmit(e: z.infer<typeof formSchema>) {
    onSubmit(e);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="scriptor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Best Buddy</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Test" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="commentarius"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Digital Identity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="numerusTelephoni"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Digital Identity</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="tempus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chroma Dreams</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="liber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Animal Spirit Guide</FormLabel>
              <FormControl>
                <div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="default"
                      value="default"
                      checked={
                        field.value ? field.value.includes("default") : false
                      }
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, "default"])
                          : field.onChange(
                              field.value?.filter((v) => v !== "default")
                            );
                      }}
                    />
                    <FormLabel htmlFor="default">Default</FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="lasting-legacy"
                      value="lasting-legacy"
                      checked={
                        field.value
                          ? field.value.includes("lasting-legacy")
                          : false
                      }
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, "lasting-legacy"])
                          : field.onChange(
                              field.value?.filter((v) => v !== "lasting-legacy")
                            );
                      }}
                    />
                    <FormLabel htmlFor="lasting-legacy">
                      Lasting Legacy
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="lasting-legacy"
                      value="lasting-legacy"
                      checked={
                        field.value
                          ? field.value.includes("lasting-legacy")
                          : false
                      }
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, "lasting-legacy"])
                          : field.onChange(
                              field.value?.filter((v) => v !== "lasting-legacy")
                            );
                      }}
                    />
                    <FormLabel htmlFor="lasting-legacy">
                      Lasting Legacy
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="your-digital identity"
                      value="your-digital identity"
                      checked={
                        field.value
                          ? field.value.includes("your-digital identity")
                          : false
                      }
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([
                              ...field.value,
                              "your-digital identity",
                            ])
                          : field.onChange(
                              field.value?.filter(
                                (v) => v !== "your-digital identity"
                              )
                            );
                      }}
                    />
                    <FormLabel htmlFor="your-digital identity">
                      Your Digital Identity
                    </FormLabel>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <div className="flex gap-4">
          <div className="column">
            <FormField
              control={form.control}
              name="tempus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chroma Dreams</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="column">
            <FormField
              control={form.control}
              name="liber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal Spirit Guide</FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="default"
                          value="default"
                          checked={
                            field.value
                              ? field.value.includes("default")
                              : false
                          }
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, "default"])
                              : field.onChange(
                                  field.value?.filter((v) => v !== "default")
                                );
                          }}
                        />
                        <FormLabel htmlFor="default">Default</FormLabel>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="lasting-legacy"
                          value="lasting-legacy"
                          checked={
                            field.value
                              ? field.value.includes("lasting-legacy")
                              : false
                          }
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  "lasting-legacy",
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (v) => v !== "lasting-legacy"
                                  )
                                );
                          }}
                        />
                        <FormLabel htmlFor="lasting-legacy">
                          Lasting Legacy
                        </FormLabel>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="lasting-legacy"
                          value="lasting-legacy"
                          checked={
                            field.value
                              ? field.value.includes("lasting-legacy")
                              : false
                          }
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  "lasting-legacy",
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (v) => v !== "lasting-legacy"
                                  )
                                );
                          }}
                        />
                        <FormLabel htmlFor="lasting-legacy">
                          Lasting Legacy
                        </FormLabel>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="your-digital identity"
                          value="your-digital identity"
                          checked={
                            field.value
                              ? field.value.includes("your-digital identity")
                              : false
                          }
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  "your-digital identity",
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (v) => v !== "your-digital identity"
                                  )
                                );
                          }}
                        />
                        <FormLabel htmlFor="your-digital identity">
                          Your Digital Identity
                        </FormLabel>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>

        <Button>Submit</Button>
      </form>
    </Form>
  );
}
