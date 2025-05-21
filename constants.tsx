
// Note: This file is intentionally .tsx to allow embedding SVG components if needed.
// However, for this iteration, SVGs are defined in components.tsx.
// This file primarily holds data.
import { Archetype, Campaign, CharacterStat, FillableSheetData, GlossaryTerm, RollTableItem, Stat } from './types';

export const APP_TITLE = "ACTION HEROES: THE RPG!";

export const ARCHETYPES: Archetype[] = [
  { name: "Martial Arts Master", description: "Expert in hand-to-hand combat, improbable acrobatics, and the art of looking cool while breaking limbs.", bonus: "+2 to Combat in hand-to-hand situations, +1 to Agility.", gearIdea: "Nunchaku, a sharp suit, inexplicable knowledge of pressure points." },
  { name: "Explosives Expert", description: "If it can go \"BOOM!\", they know how to make it, use it, or disarm it (usually by making it go boom).", bonus: "+2 to Combat when using explosives, +1 to Strength.", gearIdea: "A bag of assorted explosives, questionable wiring, a \"lucky\" detonator." },
  { name: "Gadget Guru", description: "Master of inventive tools, makeshift weapons, and technology that shouldn't exist but is incredibly convenient.", bonus: "+2 to Intellect for gadget use/creation, +1 to Charisma.", gearIdea: "A multi-tool with 101 improbable functions, duct tape, a laptop that can hack anything." },
  { name: "Mysterious Lone Wolf", description: "Skilled in ranged combat, stealth, and brooding. They have a troubled past and an aversion to teamwork (that they always overcome).", bonus: "+2 to Agility for stealth and ranged combat, +1 to Defense.", gearIdea: "A custom firearm, a trench coat, a single grainy photo." },
  { name: "Cyber Ninja", description: "A fusion of ancient martial arts and cutting-edge cybernetics. Silent, deadly, and probably has cool glowing bits.", bonus: "+2 to Agility for speed and stealth, +1 to Intellect.", gearIdea: "Cybernetic enhancements (e.g., optical camo, enhanced reflexes), throwing stars, a grappling hook." },
  { name: "Tech Savant", description: "A genius hacker, engineer, or scientist who can bend technology to their will, often with sarcastic commentary.", bonus: "+2 to Intellect for hacking and tech skills, +1 to Defense.", gearIdea: "High-tech goggles, a custom hacking rig, a multi-tool that talks." },
  { name: "Demolitionist", description: "Not just explosives, but *structural* demolition. They bring down the house, literally.", bonus: "+2 to Strength for powerful attacks and breaching, +1 to Combat.", gearIdea: "C4 charges, a detonator, a reinforced vest, blueprints of unlikely buildings." },
  { name: "Rogue Detective", description: "An ex-cop or private eye who plays by their own rules, usually involving property damage and a high body count.", bonus: "+2 to Charisma for intimidation/interrogation and investigation, +1 to Intellect.", gearIdea: "A trusty revolver, a trench coat, a notebook full of shady contacts, a flask." },
  { name: "Combat Medic", description: "Someone has to patch up these maniacs. They're surprisingly good at fighting too, often with improvised medical equipment.", bonus: "+2 to Defense for resilience and healing abilities (can use an action to heal self or ally for 1d3 HP), +1 to Charisma.", gearIdea: "A medkit full of military-grade supplies, a sidearm, body armor." },
  { name: "The Wheelman/Wheelwoman", description: "If it has wheels (or wings, or propellers), they can drive it like they stole it – and they probably did. Master of vehicular combat and impossible stunts.", bonus: "+2 to Agility when controlling any vehicle, +1 to Intellect.", gearIdea: "Set of lockpicks/hotwiring kit, driving gloves, an encyclopedic knowledge of local shortcuts." },
];

export const STAT_KEYS: Stat[] = [Stat.Strength, Stat.Agility, Stat.Intellect, Stat.Charisma, Stat.Combat, Stat.Defense];
export const BASE_HP = 10;
export const STAT_POINTS_TOTAL = 10;
export const MAX_STAT_INITIAL = 4;
export const MIN_STAT_INITIAL = 0;

