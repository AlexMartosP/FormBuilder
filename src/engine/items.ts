import { Binary, Columns, Mail, PenBox, Phone } from "lucide-react";
import { Option } from "./types";

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
