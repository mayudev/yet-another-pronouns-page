export interface UserData {
  id: string;
  username: string;
  bio: string;
  avatar: string;
  pronouns: Pronoun[];
}

export enum PronounType {
  Primary,
  Okay,
  Friends,
  Nope,
}

export interface Pronoun {
  pronoun: string;
  order: number;
  type: PronounType;
}
