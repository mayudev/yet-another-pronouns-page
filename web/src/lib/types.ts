import { PronounType } from "./interfaces";

export function figureType(type: PronounType) {
  switch (type) {
    case PronounType.Primary:
      return "Yes";
    case PronounType.Okay:
      return "Okay";
    case PronounType.Friends:
      return "Only if we're close";
    case PronounType.Nope:
      return "Nope";
    default:
      return "Unknown";
  }
}
