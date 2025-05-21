
export enum Stat {
  Strength = "Strength (STR)",
  Agility = "Agility (AGI)",
  Intellect = "Intellect (INT)",
  Charisma = "Charisma (CHA)",
  Combat = "Combat (COM)",
  Defense = "Defense (DEF)"
}

export interface Archetype {
  name: string;
  description: string;
  bonus: string;
  gearIdea: string;
}

export interface CharacterStat {
  stat: Stat;
  value: number;
}

export interface GeneratedCharacter {
  archetype: Archetype;
  description: string;
  stats: CharacterStat[];
  hp: number;
  gear: string;
  trinket: string;
  catchphrase: string;
  definingTrait: { name: string, description: string };
  background: string;
  motivation: string;
}

export interface RollTableItem {
  name: string;
  description: string;
}

export interface CampaignLocation {
  name: string;
  description: string;
  mapPrompt?: string;
  whatHappens: string[];
  keyNPCs?: { name: string; stats?: string; special?: string; description?: string }[];
  goonStatBlock?: { name: string; hp: string; combat: string; agility?: string; defense: string; notes?: string }[];
  combatEncounters?: string[];
  actionHeroCameo?: string;
}

export interface Campaign {
  id: string;
  title: string;
  storyHook: string;
  worldMapConcept?: string;
  keyLocations: CampaignLocation[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category?: string;
}

export interface MenuItem {
  name: string;
  path: string;
}

// New type for the fillable character sheet
export interface FillableSheetData {
  name: string;
  archetypeName: string; // Store archetype name
  description: string;
  stats: { [key in Stat]: number };
  hp: number;
  maxHp: number;
  gear: string;
  trinket: string;
  catchphrase: string;
  definingTraitName: string;
  definingTraitDescription: string;
  background: string;
  motivation: string;
  stuntPoints: number;
  actionHeroFeats: string; // Using string for textarea
  signatureMoves: string; // Using string for textarea
}