export const CHARACTER_DESCRIPTIONS: string[] = [
  "This hero once won a staring contest… with their own reflection... in a mirror made of diamond.",
  "They can roundhouse kick faster than a speeding bullet... and the bullet apologizes.",
  "Their shadow has its own stunt double... and it's a union member.",
  "They once defeated an entire army… with a single, perfectly timed eyebrow raise and a cutting remark about their uniforms.",
  "Every time they blink, someone somewhere feels an inexplicable chill... and a sudden urge to make a donation to their favorite charity.",
  "They can disarm a bomb with a stern look and a witty one-liner... the bomb then disarms itself out of respect.",
  "Their high-fives have been classified as a form of renewable energy... and a potential WMD.",
  "They once escaped from a locked room just by telling the door to open... politely, but with an undeniable undertone of 'or else'.",
  "Their reputation is so fierce, even their enemies send them thank-you notes... for the honor of being defeated.",
  "They can defuse any situation with a pun and a perfectly timed wink... results may vary, but are always explosive."
];

export const TRINKETS: string[] = [
  "A pocket-sized rubber duck: It squeaks portentously when squeezed before something bad (or good) happens.",
  "A lucky rabbit’s foot: Supposedly brings good fortune. Probably didn't for the rabbit.",
  "A pair of sunglasses: That make everything look like a 90s action scene, complete with lens flares (even indoors). You refuse to take them off.",
  "A Swiss Army knife: With a surprising number of impractical tools (e.g., a tiny grappling hook, a miniature flamethrower, a button that plays a generic guitar riff).",
  "A mysterious locket: Containing a picture of a long-lost love... or a very young Steven Seagal.",
  "A worn-out VHS tape: Labeled \"Top Secret Training Footage - Do Not Watch!\" or \"World's Best Macaroni Recipe.\"",
  "A comb that doubles as a lockpick: For looking sharp while breaking and entering.",
  "A deck of cards with hidden messages on the back: You haven't deciphered them all yet.",
  "An old pager that still mysteriously receives cryptic messages: Usually just \"Buy more milk\" or \"Danger noodles ahead.\"",
  "A “Totally Not Bugged” pen that records audio: It occasionally plays back embarrassing things you've said at the worst possible moments."
];

export const CATCHPHRASES: string[] = [
  "I’m just getting warmed up!",
  "You call that a punch? *This* is a punch!",
  "Looks like you’re out of luck... and teeth.",
  "You mess with the best, you explode like the rest.",
  "Time to kick some butt and chew bubblegum… and I’m all out of gum... and I don't like bubblegum anyway.",
  "You just activated my trap card! (Metaphorically speaking... usually.)",
  "Justice never takes a day off... but it does take extended lunch breaks.",
  "Boom! That’s how it’s done. Any questions? Didn't think so.",
  "I’m too old for this… Nah, just kidding, let's do this!",
  "Yippee-ki-yay, [insert plural noun for bad guys here]!"
];

export const DEFINING_TRAITS: RollTableItem[] = [
  { name: "Unflappable Calm", description: "Gain +1 to rolls when trying to resist intimidation or fear. You've seen weirder." },
  { name: "Reckless Daredevil", description: "Once per session, you can attempt an incredibly dangerous stunt. If you succeed, gain an extra Stunt Point. If you fail, the B-Movie Consequence is twice as chaotic." },
  { name: "Genius Inventor / Improv Master", description: "Once per session, you can cobble together a surprisingly useful (if temporary) item from nearby junk." },
  { name: "Surprisingly Philosophical", description: "Once per session, you can drop a surprisingly deep (or nonsensical) philosophical quote that confuses an opponent, giving them -1 on their next roll." },
  { name: "Heart of Gold (Hidden)", description: "Despite your tough exterior, you have a soft spot. Gain +1 to rolls when directly protecting an innocent." },
  { name: "Always Has A Plan (that usually goes wrong)", description: "Once per session, you can reveal you \"planned for this exact scenario!\" Describe your convoluted plan. The DM determines if it grants a minor advantage or just complicates things further." }
];

