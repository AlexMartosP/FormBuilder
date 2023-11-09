import {
  Binary,
  CheckSquare,
  Columns,
  Mail,
  PenBox,
  Phone,
} from "lucide-react";
import { TOption } from "../types/options";

const options: TOption[] = [
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
    label: "Checkboxes",
    icon: CheckSquare,
    id: "checkbox",
  },
  // {
  //   label: "Columns",
  //   icon: Columns,
  //   id: "columns",
  // },
];

export default options;
