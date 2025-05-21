
import React, { Suspense, lazy, useEffect, useState, ChangeEvent } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { 
    ACTION_MOVIE_GLOSSARY, APP_TITLE, ARCHETYPES, BACKGROUND_STORIES, BASE_HP, BEHIND_THE_SCENES_NOTES, CAMPAIGNS, 
    CATCHPHRASES, CHAOS_ESCALATION_TABLE, CHARACTER_DESCRIPTIONS, DEFINING_TRAITS, INITIAL_FILLABLE_SHEET_DATA, 
    LEGENDS_OF_THE_SILVER_FIST, MOTIVATIONS, PLOT_HOOKS, RANDOM_NPC_GENERATOR, RECOMMENDED_VIEWING_LIST, 
    STAT_KEYS, TRINKETS 
} from './constants';
import { 
  ActionButton,
  BackToTopButton, CharacterGenerator, Collapsible, CrimeSceneTapePattern, DiceRoller, ExplosionMeter, LoadingBar,
  NumberedRollTable,
  Section, StyledTable, ThemeToggle, Tooltip
} from './components';
import { Campaign, CharacterStat, FillableSheetData, GlossaryTerm, MenuItem, Stat, Archetype } from './types';

// Theme Hook
const useTheme = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if no preference is saved
    return savedTheme ? savedTheme === 'dark' : true; 
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark:bg-gray-950', 'dark:text-gray-200');
      document.body.classList.remove('bg-gray-100', 'text-gray-800');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-gray-100', 'text-gray-800');
      document.body.classList.remove('dark:bg-gray-950', 'dark:text-gray-200');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  return [isDarkMode, toggleTheme];
};


const menuItems: MenuItem[] = [
  { name: "Home", path: "/" },
  { name: "Core Rules", path: "/rules" },
  { name: "Characters", path: "/characters" },
  { name: "Fillable Sheet", path: "/fillable-sheet"},
  { name: "Campaigns", path: "/campaigns" },
  { name: "Tools", path: "/tools" },
  { name: "Extras", path: "/extras" },
];