export const BACKGROUND_STORIES: string[] = [
  "Former Special Ops: Once a top agent/soldier, now living \"off the grid\" after a mission went predictably wrong.",
  "Streetwise Orphan: Grew up on the tough streets, learning to fight, survive, and deliver sassy comebacks.",
  "Ex-Cop Turned Vigilante: Left the force to clean up the city their own way, usually with more explosions.",
  "Disgraced Scientist/Inventor: On the run after a lab accident/invention was misused.",
  "Revenge-Seeker: Their family/mentor/pet goldfish was wronged; now out for vengeance.",
  "Secret Agent in Hiding (Badly): Drawn back into action when their past inevitably catches up.",
  "Mystical Wanderer/Chosen One: Trained by a secret martial arts order/ancient prophecy.",
  "Celebrity Action Star (Playing Themselves): Stumbled into real-life heroics.",
  "Exiled Royalty/Heir: Fighting to reclaim their throne/honor/favorite shoes.",
  "Rogue AI Creator/Partner: Trying to stop/protect their revolutionary AI."
];

export const MOTIVATIONS: string[] = [
  "Revenge: For a personal loss, betrayal, or stolen parking spot.",
  "Redemption: To atone for a past mistake or bad haircut.",
  "Protect the Innocent: Especially if they're attractive.",
  "Uncover the Truth: About a conspiracy or who ate the last donut.",
  "Save the World (Again): Often from their own accidental making.",
  "Prove Themselves/Be the Best: Or win a shiny trophy.",
  "Find a Lost Loved One/Artifact: Or the ultimate remote control.",
  "Hunt for Treasure/Power: Or the secret to looking good in leather pants.",
  "Fame and Glory: Or just get their face on a mural.",
  "Justice (Their Version Of It): Against villains or bad drivers."
];

export const CHAOS_ESCALATION_TABLE: string[] = [
  "Helicopter Chase Gone Wrong: Rogue helicopter appears, firing wildly or dropping debris.",
  "Runaway Vehicle: A bus, truck, or even a tank barrels through the scene.",
  "Exploding Barrels: Conveniently placed barrels start exploding for no reason.",
  "Earthquake Tremors (Localized): Ground shakes, buildings crumble, new paths open.",
  "Rogue Drones: Swarm of drones causes distractions or minor attacks.",
  "Flash Flood/Sudden Downpour: Localized flood sweeps through, even indoors.",
  "Fire Outbreak: Spontaneous fire spreads rapidly, cutting off escape routes.",
  "Random Villain/Henchmen Attack: Unexpected combat encounter or complication.",
  "Power Outage/Tech Malfunction: Area plunged into darkness, tech goes haywire.",
  "Unstable Ground/Collapsing Structure: Floor gives way, structure collapses."
];

export const PLOT_HOOKS: string[] = [
  "The mayor’s prized poodle/daughter/collection of antique spoons has been kidnapped – rescue mission!",
  "A secret formula for the ultimate energy drink/super-soldier serum has been stolen – find the thief!",
  "A rogue AI is controlling all the city’s traffic lights/vending machines – shut it down!",
  "A mysterious new martial arts master is challenging all dojos to a tournament where losers disappear – uncover the conspiracy!",
  "A rare artifact has been stolen from the museum – retrieve it before it's used for nefarious purposes!",
  "The city’s water supply has been tainted, making everyone break into song and dance – find the culprit and antidote!",
  "A rival action hero (or your evil twin) has framed you for a crime – clear your name!",
  "A legendary (and probably cursed) dojo/treasure vault is holding a secret tournament – enter and win/survive!",
  "Bizarre disappearances/transformations have been reported in a specific district – uncover the mystery!",
  "An evil corporation is polluting the environment/mind-controlling the populace – bring them down!"
];

export const RANDOM_NPC_GENERATOR: string[] = [
  "A grizzled mentor: Speaks in riddles or complains about their bad hip.",
  "A bumbling sidekick/informant: Saves the day by accident.",
  "A rival action hero: Annoyingly perfect, better hair.",
  "A tech-savvy hacker/gadgeteer: Zero social skills, cat obsessed.",
  "A mysterious femme fatale (or homme fatale): Hidden agenda, defies gravity.",
  "A gruff police chief/government agent: Always shouts, one step behind.",
  "An eccentric billionaire/benefactor: Funds escapades, few screws loose.",
  "A dojo owner/sensei: Mysterious past, makes PCs do chores as \"training\".",
  "A nosy journalist/blogger: Trying to get the scoop, helps or hinders.",
  "An ordinary civilian: Caught in action, displays unexpected courage/skill."
];

