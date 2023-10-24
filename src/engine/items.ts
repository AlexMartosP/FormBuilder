import { PenBox, Binary, Mail, Phone, Columns } from "lucide-react";
import { IField, Option } from "./types";
import { Input } from "@/components/ui/Input";
import Field from "./field";

const items: Option[] = [
  {
    label: "Text input",
    icon: PenBox,
    id: "text_input",
  },
  {
    label: "Number input",
    icon: Binary,
    id: "number_input",
  },
  {
    label: "Email input",
    icon: Mail,
    id: "email_input",
  },
  {
    label: "Phone input",
    icon: Phone,
    id: "phone_input",
  },
  {
    label: "Columns",
    icon: Columns,
    id: "columns",
  },
];

export default items;