const Header: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-black/80 dark:bg-black/90 text-white sticky top-0 z-40 shadow-2xl backdrop-blur-md no-print">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-action text-2xl md:text-3xl text-orange-500 hover:text-orange-400 transition-colors">
          {APP_TITLE}
        </Link>
        <nav className="hidden md:flex space-x-3 items-center">
          {menuItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({isActive}) => 
                `font-semibold px-3 py-2 rounded-md text-sm hover:bg-orange-600 transition-colors ${isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:text-white"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </nav>
        <div className="md:hidden flex items-center">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 p-2 text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
            </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90">
          {menuItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => 
                `block px-4 py-3 text-sm font-semibold hover:bg-orange-600 transition-colors ${isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:text-white"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-black/90 text-gray-400 py-12 mt-12 text-center font-mono no-print">
    <CrimeSceneTapePattern className="mb-8" />
    <div className="container mx-auto px-4">
      <p className="text-lg font-action text-orange-500 mb-2 tracking-wider">ACTION HEROES: THE RPG!</p>
      <p className="text-sm mb-1">&copy; {new Date().getFullYear()} Maximum Action Studios (A Fictional Entity)</p>
      <p className="text-xs mb-1">Directed by: THE DOJO MASTER</p>
      <p className="text-xs mb-1">Starring: YOU, THE PLAYER</p>
      <p className="text-xs mb-1">Explosions by: RICO "KABOOM" DYNAMITE (Consultant)</p>
      <p className="text-xs">No actual stuntmen were harmed in the making of this game (probably).</p>
      <img src={`https://picsum.photos/seed/${Date.now()}/100/50`} alt="Random placeholder" className="mx-auto mt-4 opacity-30 rounded"/>
    </div>
  </footer>
);

// Page Components (defined within App.tsx for brevity as requested)

const CoverPage: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-orange-900 dark:from-black dark:via-purple-950 dark:to-orange-950">
      <img 
        src={`https://picsum.photos/seed/actionhero/800/600`} 
        alt="Action Hero Silhouette" 
        className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10 blur-sm" 
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10">
        <h1 className="font-action text-5xl md:text-7xl lg:text-8xl text-orange-500 mb-4 tracking-wider uppercase" style={{WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
          {APP_TITLE}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 mb-8 italic max-w-2xl mx-auto">
          "A quirky, tongue-in-cheek tabletop RPG inspired by the glorious excess of Steven Seagal and 90s action movie tropes."
        </p>
        <div className="w-full max-w-md mx-auto mb-8">
          <LoadingBar progress={loadingProgress} />
          {loadingProgress < 100 && <p className="text-sm text-yellow-400 mt-2">Loading Maximum Action... {loadingProgress}%</p>}
          {loadingProgress === 100 && <p className="text-sm text-green-400 mt-2">Action Systems Nominal. Prepare for Mayhem!</p>}
        </div>
        {loadingProgress === 100 && (
            <Link to="/rules" className="no-print">
                <ActionButton className="text-xl px-8 py-4">
                    Enter the Dojo!
                </ActionButton>
            </Link>
        )}
      </div>
    </div>
  );
};

const RulesPage: React.FC = () => (
  <div className="space-y-6">
    <Section title="Theme and Tone" explosionIntensity={2} initiallyOpen={true}>
      <p>Welcome to <strong>ACTION HEROES: THE RPG!</strong> This is a quirky, tongue-in-cheek tabletop RPG inspired by the glorious excess of Steven Seagal and 90s action movie tropes. The tone is lighthearted, humorous, and full of satire, poking fun at action movie clichés and the invincible hero stereotype. Prepare for over-the-top action, cheesy dialogue, and situations that defy all logic and physics!</p>
    </Section>

    <Section title="Core Mechanics" explosionIntensity={5} initiallyOpen={true}>
        <Collapsible title="1. Single Die Mechanic (d10)" initiallyOpen={true}>
            <p>All actions are resolved using a single <strong>d10</strong>.</p>
            <ul className="list-disc list-inside ml-4 my-2 space-y-1">
                <li>Player rolls d10 + Stat/Skill modifier vs. Target Number (TN) set by Dojo Master (DM), typically 5-8.</li>
                <li><strong>Roll of 1 (Disastrous Fail):</strong> Action fails + humorous, slapstick B-Movie Consequence.</li>
                <li><strong>Roll of 10 (Epic Success):</strong> Action succeeds spectacularly + player earns 1 <strong>Stunt Point</strong>.</li>
            </ul>
        </Collapsible>
        <Collapsible title="2. Stunt Points">
            <p>Currency of looking awesome. Earned by rolling a natural 10, cheesy catchphrases, or specific Action Hero Feats.</p>
            <p>Spend Stunt Points to:</p>
            <ul className="list-disc list-inside ml-4 my-2 space-y-1">
                <li>Trigger special moves or enhance an existing one.</li>
                <li>Add a cool narrative twist (e.g., "Suddenly, a conveniently placed trampoline!").</li>
                <li>Automatically succeed on a future (non-critical) roll.</li>
                <li>Re-roll a failed die roll (spent regardless of new outcome).</li>
                <li>Interrupt an enemy's monologue with a witty one-liner.</li>
            </ul>
        </Collapsible>
        <Collapsible title="3. Action Hero Feats">
            <p>Each Character Archetype has unique, once-per-session abilities. Examples: "Deflect Bullets with a Sword," "Perform a Perfect Roundhouse Kick That Knocks Out Three Goons At Once." Player describes cinematically.</p>
        </Collapsible>
        <Collapsible title="4. Cheesy Catchphrases">
             <p>Each character has a signature catchphrase. Deliver at an appropriate/inappropriate moment for +2 bonus to current roll OR earn an extra Stunt Point. Once per session.</p>
        </Collapsible>
        <Collapsible title="5. B-Movie Consequences">
            <p>Failures (especially a roll of 1) lead to comedic escalation. Examples: Car chase ends in feather explosion; failed stealth results in loud pratfall revealing a clue.</p>
        </Collapsible>
        <Collapsible title="6. Montage Moments">
            <p>Initiate at key points:</p>
            <ul className="list-disc list-inside ml-4 my-2 space-y-1">
                <li><strong>Training Montage:</strong> Describe intense training. Grants temporary stat boost, new minor skill, or overcome specific challenge.</li>
                <li><strong>Preparation Montage:</strong> Describe gathering resources/scouting. Grants specific items, info, or tactical advantage.</li>
            </ul>
            <p>DM may require d10 roll for effectiveness or award based on creativity.</p>
        </Collapsible>
        <Collapsible title="7. Chaos Escalation Mechanic" initiallyOpen={true}>
            <p>DM can roll on the Chaos Escalation Table at dramatic moments, when players are too comfortable, or a Disastrous Fail needs extra spice.</p>
            <NumberedRollTable items={CHAOS_ESCALATION_TABLE} title="Chaos Escalation Roll Table" diceType="d10"/>
        </Collapsible>
    </Section>

    <Section title="Combat Mechanics" explosionIntensity={4}>
        <Collapsible title="1. Initiative" initiallyOpen={true}>
            <p>Start of combat: each player and significant NPC/enemy group rolls <strong>d10 + Agility Stat</strong>. Highest goes first.</p>
        </Collapsible>
        <Collapsible title="2. Action Points (AP)">
            <p>Each character has <strong>3 Action Points (AP)</strong> per turn. Common actions:</p>
            <ul className="list-disc list-inside ml-4 my-2 space-y-1">
                <li><strong>Attack:</strong> Make melee or ranged attack (1 AP).</li>
                <li><strong>Move:</strong> Move to strategic position (1 AP).</li>
                <li><strong>Use Skill/Gadget/Feat:</strong> (1 AP, some Feats free/cost more).</li>
                <li><strong>Interact:</strong> Open door, pick up item, shout one-liner (free or 1 AP).</li>
                <li><strong>Aim/Focus:</strong> Gain +2 to next attack roll this turn (1 AP).</li>
                <li><strong>Take Cover:</strong> Improve your Defense by +2 vs. ranged attacks until next turn (1 AP).</li>
            </ul>
            <p>Can save up to 1 AP for defensive maneuvers/reactions. Lost at start of next turn.</p>
        </Collapsible>
         <Collapsible title="3. Attacking and Defending">
            <p><strong>Attacking:</strong> Attacker rolls <strong>d10 + Combat Stat + modifiers</strong>. Hits if meets/exceeds target's Defense or TN.</p>
            <p><strong>Target's Defense:</strong> Passive Defense is <strong>5 + Agility Stat or Defense Stat</strong> (player chooses best). Modified by cover/abilities.</p>
            <p><strong>Dodging/Blocking (Reaction):</strong> If 1 AP saved, spend it when targeted. Roll <strong>d10 + Agility (dodge) or Strength (block)</strong>. If higher than attacker's roll, attack misses/negated.</p>
        </Collapsible>
        <Collapsible title="4. Damage and Health">
            <p><strong>Base Damage:</strong> Unarmed/Improvised: 1; Small Melee/Pistol: 2; Large Melee/Rifle/Shotgun: 3; Explosives/Heavy: 4+ (Area Effect). STR mod added to melee if STR +2 or higher.</p>
            <p><strong>Health Points (HP):</strong> 10 + DEF Stat. At 0 HP, "Taken Out" (unconscious, dramatically wounded, captured). PCs rarely killed outright.</p>
        </Collapsible>
        <Collapsible title="5. Special Moves and Stunt Points in Combat">
            <p>Spend Stunt Points to:</p>
            <ul className="list-disc list-inside ml-4 my-2 space-y-1">
                <li>Add +1d6 damage to an attack.</li>
                <li>Perform "Called Shot" with bonus to hit.</li>
                <li>Inflict condition (stunned, prone, pushed).</li>
                <li>Perform "Finishing Move" on low HP goon for Stunt Point refund.</li>
            </ul>
        </Collapsible>
        <Collapsible title="6. Team Combos">
             <p>Players combine actions. Declare intent, each spends {'>='}1 AP. One player makes primary roll +1 bonus per assister. Greater effect if successful.</p>
        </Collapsible>
        <Collapsible title="7. Environmental Interactions">
             <p>Kick tables, swing from chandeliers, explode barrels. Usually 1 AP + relevant Stat roll. Grants bonuses, creates obstacles, or looks awesome.</p>
        </Collapsible>
        <Collapsible title="8. Boss Fights">
            <p>Higher HP/Stats. Multiple Actions/Boss Actions. Signature Abilities. Phases. Monologues (opportunity to act/interrupt!).</p>
        </Collapsible>
    </Section>
    
    <Section title="The Dojo Master (DM)" explosionIntensity={3}>
        <p>You are not just a Game Master; you are the <strong>Dojo Master!</strong> And beneath that lofty title, you also hold these distinguished honors: <em>Sensei of Steel, Master of Aikido, Action Director, Chief of the Chop, Guardian of the Dojo, Stunt Coordinator, Ultimate Sensei, Martial Arts Maestro, Enforcer of the Code (of Action Movie Logic).</em></p>
        <Collapsible title="Guide to Being the Dojo Master: Channeling Your Inner Seagal">
            <p><strong>Voice and Tone:</strong> Low and monotone, slow and deliberate, soft but intense.</p>
            <p><strong>Mannerisms:</strong> Minimal movement, steely gaze, subtle head nods/tilts, slow hand gestures (Aikido hand-swish), optional ponytail stroke.</p>
            <p><strong>Signature DM Phrases:</strong></p>
            <ul className="list-disc list-inside ml-4 my-2 space-y-1">
                <li>"In this world... (dramatic pause) ...there are no second chances. Only sequels."</li>
                <li>"You don’t need a weapon when *you* are the weapon. (But a big gun helps.)"</li>
                <li>"Remember, true power lies in calmness... and knowing where the exploding barrels are."</li>
            </ul>
             <p><strong>Accent and Delivery:</strong> Mild, unplaceable accent. Even and steady.</p>
             <p><strong>Overall Persona:</strong> Unflappable, confident, mysterious, wise (or sounds like it), understated humor, occasionally insert self as NPC.</p>
        </Collapsible>
    </Section>

     <Section title="Additional Game Elements & Flavor" explosionIntensity={4}>
        <Collapsible title="1. Nemesis Rival System">Introduce a recurring nemesis/rival who dogs players' steps, has personal vendetta, shows up inconveniently, levels up.</Collapsible>
        <Collapsible title="2. Signature Moves">After awesome action, petition DM to make it a "Signature Move." Give cool name. Once per session, attempt for enhanced effect (may cost AP/Stunt Point).</Collapsible>
        <Collapsible title="3. Flashback Scenes">Once per story arc, player initiates flashback. Reveals backstory, explains skill, introduces connection. Success may grant bonus/clue/Stunt Point.</Collapsible>
        <Collapsible title="4. Cheesy Montage Cards (Optional Prop)">Cards like "Training Montage Card" (re-roll skill check), "Gear-Up Montage Card" (extra minor equipment).</Collapsible>
        <Collapsible title="5. Over-the-Top Weapons and Gadgets">Explosive gum, laser watches, grappling hook umbrellas, gun shooting exploding knives. Rewards or found items.</Collapsible>
        <Collapsible title="6. Dynamic Environmental Hazards">Collapsing buildings, raging fires, electrified floors, gas leaks, crates of anvils. Triggered by anyone for chaotic results.</Collapsible>
        <Collapsible title="7. Allies and Sidekicks">Quirky NPCs for comic relief, niche skills, extra body, or liability.</Collapsible>
        <Collapsible title="8. Cinematic Rewards">For especially cinematic/creative/trope-filled actions (even failures), DM awards extra Stunt Point, "Style Point" (3 for auto Epic Success), or brief narrative control.</Collapsible>
        <Collapsible title="9. Villain Monologues">Villains *must* monologue. Players can interrupt (CHA roll vs. villain composure). Success may rattle villain or grant tactical advantage. Stunt Point guarantees interruption.</Collapsible>
        <Collapsible title="10. Secret Missions">DM gives each player secret personal objective at start of campaign/arc. Aligned with archetype/backstory/motivation. Completion yields significant reward.</Collapsible>
    </Section>
  </div>
);

const CharacterCreationPage: React.FC = () => (
  <div className="space-y-6">
    <Section title="Character Creation Guide" explosionIntensity={5} initiallyOpen={true}>
      <p>Follow these steps to create your over-the-top action hero! For a fillable sheet you can save, check out the <Link to="/fillable-sheet" className="text-orange-400 hover:text-orange-300 underline">Fillable Sheet</Link> page.</p>
      <Collapsible title="Step 1: Choose an Archetype" initiallyOpen={true}>
        <p>Select one of the following archetypes. Each grants specific bonuses.</p>
        {ARCHETYPES.map(arch => (
          <Collapsible key={arch.name} title={arch.name} titleClassName="text-lg text-yellow-500">
            <p>{arch.description}</p>
            <p><strong>Bonus:</strong> {arch.bonus}</p>
            <p><strong>Starting Gear Idea:</strong> {arch.gearIdea}</p>
          </Collapsible>
        ))}
      </Collapsible>
      <Collapsible title="Step 2: Generate a Character Description">
        <p>Roll on the Character Description Roll Table for a humorous, Chuck Norris-style one-liner that defines your character's legendary reputation, or create your own with DM approval.</p>
        <NumberedRollTable items={CHARACTER_DESCRIPTIONS} title="Character Description Roll Table" diceType="d10" />
      </Collapsible>
      <Collapsible title="Step 3: Assign Stats">
        <p>Distribute <strong>10 points</strong> across the following six core stats. No stat can be lower than 0 or higher than 4 at character creation (before Archetype bonuses).</p>
        <ul className="list-disc list-inside ml-4 my-2 space-y-1">
          {STAT_KEYS.map(stat => <li key={stat}>{stat}</li>)}
        </ul>
        <p><strong>Health Points (HP):</strong> Your character starts with <strong>10 + DEF Stat</strong> Health Points.</p>
      </Collapsible>
      <Collapsible title="Step 4: Select Starting Gear & Trinket">
        <p>Choose a basic loadout based on your archetype. Roll on the Trinkets Roll Table for a quirky personal item.</p>
        <NumberedRollTable items={TRINKETS} title="Trinkets Roll Table" diceType="d10" />
      </Collapsible>
      <Collapsible title="Step 5: Choose/Roll a Signature Catchphrase">
        <p>Every action hero needs one! Roll on the table below or invent your own (DM approval needed).</p>
        <NumberedRollTable items={CATCHPHRASES} title="Catchphrase Roll Table" diceType="d10" />
      </Collapsible>
      <Collapsible title="Step 6: Defining Trait">
        <p>Choose or roll for a defining trait that sets your character apart. This provides a small mechanical perk or roleplaying hook.</p>
        <NumberedRollTable items={DEFINING_TRAITS} title="Defining Trait Roll Table" diceType="d6" />
      </Collapsible>
      <Collapsible title="Step 7: Background and Motivation">
        <p>Develop a brief backstory and a personal motivation or secret mission. You can create your own or roll on the tables below for some 90s trope inspiration.</p>
        <NumberedRollTable items={BACKGROUND_STORIES} title="90s Trope Character Backstories" diceType="d10" />
        <NumberedRollTable items={MOTIVATIONS} title="90s Trope Character Motivations" diceType="d10" />
      </Collapsible>
    </Section>

    <Section title="Static Printable Character Sheet" explosionIntensity={2}>
      <CharacterSheetLayout staticData={true}/>
    </Section>
  </div>
);

// Renamed CharacterSheet to CharacterSheetLayout to be more generic for static and fillable
const CharacterSheetLayout: React.FC<{ 
    sheetData?: FillableSheetData;
    onInputChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onNumberInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    staticData?: boolean; // If true, renders placeholders or dummy data
    selectedArchetype?: Archetype | null; // For fillable sheet to show archetype details
}> = ({ sheetData, onInputChange, onNumberInputChange, staticData = false, selectedArchetype }) => {
  
  const data = staticData ? INITIAL_FILLABLE_SHEET_DATA : sheetData || INITIAL_FILLABLE_SHEET_DATA;

  const inputClass = "w-full p-1 border border-gray-400 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500 print:bg-white print:text-black print:border-black";
  const textareaClass = `${inputClass} min-h-[60px]`;
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 print:text-black";
  const fieldWrapperClass = "mb-3";

  return (
    <div className="printable-character-sheet p-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-black dark:border-gray-500 print:border-black print:bg-white print:text-black">
      <h2 className="font-action text-3xl text-center mb-4 text-orange-600 dark:text-orange-500 print:text-black">ACTION HERO CHARACTER SHEET</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 print:grid-cols-3">
        <div className={`print:col-span-1 ${fieldWrapperClass}`}>
          <label htmlFor="name" className={labelClass}>Name:</label>
          {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.name || "____________________"}</p> : <input type="text" name="name" id="name" value={data.name} onChange={onInputChange} className={inputClass} />}
        </div>
        <div className={`print:col-span-2 ${fieldWrapperClass}`}>
          <label htmlFor="archetypeName" className={labelClass}>Archetype:</label>
          {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.archetypeName || "____________________"}</p> : 
            <select name="archetypeName" id="archetypeName" value={data.archetypeName} onChange={onInputChange} className={inputClass}>
              {ARCHETYPES.map(arch => <option key={arch.name} value={arch.name}>{arch.name}</option>)}
            </select>
          }
        </div>
      </div>
      {selectedArchetype && !staticData && (
        <div className="mb-3 p-2 bg-orange-100 dark:bg-orange-900/30 rounded text-sm">
            <p><strong>Bonus:</strong> {selectedArchetype.bonus}</p>
            <p><strong>Gear Idea:</strong> {selectedArchetype.gearIdea}</p>
        </div>
      )}

      <div className={fieldWrapperClass}>
        <label htmlFor="description" className={labelClass}>Legendary Description:</label>
        {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.description || "____________________________________________________"}</p> : <textarea name="description" id="description" value={data.description} onChange={onInputChange} className={textareaClass} rows={2}></textarea>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mb-4 print:grid-cols-3">
        {STAT_KEYS.map(statKey => (
          <div key={statKey} className={fieldWrapperClass}>
            <label htmlFor={`stat-${statKey}`} className={labelClass}>{statKey}:</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.stats[statKey] || "0"}</p> : <input type="number" name={`stat-${statKey}`} id={`stat-${statKey}`} value={data.stats[statKey]} onChange={onNumberInputChange} className={`${inputClass} w-16 text-center`} min="0" max="10"/>}
          </div>
        ))}
        <div className={fieldWrapperClass}>
          <label htmlFor="hp" className={labelClass}>HP:</label>
          {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.hp || "10"}</p> : <input type="number" name="hp" id="hp" value={data.hp} onChange={onNumberInputChange} className={`${inputClass} w-16 text-center`} />}
        </div>
         <div className={fieldWrapperClass}>
          <label htmlFor="maxHp" className={labelClass}>Max HP:</label>
          {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.maxHp || "10"}</p> : <input type="number" name="maxHp" id="maxHp" value={data.maxHp} onChange={onNumberInputChange} className={`${inputClass} w-16 text-center`} />}
        </div>
        <div className={fieldWrapperClass}>
          <label htmlFor="stuntPoints" className={labelClass}>Stunt Points:</label>
          {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.stuntPoints || "0"}</p> : <input type="number" name="stuntPoints" id="stuntPoints" value={data.stuntPoints} onChange={onNumberInputChange} className={`${inputClass} w-16 text-center`} />}
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className={fieldWrapperClass}>
            <label htmlFor="catchphrase" className={labelClass}>Catchphrase:</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.catchphrase || "____________________"}</p> : <input type="text" name="catchphrase" id="catchphrase" value={data.catchphrase} onChange={onInputChange} className={inputClass} />}
        </div>
        <div className={fieldWrapperClass}>
            <label htmlFor="definingTraitName" className={labelClass}>Defining Trait Name:</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.definingTraitName || "____________________"}</p> : <input type="text" name="definingTraitName" id="definingTraitName" value={data.definingTraitName} onChange={onInputChange} className={inputClass} placeholder="e.g., Unflappable Calm"/>}
        </div>
        <div className={fieldWrapperClass}>
            <label htmlFor="definingTraitDescription" className={labelClass}>Defining Trait Description:</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.definingTraitDescription || "____________________"}</p> : <textarea name="definingTraitDescription" id="definingTraitDescription" value={data.definingTraitDescription} onChange={onInputChange} className={textareaClass} rows={2} placeholder="Description of the trait's effect"></textarea>}
        </div>
        <div className={fieldWrapperClass}>
            <label htmlFor="actionHeroFeats" className={labelClass}>Action Hero Feat(s):</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.actionHeroFeats || "____________________"}</p> : <textarea name="actionHeroFeats" id="actionHeroFeats" value={data.actionHeroFeats} onChange={onInputChange} className={textareaClass} rows={2}></textarea>}
        </div>
        <div className={fieldWrapperClass}>
            <label htmlFor="signatureMoves" className={labelClass}>Signature Move(s):</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.signatureMoves || "____________________"}</p> : <textarea name="signatureMoves" id="signatureMoves" value={data.signatureMoves} onChange={onInputChange} className={textareaClass} rows={2}></textarea>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 print:grid-cols-2">
        <div className={fieldWrapperClass}>
            <label htmlFor="gear" className={labelClass}>Gear:</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.gear || "____________________"}</p> : <textarea name="gear" id="gear" value={data.gear} onChange={onInputChange} className={textareaClass} rows={3}></textarea>}
        </div>
        <div className={fieldWrapperClass}>
            <label htmlFor="trinket" className={labelClass}>Trinket:</label>
            {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.trinket || "____________________"}</p> : <input type="text" name="trinket" id="trinket" value={data.trinket} onChange={onInputChange} className={inputClass} />}
        </div>
      </div>
      
      <div className={fieldWrapperClass}>
        <label htmlFor="background" className={labelClass}>Background:</label>
        {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.background || "____________________"}</p> : <textarea name="background" id="background" value={data.background} onChange={onInputChange} className={textareaClass} rows={3}></textarea>}
      </div>
      <div className={fieldWrapperClass}>
        <label htmlFor="motivation" className={labelClass}>Motivation/Secret Mission:</label>
        {staticData ? <p className="border-b border-gray-400 print:border-black h-6">{data.motivation || "____________________"}</p> : <textarea name="motivation" id="motivation" value={data.motivation} onChange={onInputChange} className={textareaClass} rows={3}></textarea>}
      </div>
      {!staticData && (
         <div className="text-center mt-6 space-x-2 no-print">
            <ActionButton onClick={() => window.print()}>Print Sheet</ActionButton>
          </div>
      )}
      <p className="text-xs text-center print-only mt-2">Sheet Version 1.1 - ACTION HEROES: THE RPG!</p>
    </div>
  );
};