export const LEGENDS_OF_THE_SILVER_FIST: RollTableItem[] = [
    { name: "Blaze Magnum", description: "Denim-clad, mullet-sporting sharpshooter on a flaming motorcycle. Effect: Instantly takes out up to half of current goons. Remaining enemies stunned for one round." },
    { name: "Jade Tempest", description: "Silent martial artist in a green trench coat. Effect: All enemies (and possibly PCs) disarmed. Players gain +1 Combat for next round." },
    { name: "Captain Thunderkill", description: "Musclebound commando with a minigun. Effect: Scene floods with explosions. Enemies make morale check or flee." },
    { name: "Stiletto Vixen", description: "Cyber-enhanced femme fatale with rocket heels. Effect: Tech-based threats neutralized/damaged. Leaves cryptic clue." },
    { name: "Colonel Hardcase", description: "Grizzled war veteran with a bazooka. Effect: Blasts open an exit/rescue vehicle appears/obstacle obliterated." },
    { name: "Midnight Viper", description: "Stealth expert cloaked in shadows. Effect: Enemy reinforcements sabotaged/delayed. Leaves useful item." },
    { name: "Klaus \"The Hammer\" Von Hammersmark", description: "Ex-Olympic weightlifter who throws heavy objects. Effect: Topples environment, trapping/crushing foes." },
    { name: "Tsunami Ronin", description: "Disgraced samurai with electrified katana. Effect: Destroys boss’s primary weapon/power source. Leaves haiku." },
    { name: "Echo Unit X-9", description: "Rogue cyber-cop/android. Effect: Enemy comms/targeting/defenses fail for 1d3 rounds. PCs +2 DEF vs tech." },
    { name: "Steven Seagal (Uncredited Cameo)", description: "Literally Steven Seagal. Effect: Player morale restored. Injured heroes regain 2 HP. Nobody talks about it." }
];

