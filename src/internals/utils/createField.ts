import metaFieldsPreset from "../presets/metaFieldsPreset";
import { rulePresets } from "../presets/rulePresets";
import { ExtraProps, SomeFieldExceptColumn, Test } from "../types/fields";
import { AvailableFieldIds } from "../types/ids";

export function createField<T extends AvailableFieldIds>(id: T): Test[T] {
  const metaPreset = structuredClone(metaFieldsPreset[id]);

  const key = crypto.randomUUID();
  const name = generateRandomName();
  const label = generateRandomLabel();

  const extraProps = generateExtraProps(id);

  return {
    ...metaPreset,
    id,
    key,
    name,
    label,
    extraProps,
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

function generateExtraProps(id: AvailableFieldIds): ExtraProps {
  switch (id) {
    case "text_input":
    case "number_input":
    case "email_input":
    case "phone_input":
      return {};
    case "checkbox":
    case "radio":
      const options = [];

      options.push({
        value: "default",
        label: "Default",
      });

      for (let i = 0; i < 3; i++) {
        const label = generateRandomLabel();

        options.push({
          value: label.toLowerCase().replace(" ", "-"),
          label,
        });
      }

      return {
        options: {
          label: "Options",
          type: "text_input",
          value: options,
        },
      };
  }
}