const FillableCharacterSheetPage: React.FC = () => {
    const LOCAL_STORAGE_KEY = 'actionHeroFillableSheet_v1';
    const [sheetData, setSheetData] = useState<FillableSheetData>(INITIAL_FILLABLE_SHEET_DATA);
    const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                // Ensure stats object is complete, merging with initial if necessary
                const completeStats = STAT_KEYS.reduce((acc, statKey) => {
                    acc[statKey] = parsedData.stats?.[statKey] ?? 0;
                    return acc;
                }, {} as { [key in Stat]: number });

                setSheetData({ ...INITIAL_FILLABLE_SHEET_DATA, ...parsedData, stats: completeStats });
            } catch (error) {
                console.error("Error parsing saved sheet data:", error);
                localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupted data
            }
        }
    }, []);

    useEffect(() => {
        const currentArchetype = ARCHETYPES.find(arch => arch.name === sheetData.archetypeName);
        setSelectedArchetype(currentArchetype || null);
        
        const defenseValue = sheetData.stats[Stat.Defense] || 0;
        const newMaxHp = BASE_HP + defenseValue;
        if (sheetData.maxHp !== newMaxHp || sheetData.hp > newMaxHp) {
             setSheetData(prev => ({
                ...prev,
                maxHp: newMaxHp,
                hp: Math.min(prev.hp, newMaxHp) 
            }));
        }

    }, [sheetData.archetypeName, sheetData.stats, sheetData.hp, sheetData.maxHp]); // Added dependencies


    const showFeedback = (message: string) => {
        setFeedbackMessage(message);
        setTimeout(() => setFeedbackMessage(null), 3000);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSheetData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = parseInt(value);

        if (name.startsWith("stat-")) {
            const statKey = name.replace("stat-", "") as Stat; // Simpler split
            setSheetData(prev => ({
                ...prev,
                stats: { ...prev.stats, [statKey]: isNaN(numValue) ? 0 : numValue }
            }));
        } else {
            setSheetData(prev => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
        }
    };

    const saveSheet = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sheetData));
        showFeedback("Character Sheet Saved!");
    };

    const clearSheet = () => {
        if (window.confirm("Are you sure you want to clear the sheet? This will erase all current data and cannot be undone.")) {
            setSheetData(INITIAL_FILLABLE_SHEET_DATA);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            showFeedback("Character Sheet Cleared!");
        }
    };
    
    return (
        <Section title="Fillable Character Sheet" explosionIntensity={3} initiallyOpen={true}>
            <p className="mb-4">Fill in your hero's details below. Your data will be saved in your browser.</p>
            {feedbackMessage && (
                <div className={`p-3 mb-4 rounded-md text-sm ${feedbackMessage.includes("Saved") ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                    {feedbackMessage}
                </div>
            )}
            <CharacterSheetLayout 
                sheetData={sheetData} 
                onInputChange={handleInputChange}
                onNumberInputChange={handleNumberInputChange}
                selectedArchetype={selectedArchetype}
            />
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 no-print">
                <ActionButton onClick={saveSheet} className="w-full sm:w-auto">Save Sheet</ActionButton>
                <ActionButton onClick={clearSheet} className="w-full sm:w-auto bg-red-600 hover:bg-red-700">Clear Sheet</ActionButton>
            </div>
        </Section>
    );
};


const NpcBestiaryPage: React.FC = () => (
  <Section title="NPCs / Bestiary: The Legends of the Silver Fist" explosionIntensity={5}>
    <p>These are near-mythical, almost impossible-to-defeat NPC action heroes who might occasionally appear. The Dojo Master can use the "Legends of the Silver Fist" mechanic to bring them into play.</p>
    <Collapsible title={"\"Legends of the Silver Fist\" Mechanic"} initiallyOpen={true}>
      <p><strong>Overview:</strong> Once per session (or per story arc), DM may roll on the table OR pick a Legend. The Legend appears dramatically, delivers justice/mayhem/wisdom, then vanishes mysteriously.</p>
      <p><strong>Trigger Conditions:</strong> Player rolls natural 1 or 10; Chaos Escalation result; players about to be TPK'd; DM feels it's awesome; reward for trope-heavy play.</p>
    </Collapsible>
    <NumberedRollTable items={LEGENDS_OF_THE_SILVER_FIST} title="Legends of the Silver Fist Table" diceType="d10" />
    <Collapsible title="Optional Twist for Legends">
        <p>If a player character attempts to imitate, appeal to, or dramatically acknowledge one of the Legends, the DM might grant that player advantage on their next roll or a small temporary buff out of sheer respect from the Legend (or the universe).</p>
    </Collapsible>
    {/* Add Special NPCs section here if desired */}
  </Section>
);

const GeneralRollTablesPage: React.FC = () => (
  <div className="space-y-6">
    <Section title="General Roll Tables" explosionIntensity={3} initiallyOpen={true}>
      <NumberedRollTable items={PLOT_HOOKS} title="Plot Hooks for Instant Action!" diceType="d10"/>
      <NumberedRollTable items={RANDOM_NPC_GENERATOR} title="Random NPC Generator for Instant Contact/Complication!" diceType="d10"/>
    </Section>
    {/* Other roll tables can be added here */}
  </div>
);

const CampaignPageRenderer: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
    return (
        <Section title={campaign.title} explosionIntensity={5} initiallyOpen={false}>
            <p><strong>Story Hook:</strong> {campaign.storyHook}</p>
            {campaign.worldMapConcept && <p className="mt-2"><strong>World Map Concept:</strong> {campaign.worldMapConcept}</p>}
            <h3 className="text-xl font-semibold text-yellow-400 mt-4 mb-2">Key Locations:</h3>
            {campaign.keyLocations.map((loc, index) => (
                <Collapsible key={index} title={loc.name} titleClassName="text-lg text-orange-400" initiallyOpen={false}>
                    <p className="italic text-gray-400 dark:text-gray-500 mb-1">{loc.description}</p>
                    {loc.whatHappens && loc.whatHappens.length > 0 && (
                        <>
                            <h4 className="font-semibold text-yellow-300 mt-2">What Happens Here:</h4>
                            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                                {loc.whatHappens.map((wh, i) => <li key={i}>{wh}</li>)}
                            </ul>
                        </>
                    )}
                     {loc.mapPrompt && <p className="text-xs italic text-gray-500 mt-2">Map Prompt Idea: {loc.mapPrompt}</p>}
                    {/* For brevity, not rendering NPCs, Goons, etc. fully here, but structure is available in types.ts */}
                </Collapsible>
            ))}
        </Section>
    );
};

const CampaignsPage: React.FC = () => (
  <div className="space-y-6">
    <Section title="Campaign Story Arcs" explosionIntensity={5} initiallyOpen={true}>
      <p>Here are five fully fleshed-out campaign story arcs to get your adrenaline pumping!</p>
    </Section>
    {CAMPAIGNS.map(campaign => <CampaignPageRenderer key={campaign.id} campaign={campaign} />)}
    <NpcBestiaryPage/>
    <GeneralRollTablesPage/>
  </div>
);

const ToolsPage: React.FC = () => {
    const handlePrint = (printModeClass: string) => {
        document.body.classList.add(printModeClass);
        window.print();
        // Removing the class is handled by onafterprint for better reliability
    };

    useEffect(() => {
        const afterPrintHandler = () => {
            document.body.classList.remove('print-full-visuals-active');
            document.body.classList.remove('print-ink-saver-active');
        };
        window.addEventListener('afterprint', afterPrintHandler);
        return () => {
            window.removeEventListener('afterprint', afterPrintHandler);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
                <Section title="Dice Roller" explosionIntensity={1} initiallyOpen={true}>
                    <DiceRoller />
                </Section>
            </div>
            <div className="md:col-span-1">
                <Section title="Character Generator" explosionIntensity={3} initiallyOpen={true}>
                    <CharacterGenerator />
                </Section>
            </div>
            <div className="md:col-span-2">
                <Section title="PDF Export Options" explosionIntensity={2} initiallyOpen={true}>
                    <p className="mb-4">Use these options to save the TTRPG content as a PDF. For best results, use your browser's "Save as PDF" destination in the print dialog. <strong className="text-yellow-400">Tip:</strong> Expand any collapsible sections you want included in the PDF before printing.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <ActionButton onClick={() => handlePrint('print-full-visuals-active')} className="w-full sm:w-auto">
                            Save as PDF (Full Visuals)
                        </ActionButton>
                        <ActionButton onClick={() => handlePrint('print-ink-saver-active')} className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700">
                            Download Print-Friendly PDF
                        </ActionButton>
                    </div>
                     <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                        Note: PDF generation quality may vary by browser. Chrome is generally recommended for "Save as PDF".
                        The "Print-Friendly" version drastically reduces ink usage by removing backgrounds and simplifying styles.
                    </p>
                </Section>
            </div>
        </div>
    );
};


const ExtrasPage: React.FC = () => (
    <div className="space-y-6">
        <Section title="Action Movie Glossary" explosionIntensity={2} initiallyOpen={true}>
            <p className="mb-4">Key terms and tropes from the world of 90s action cinema and TTRPGs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACTION_MOVIE_GLOSSARY.map(term => (
                <div key={term.term} className="p-3 bg-gray-800/70 dark:bg-black/50 rounded-md">
                    <Tooltip text={term.definition}>
                        <h4 className="font-semibold text-orange-400 text-lg cursor-help">{term.term}</h4>
                    </Tooltip>
                    <p className="text-sm text-gray-300 dark:text-gray-400">{term.definition}</p>
                    {term.category && <p className="text-xs text-yellow-500 mt-1"><em>Category: {term.category}</em></p>}
                </div>
            ))}
            </div>
        </Section>

        <Section title="Recommended Viewing List" explosionIntensity={3}>
            <p className="mb-4">Need inspiration? Check out these classic action flicks!</p>
            <StyledTable 
                headers={["Title", "Theme/Reason"]}
                data={RECOMMENDED_VIEWING_LIST.map(item => [item.title, item.theme])}
                caption={<span className="font-action text-2xl text-orange-500 dark:text-orange-400 tracking-wider uppercase">Must-Watch Action Movies</span>}
            />
        </Section>

        <Section title="Behind The Scenes" explosionIntensity={1}>
            <p className="mb-4">Some design notes and inspirations for ACTION HEROES: THE RPG!</p>
            {BEHIND_THE_SCENES_NOTES.map(note => (
                <Collapsible key={note.title} title={note.title} titleClassName="text-lg text-yellow-400">
                    <p>{note.content}</p>
                </Collapsible>
            ))}
        </Section>
    </div>
);

const App: React.FC = () => {
  const [isDarkMode, toggleTheme] = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-950 text-gray-200' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center p-10 text-2xl font-action">LOADING ACTION...</div>}>
          <Routes>
            <Route path="/" element={<CoverPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/characters" element={<CharacterCreationPage />} />
            <Route path="/fillable-sheet" element={<FillableCharacterSheetPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/extras" element={<ExtrasPage />} />
            <Route path="*" element={<div><h1 className="font-action text-4xl text-red-500">404 - PAGE NOT FOUND, MAGGOT!</h1><p>Looks like you took a wrong turn into a B-movie dead end.</p></div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;