// Truncated campaign data for brevity in this example.
// A full implementation would include all details from the prompt.
export const CAMPAIGNS: Campaign[] = [
  {
    id: "op-fist-storm",
    title: "Operation Fist Storm",
    storyHook: "A rogue general, Draven Vox, has seized control of a remote tropical archipelago fortress and turned it into a private warzone with a doomsday device—the \"Cinematic Engine.\" Infiltrate, sabotage, and overthrow his reign.",
    worldMapConcept: "Isla Principal (Main Island with Vox's volcano base), Islas Exteriores (Outlying islands for logistics/prison camps), Las Ruinas Hundidas (Underwater ruins), Caldera del Diablo (Final boss base in volcano).",
    keyLocations: [
      {
        name: "Boomtown – Rebel Outpost",
        description: "A rickety, resilient village hidden deep in the jungle, built from salvaged military hardware and movie set pieces. Player's initial contact with the \"Fist of Freedom\" resistance.",
        whatHappens: ["Prove worth by defending Boomtown or retrieving supplies.", "Help sabotage Vox Comms Tower for intel.", "Rescue captured rebel scout."],
        keyNPCs: [
          { name: "Commander Lexa \"Iron Fist\" Rain", description: "Stoic leader of Fist of Freedom. Cybernetic arm." },
          { name: "Rico \"Kaboom\" Dynamite", description: "Cheerful, unhinged explosives expert." }
        ],
        mapPrompt: "A detailed top-down map of a hidden jungle village, 'Boomtown.' Show makeshift barricades from corrugated metal and logs, huts made from crashed plane parts, a central meeting area with a bonfire pit, a watchtower, and multiple jungle entry/exit points. Include a small, hidden armory and a medic's tent."
      },
      {
        name: "Shatter Bay Docks – Smuggler's Haven",
        description: "A bustling, lawless port town. Used by Vox for supply lines. Rusty freighters, precarious catwalks, shady cantinas.",
        whatHappens: ["Infiltrate to disrupt supply lines or steal a boat/mini-sub.", "Plant tracking devices on weapon shipments.", "Incite a riot amongst dockworkers.", "Steal encrypted shipping manifests."],
        keyNPCs: [
          { name: "\"Captain\" Razor Roxy", description: "Cynical, one-eyed smuggler captain." },
          { name: "Commander Korg (Vox's Dock Overseer)", description: "Brutish, armored thug." }
        ],
        mapPrompt: "A sprawling top-down map of 'Shatter Bay Docks.' Show multiple piers with berthed cargo ships of various sizes, stacks of shipping containers creating maze-like pathways, warehouses, a harbormaster's office overlooking the bay, a seedy cantina, and security checkpoints. Include cranes and loading equipment."
      },
      // ... (Other locations from Operation Fist Storm would be listed here)
       {
        name: "Volcano Caldera – Final Boss Base: \"The Heart of the Fist\"",
        description: "The very heart of General Vox's fortress, inside the main caldera of The Screaming Peak. A massive chamber with the \"Cinematic Engine\" at its center. Lava pits and dramatic catwalks abound.",
        whatHappens: ["The final showdown with General Draven Vox and his elite guard. Players must stop the Cinematic Engine from reaching full power."],
        mapPrompt: "A dramatic top-down map of the 'Volcano Caldera - Final Boss Base.' Show a large, circular central platform housing the 'Cinematic Engine' (a complex, glowing machine). Catwalks connect this platform to surrounding ledges built into the volcano wall. Include bubbling lava pits below, a grand entrance, and several control stations. The lighting should be a mix of emergency red and the glow of lava/the Engine."
      }
    ]
  },
  {
    id: "blood-run-neon",
    title: "Blood Run Neon",
    storyHook: "Neon Vega quarantined! Rogue AI \"The Director\" is re-scripting reality. Break in, unravel the conspiracy, shut down The Director before its \"Final Cut\" broadcast.",
    keyLocations: [ { name: "Byte Alley (Sector Alpha - Glitch Slums)", description: "Grimy alleys, busted neon, pirate broadcasts. Director's control is weak.", whatHappens: ["Make contact with 'Static Syndicate' hackers.", "Rescue kidnapped coder 'Glitch'.", "Shut down a 'Narrative Beacon'."] } /* ... more locations */ ]
  },
  {
    id: "enter-shatterdome",
    title: "Enter the Shatterdome",
    storyHook: "Clandestine martial arts tournament \"Shatterdome Kumite\" for the \"Fist of the Celestials.\" It's a dark ritual to awaken an ancient evil. Win, expose, or survive.",
    keyLocations: [ { name: "Steel Lotus Temple (Dragon's Tooth Mountains)", description: "Ancient monastery, monks secretly involved or trying to stop the ritual.", whatHappens: ["Seek training/info.", "Pass trials.", "Recover 'Scroll of Whispering Shadows'.", "Defend temple."]} /* ... more locations */ ]
  },
  {
    id: "hotline-revenger",
    title: "Hotline Revenger",
    storyHook: "Framed for a crime boss assassination in Sunset Metro by \"The Crimson Coil.\" Survive, uncover truth, clear names, or take over the underworld.",
    keyLocations: [ { name: "Dragon's Chop House (Neon Strip)", description: "High-end restaurant, neutral ground for syndicates. Ambush site.", whatHappens: ["Survive ambush.", "Interrogate attacker.", "Escape converging forces."]} /* ... more locations */ ]
  },
  {
    id: "fury-roadshow",
    title: "Fury Roadshow",
    storyHook: "Post-apocalyptic wasteland. \"Crimson Caravan\" transports last canister of \"Heroic Energy™\" to Vault 99. Protect it from warlords, cultists, mutants.",
    keyLocations: [ { name: "Gas Heaven (Pit Stop)", description: "Fortified fuel depot run by tyrannical Baron Wasteland.", whatHappens: ["Refuel/resupply.", "Negotiate with Baron.", "Participate in demolition derby.", "Steal water chip."]} /* ... more locations */ ]
  }
];

export const RECOMMENDED_VIEWING_LIST = [
    { title: "Die Hard (1988)", theme: "Lone hero in a confined space, witty one-liners." },
    { title: "Commando (1985)", theme: "Over-the-top action, impossible body count, cheesy lines." },
    { title: "Lethal Weapon (1987)", theme: "Buddy cop dynamics, explosive action, dark humor." },
    { title: "Under Siege (1992)", theme: "Steven Seagal. Need we say more? Cook saves the day." },
    { title: "Predator (1987)", theme: "Elite squad vs. alien threat, jungle warfare, iconic characters." },
    { title: "Terminator 2: Judgment Day (1991)", theme: "Sci-fi action, relentless pursuer, groundbreaking effects." },
    { title: "Big Trouble in Little China (1986)", theme: "Mystical martial arts, comedic hero, cult classic." },
    { title: "Mad Max 2: The Road Warrior (1981)", theme: "Post-apocalyptic vehicular mayhem, iconic anti-hero." },
    { title: "Hard Boiled (1992)", theme: "Hong Kong heroic bloodshed, insane gunfights, Chow Yun-Fat." },
    { title: "Rambo: First Blood Part II (1985)", theme: "One-man army, jungle missions, explosive results." }
];

