import metaFieldsPreset from "../presets/fieldMetaPresets";
import { AllFields, FieldOptions } from "../types/fieldTypes/fields";
import { SupportedFields } from "../types/supports";
import { isSpecial } from "./helpers/isSpecialField";

export function createField<T extends SupportedFields>(id: T): AllFields[T] {
  const metaPreset = structuredClone(metaFieldsPreset[id]);

  const key = crypto.randomUUID();
  const name = generateRandomName();
  const label = generateRandomLabel();

  const options = isSpecial(id) && generateOptions(id);

  return {
    ...metaPreset,
    id,
    key,
    name,
    label,
    ...(options ? { options } : {}),
  };
}

const fieldNames = [
  "nomen",
  "cognomen",
  "emailus",
  "aetas",
  "colorfavoritus",
  "hobby",
  "numerusTelephoni",
  "domus",
  "codexPostalis",
  "commentarius",
  "praenomen",
  "cognomen",
  "sexus",
  "natus",
  "occupatio",
  "situsWeb",
  "studia",
  "educatio",
  "patria",
  "urbs",
  "status",
  "amicus",
  "familia",
  "locusNatalis",
  "scientia",
  "album",
  "scriptor",
  "rex",
  "respublica",
  "arte",
  "lingua",
  "musica",
  "liber",
  "virtus",
  "natio",
  "spectaculum",
  "tempus",
  "ludus",
  "scola",
];

function generateRandomName() {
  const index = Math.floor(Math.random() * fieldNames.length);

  return fieldNames[index];
}

const fieldLabels = [
  "Name Your Adventure",
  "Super Secret Alias",
  "Your Digital Identity",
  "Age of Wisdom",
  "Chroma Dreams",
  "Passion Unleashed",
  "Call Me, Maybe?",
  "Address of Dreams",
  "Zip Code of Wonder",
  "Tell Us Your Story",
  "First Impression",
  "Lasting Legacy",
  "Your Identity Unveiled",
  "Date of Emergence",
  "Claim Your Title",
  "Your Online Hub",
  "Your Fascinations",
  "Learning Journey",
  "Your World Coordinates",
  "Urban Hideaway",
  "Regional Base",
  "Best Buddy",
  "Relationship Status Saga",
  "Culinary Delights",
  "Dreamscape Destination",
  "Furry Companions",
  "Literary Escape",
  "Unmask Your Alter Ego",
  "Moniker of Choice",
  "Movie Magic",
  "Dream Career",
  "Celestial Sign",
  "Animal Spirit Guide",
  "Sporty Pursuits",
  "Globe-Trotter's Paradise",
  "Hidden Talents Revealed",
  "Guilty Pleasures Confessed",
  "Life's Motto or Fave Quote",
];

function generateRandomLabel() {
  const index = Math.floor(Math.random() * fieldLabels.length);

  return fieldLabels[index];
}

function generateOptions(id: SupportedFields): FieldOptions[] {
  const options: FieldOptions[] = [];

  options.push({
    value: "default",
    label: "Default",
    id: crypto.randomUUID(),
  });

  for (let i = 0; i < 3; i++) {
    const label = generateRandomLabel();

    options.push({
      value: label.toLowerCase().replace(" ", "-"),
      label,
      id: crypto.randomUUID(),
    });
  }

  return options;
}