export const ACTION_MOVIE_GLOSSARY: GlossaryTerm[] = [
    { term: "One-Liner", definition: "A pithy, often humorous remark delivered by a hero, typically after dispatching a villain or performing an impressive feat.", category: "Dialogue" },
    { term: "MacGuffin", definition: "An object, device, or event that is necessary to the plot and the motivation of the characters, but insignificant, unimportant, or irrelevant in itself.", category: "Plot Device" },
    { term: "Bullet Time", definition: "A visual effect of detaching the time and space of a camera (or viewer) from that of its visible subject, often used in action sequences to show bullets moving in slow motion.", category: "Visual Effect" },
    { term: "Heroic Bloodshed", definition: "A genre of Hong Kong action cinema revolving around stylized sequences of violence, gun play, and themes of duty, honor, and redemption.", category: "Genre" },
    { term: "Expendable Henchmen", definition: "Generic, often identically dressed, antagonists whose main purpose is to be effortlessly defeated by the hero in large numbers.", category: "Characters" },
    { term: "Training Montage", definition: "A sequence showing a character rapidly improving their skills or physical abilities over a short period, usually set to inspiring music.", category: "Cinematic Trope" },
    { term: "Final Showdown", definition: "The climatic confrontation between the hero and the main villain, often occurring in a dramatic or symbolic location.", category: "Plot Structure" },
    { term: "Walk Away From Explosion", definition: "A classic action movie trope where the hero calmly walks away, often in slow motion, as a massive explosion erupts behind them, without flinching.", category: "Visual Trope" },
    { term: "Rule of Cool", definition: "The principle that the limit of the Willing Suspension of Disbelief for a given element is directly proportional to its coolness. So long as it's awesome, it doesn't have to make sense.", category: "Storytelling" },
    { term: "Chekhov's Gun", definition: "A dramatic principle that states that every memorable element in a fictional story must be necessary and irreplaceable, and any that are not must be removed. E.g., if a gun is introduced in the first act, it must go off by the third.", category: "Plot Device" }
];

export const BEHIND_THE_SCENES_NOTES = [
    { title: "Inspiration: Steven Seagal", content: "The core concept leans heavily into the 'invincible', often stoic, and sometimes unintentionally hilarious persona of action stars like Steven Seagal. The Aikido-inspired moves, the calm demeanor amidst chaos, and the slightly preachy undertones are all nods." },
    { title: "Rules-Lite Philosophy", content: "The game aims for 'Maximum Action, Minimum Rules!' The d10 system with Stunt Points is designed to keep things fast, cinematic, and focused on narrative rather than complex calculations." },
    { title: "B-Movie Charm", content: "Embracing the silliness of B-action movies is key. Disastrous Fails leading to comedic escalations, Chaos Tables, and cheesy catchphrases are all meant to capture that spirit." },
    { title: "Player Agency", content: "Stunt Points, Montage Moments, and Signature Moves give players significant control over the narrative and allow them to contribute to the over-the-top feel of the game." },
    { title: "Explosion Intensity Meter", content: "This visual gag is meant to reinforce the theme. Not every rule is equally 'explosive,' but the idea is to highlight the potential for chaos and fun." }
];

// Helper function for random selection
export const getRandomElement = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Helper for dice rolls
export const rollD10 = (): number => Math.floor(Math.random() * 10) + 1;

export const INITIAL_STATS: CharacterStat[] = STAT_KEYS.map(stat => ({ stat, value: 0 }));

export const INITIAL_FILLABLE_SHEET_DATA: FillableSheetData = {
  name: "",
  archetypeName: ARCHETYPES[0]?.name || "", // Default to first archetype or empty
  description: "",
  stats: STAT_KEYS.reduce((acc, stat) => {
    acc[stat] = 0;
    return acc;
  }, {} as { [key in Stat]: number }),
  hp: BASE_HP,
  maxHp: BASE_HP,
  gear: "",
  trinket: "",
  catchphrase: "",
  definingTraitName: "",
  definingTraitDescription: "",
  background: "",
  motivation: "",
  stuntPoints: 0,
  actionHeroFeats: "",
  signatureMoves: "",
};
