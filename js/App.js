import React, { Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ACTION_MOVIE_GLOSSARY, APP_TITLE, ARCHETYPES, BACKGROUND_STORIES, BASE_HP, BEHIND_THE_SCENES_NOTES, CAMPAIGNS, CATCHPHRASES, CHAOS_ESCALATION_TABLE, CHARACTER_DESCRIPTIONS, DEFINING_TRAITS, INITIAL_FILLABLE_SHEET_DATA, LEGENDS_OF_THE_SILVER_FIST, MOTIVATIONS, PLOT_HOOKS, RANDOM_NPC_GENERATOR, RECOMMENDED_VIEWING_LIST, STAT_KEYS, TRINKETS } from './constants';
import { ActionButton, BackToTopButton, CharacterGenerator, Collapsible, CrimeSceneTapePattern, DiceRoller, LoadingBar, NumberedRollTable, Section, StyledTable, ThemeToggle, Tooltip } from './components';
import { Stat } from './types';
// Theme Hook
const useTheme = () => {
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
        }
        else {
            document.documentElement.classList.remove('dark');
            document.body.classList.add('bg-gray-100', 'text-gray-800');
            document.body.classList.remove('dark:bg-gray-950', 'dark:text-gray-200');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
    const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);
    return [isDarkMode, toggleTheme];
};
const menuItems = [
    { name: "Home", path: "/" },
    { name: "Core Rules", path: "/rules" },
    { name: "Characters", path: "/characters" },
    { name: "Fillable Sheet", path: "/fillable-sheet" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "Tools", path: "/tools" },
    { name: "Extras", path: "/extras" },
];
const Header = ({ isDarkMode, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (React.createElement("header", { className: "bg-black/80 dark:bg-black/90 text-white sticky top-0 z-40 shadow-2xl backdrop-blur-md no-print" },
        React.createElement("div", { className: "container mx-auto px-4 py-3 flex justify-between items-center" },
            React.createElement(Link, { to: "/", className: "font-action text-2xl md:text-3xl text-orange-500 hover:text-orange-400 transition-colors" }, APP_TITLE),
            React.createElement("nav", { className: "hidden md:flex space-x-3 items-center" },
                menuItems.map(item => (React.createElement(NavLink, { key: item.path, to: item.path, className: ({ isActive }) => `font-semibold px-3 py-2 rounded-md text-sm hover:bg-orange-600 transition-colors ${isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:text-white"}` }, item.name))),
                React.createElement(ThemeToggle, { isDarkMode: isDarkMode, toggleTheme: toggleTheme })),
            React.createElement("div", { className: "md:hidden flex items-center" },
                React.createElement(ThemeToggle, { isDarkMode: isDarkMode, toggleTheme: toggleTheme }),
                React.createElement("button", { onClick: () => setIsMenuOpen(!isMenuOpen), className: "ml-2 p-2 text-gray-300 hover:text-white" },
                    React.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }))))),
        isMenuOpen && (React.createElement("div", { className: "md:hidden bg-black/90" }, menuItems.map(item => (React.createElement(NavLink, { key: item.path, to: item.path, onClick: () => setIsMenuOpen(false), className: ({ isActive }) => `block px-4 py-3 text-sm font-semibold hover:bg-orange-600 transition-colors ${isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:text-white"}` }, item.name)))))));
};
const Footer = () => (React.createElement("footer", { className: "bg-black/90 text-gray-400 py-12 mt-12 text-center font-mono no-print" },
    React.createElement(CrimeSceneTapePattern, { className: "mb-8" }),
    React.createElement("div", { className: "container mx-auto px-4" },
        React.createElement("p", { className: "text-lg font-action text-orange-500 mb-2 tracking-wider" }, "ACTION HEROES: THE RPG!"),
        React.createElement("p", { className: "text-sm mb-1" },
            "\u00A9 ",
            new Date().getFullYear(),
            " Maximum Action Studios (A Fictional Entity)"),
        React.createElement("p", { className: "text-xs mb-1" }, "Directed by: THE DOJO MASTER"),
        React.createElement("p", { className: "text-xs mb-1" }, "Starring: YOU, THE PLAYER"),
        React.createElement("p", { className: "text-xs mb-1" }, "Explosions by: RICO \"KABOOM\" DYNAMITE (Consultant)"),
        React.createElement("p", { className: "text-xs" }, "No actual stuntmen were harmed in the making of this game (probably)."),
        React.createElement("img", { src: `https://picsum.photos/seed/${Date.now()}/100/50`, alt: "Random placeholder", className: "mx-auto mt-4 opacity-30 rounded" }))));
// Page Components (defined within App.tsx for brevity as requested)
const CoverPage = () => {
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
    return (React.createElement("div", { className: "min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-orange-900 dark:from-black dark:via-purple-950 dark:to-orange-950" },
        React.createElement("img", { src: `https://picsum.photos/seed/actionhero/800/600`, alt: "Action Hero Silhouette", className: "absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10 blur-sm" }),
        React.createElement("div", { className: "absolute inset-0 bg-black/30" }),
        React.createElement("div", { className: "relative z-10" },
            React.createElement("h1", { className: "font-action text-5xl md:text-7xl lg:text-8xl text-orange-500 mb-4 tracking-wider uppercase", style: { WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' } }, APP_TITLE),
            React.createElement("p", { className: "text-xl md:text-2xl text-gray-300 dark:text-gray-400 mb-8 italic max-w-2xl mx-auto" }, "\"A quirky, tongue-in-cheek tabletop RPG inspired by the glorious excess of Steven Seagal and 90s action movie tropes.\""),
            React.createElement("div", { className: "w-full max-w-md mx-auto mb-8" },
                React.createElement(LoadingBar, { progress: loadingProgress }),
                loadingProgress < 100 && React.createElement("p", { className: "text-sm text-yellow-400 mt-2" },
                    "Loading Maximum Action... ",
                    loadingProgress,
                    "%"),
                loadingProgress === 100 && React.createElement("p", { className: "text-sm text-green-400 mt-2" }, "Action Systems Nominal. Prepare for Mayhem!")),
            loadingProgress === 100 && (React.createElement(Link, { to: "/rules", className: "no-print" },
                React.createElement(ActionButton, { className: "text-xl px-8 py-4" }, "Enter the Dojo!"))))));
};
const RulesPage = () => (React.createElement("div", { className: "space-y-6" },
    React.createElement(Section, { title: "Theme and Tone", explosionIntensity: 2, initiallyOpen: true },
        React.createElement("p", null,
            "Welcome to ",
            React.createElement("strong", null, "ACTION HEROES: THE RPG!"),
            " This is a quirky, tongue-in-cheek tabletop RPG inspired by the glorious excess of Steven Seagal and 90s action movie tropes. The tone is lighthearted, humorous, and full of satire, poking fun at action movie clich\u00E9s and the invincible hero stereotype. Prepare for over-the-top action, cheesy dialogue, and situations that defy all logic and physics!")),
    React.createElement(Section, { title: "Core Mechanics", explosionIntensity: 5, initiallyOpen: true },
        React.createElement(Collapsible, { title: "1. Single Die Mechanic (d10)", initiallyOpen: true },
            React.createElement("p", null,
                "All actions are resolved using a single ",
                React.createElement("strong", null, "d10"),
                "."),
            React.createElement("ul", { className: "list-disc list-inside ml-4 my-2 space-y-1" },
                React.createElement("li", null, "Player rolls d10 + Stat/Skill modifier vs. Target Number (TN) set by Dojo Master (DM), typically 5-8."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Roll of 1 (Disastrous Fail):"),
                    " Action fails + humorous, slapstick B-Movie Consequence."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Roll of 10 (Epic Success):"),
                    " Action succeeds spectacularly + player earns 1 ",
                    React.createElement("strong", null, "Stunt Point"),
                    "."))),
        React.createElement(Collapsible, { title: "2. Stunt Points" },
            React.createElement("p", null, "Currency of looking awesome. Earned by rolling a natural 10, cheesy catchphrases, or specific Action Hero Feats."),
            React.createElement("p", null, "Spend Stunt Points to:"),
            React.createElement("ul", { className: "list-disc list-inside ml-4 my-2 space-y-1" },
                React.createElement("li", null, "Trigger special moves or enhance an existing one."),
                React.createElement("li", null, "Add a cool narrative twist (e.g., \"Suddenly, a conveniently placed trampoline!\")."),
                React.createElement("li", null, "Automatically succeed on a future (non-critical) roll."),
                React.createElement("li", null, "Re-roll a failed die roll (spent regardless of new outcome)."),
                React.createElement("li", null, "Interrupt an enemy's monologue with a witty one-liner."))),
        React.createElement(Collapsible, { title: "3. Action Hero Feats" },
            React.createElement("p", null, "Each Character Archetype has unique, once-per-session abilities. Examples: \"Deflect Bullets with a Sword,\" \"Perform a Perfect Roundhouse Kick That Knocks Out Three Goons At Once.\" Player describes cinematically.")),
        React.createElement(Collapsible, { title: "4. Cheesy Catchphrases" },
            React.createElement("p", null, "Each character has a signature catchphrase. Deliver at an appropriate/inappropriate moment for +2 bonus to current roll OR earn an extra Stunt Point. Once per session.")),
        React.createElement(Collapsible, { title: "5. B-Movie Consequences" },
            React.createElement("p", null, "Failures (especially a roll of 1) lead to comedic escalation. Examples: Car chase ends in feather explosion; failed stealth results in loud pratfall revealing a clue.")),
        React.createElement(Collapsible, { title: "6. Montage Moments" },
            React.createElement("p", null, "Initiate at key points:"),
            React.createElement("ul", { className: "list-disc list-inside ml-4 my-2 space-y-1" },
                React.createElement("li", null,
                    React.createElement("strong", null, "Training Montage:"),
                    " Describe intense training. Grants temporary stat boost, new minor skill, or overcome specific challenge."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Preparation Montage:"),
                    " Describe gathering resources/scouting. Grants specific items, info, or tactical advantage.")),
            React.createElement("p", null, "DM may require d10 roll for effectiveness or award based on creativity.")),
        React.createElement(Collapsible, { title: "7. Chaos Escalation Mechanic", initiallyOpen: true },
            React.createElement("p", null, "DM can roll on the Chaos Escalation Table at dramatic moments, when players are too comfortable, or a Disastrous Fail needs extra spice."),
            React.createElement(NumberedRollTable, { items: CHAOS_ESCALATION_TABLE, title: "Chaos Escalation Roll Table", diceType: "d10" }))),
    React.createElement(Section, { title: "Combat Mechanics", explosionIntensity: 4 },
        React.createElement(Collapsible, { title: "1. Initiative", initiallyOpen: true },
            React.createElement("p", null,
                "Start of combat: each player and significant NPC/enemy group rolls ",
                React.createElement("strong", null, "d10 + Agility Stat"),
                ". Highest goes first.")),
        React.createElement(Collapsible, { title: "2. Action Points (AP)" },
            React.createElement("p", null,
                "Each character has ",
                React.createElement("strong", null, "3 Action Points (AP)"),
                " per turn. Common actions:"),
            React.createElement("ul", { className: "list-disc list-inside ml-4 my-2 space-y-1" },
                React.createElement("li", null,
                    React.createElement("strong", null, "Attack:"),
                    " Make melee or ranged attack (1 AP)."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Move:"),
                    " Move to strategic position (1 AP)."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Use Skill/Gadget/Feat:"),
                    " (1 AP, some Feats free/cost more)."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Interact:"),
                    " Open door, pick up item, shout one-liner (free or 1 AP)."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Aim/Focus:"),
                    " Gain +2 to next attack roll this turn (1 AP)."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Take Cover:"),
                    " Improve your Defense by +2 vs. ranged attacks until next turn (1 AP).")),
            React.createElement("p", null, "Can save up to 1 AP for defensive maneuvers/reactions. Lost at start of next turn.")),
        React.createElement(Collapsible, { title: "3. Attacking and Defending" },
            React.createElement("p", null,
                React.createElement("strong", null, "Attacking:"),
                " Attacker rolls ",
                React.createElement("strong", null, "d10 + Combat Stat + modifiers"),
                ". Hits if meets/exceeds target's Defense or TN."),
            React.createElement("p", null,
                React.createElement("strong", null, "Target's Defense:"),
                " Passive Defense is ",
                React.createElement("strong", null, "5 + Agility Stat or Defense Stat"),
                " (player chooses best). Modified by cover/abilities."),
            React.createElement("p", null,
                React.createElement("strong", null, "Dodging/Blocking (Reaction):"),
                " If 1 AP saved, spend it when targeted. Roll ",
                React.createElement("strong", null, "d10 + Agility (dodge) or Strength (block)"),
                ". If higher than attacker's roll, attack misses/negated.")),
        React.createElement(Collapsible, { title: "4. Damage and Health" },
            React.createElement("p", null,
                React.createElement("strong", null, "Base Damage:"),
                " Unarmed/Improvised: 1; Small Melee/Pistol: 2; Large Melee/Rifle/Shotgun: 3; Explosives/Heavy: 4+ (Area Effect). STR mod added to melee if STR +2 or higher."),
            React.createElement("p", null,
                React.createElement("strong", null, "Health Points (HP):"),
                " 10 + DEF Stat. At 0 HP, \"Taken Out\" (unconscious, dramatically wounded, captured). PCs rarely killed outright.")),
        React.createElement(Collapsible, { title: "5. Special Moves and Stunt Points in Combat" },
            React.createElement("p", null, "Spend Stunt Points to:"),
            React.createElement("ul", { className: "list-disc list-inside ml-4 my-2 space-y-1" },
                React.createElement("li", null, "Add +1d6 damage to an attack."),
                React.createElement("li", null, "Perform \"Called Shot\" with bonus to hit."),
                React.createElement("li", null, "Inflict condition (stunned, prone, pushed)."),
                React.createElement("li", null, "Perform \"Finishing Move\" on low HP goon for Stunt Point refund."))),
        React.createElement(Collapsible, { title: "6. Team Combos" },
            React.createElement("p", null,
                "Players combine actions. Declare intent, each spends ",
                '>=',
                "1 AP. One player makes primary roll +1 bonus per assister. Greater effect if successful.")),
        React.createElement(Collapsible, { title: "7. Environmental Interactions" },
            React.createElement("p", null, "Kick tables, swing from chandeliers, explode barrels. Usually 1 AP + relevant Stat roll. Grants bonuses, creates obstacles, or looks awesome.")),
        React.createElement(Collapsible, { title: "8. Boss Fights" },
            React.createElement("p", null, "Higher HP/Stats. Multiple Actions/Boss Actions. Signature Abilities. Phases. Monologues (opportunity to act/interrupt!)."))),
    React.createElement(Section, { title: "The Dojo Master (DM)", explosionIntensity: 3 },
        React.createElement("p", null,
            "You are not just a Game Master; you are the ",
            React.createElement("strong", null, "Dojo Master!"),
            " And beneath that lofty title, you also hold these distinguished honors: ",
            React.createElement("em", null, "Sensei of Steel, Master of Aikido, Action Director, Chief of the Chop, Guardian of the Dojo, Stunt Coordinator, Ultimate Sensei, Martial Arts Maestro, Enforcer of the Code (of Action Movie Logic).")),
        React.createElement(Collapsible, { title: "Guide to Being the Dojo Master: Channeling Your Inner Seagal" },
            React.createElement("p", null,
                React.createElement("strong", null, "Voice and Tone:"),
                " Low and monotone, slow and deliberate, soft but intense."),
            React.createElement("p", null,
                React.createElement("strong", null, "Mannerisms:"),
                " Minimal movement, steely gaze, subtle head nods/tilts, slow hand gestures (Aikido hand-swish), optional ponytail stroke."),
            React.createElement("p", null,
                React.createElement("strong", null, "Signature DM Phrases:")),
            React.createElement("ul", { className: "list-disc list-inside ml-4 my-2 space-y-1" },
                React.createElement("li", null, "\"In this world... (dramatic pause) ...there are no second chances. Only sequels.\""),
                React.createElement("li", null, "\"You don\u2019t need a weapon when *you* are the weapon. (But a big gun helps.)\""),
                React.createElement("li", null, "\"Remember, true power lies in calmness... and knowing where the exploding barrels are.\"")),
            React.createElement("p", null,
                React.createElement("strong", null, "Accent and Delivery:"),
                " Mild, unplaceable accent. Even and steady."),
            React.createElement("p", null,
                React.createElement("strong", null, "Overall Persona:"),
                " Unflappable, confident, mysterious, wise (or sounds like it), understated humor, occasionally insert self as NPC."))),
    React.createElement(Section, { title: "Additional Game Elements & Flavor", explosionIntensity: 4 },
        React.createElement(Collapsible, { title: "1. Nemesis Rival System" }, "Introduce a recurring nemesis/rival who dogs players' steps, has personal vendetta, shows up inconveniently, levels up."),
        React.createElement(Collapsible, { title: "2. Signature Moves" }, "After awesome action, petition DM to make it a \"Signature Move.\" Give cool name. Once per session, attempt for enhanced effect (may cost AP/Stunt Point)."),
        React.createElement(Collapsible, { title: "3. Flashback Scenes" }, "Once per story arc, player initiates flashback. Reveals backstory, explains skill, introduces connection. Success may grant bonus/clue/Stunt Point."),
        React.createElement(Collapsible, { title: "4. Cheesy Montage Cards (Optional Prop)" }, "Cards like \"Training Montage Card\" (re-roll skill check), \"Gear-Up Montage Card\" (extra minor equipment)."),
        React.createElement(Collapsible, { title: "5. Over-the-Top Weapons and Gadgets" }, "Explosive gum, laser watches, grappling hook umbrellas, gun shooting exploding knives. Rewards or found items."),
        React.createElement(Collapsible, { title: "6. Dynamic Environmental Hazards" }, "Collapsing buildings, raging fires, electrified floors, gas leaks, crates of anvils. Triggered by anyone for chaotic results."),
        React.createElement(Collapsible, { title: "7. Allies and Sidekicks" }, "Quirky NPCs for comic relief, niche skills, extra body, or liability."),
        React.createElement(Collapsible, { title: "8. Cinematic Rewards" }, "For especially cinematic/creative/trope-filled actions (even failures), DM awards extra Stunt Point, \"Style Point\" (3 for auto Epic Success), or brief narrative control."),
        React.createElement(Collapsible, { title: "9. Villain Monologues" }, "Villains *must* monologue. Players can interrupt (CHA roll vs. villain composure). Success may rattle villain or grant tactical advantage. Stunt Point guarantees interruption."),
        React.createElement(Collapsible, { title: "10. Secret Missions" }, "DM gives each player secret personal objective at start of campaign/arc. Aligned with archetype/backstory/motivation. Completion yields significant reward."))));
const CharacterCreationPage = () => (React.createElement("div", { className: "space-y-6" },
    React.createElement(Section, { title: "Character Creation Guide", explosionIntensity: 5, initiallyOpen: true },
        React.createElement("p", null,
            "Follow these steps to create your over-the-top action hero! For a fillable sheet you can save, check out the ",
            React.createElement(Link, { to: "/fillable-sheet", className: "text-orange-400 hover:text-orange-300 underline" }, "Fillable Sheet"),
            " page."),
        React.createElement(Collapsible, { title: "Step 1: Choose an Archetype", initiallyOpen: true },
            React.createElement("p", null, "Select one of the following archetypes. Each grants specific bonuses."),
            ARCHETYPES.map(arch => (React.createElement(Collapsible, { key: arch.name, title: arch.name, titleClassName: "text-lg text-yellow-500" },
                React.createElement("p", null, arch.description),
                React.createElement("p", null,
                    React.createElement("strong", null, "Bonus:"),
                    " ",
                    arch.bonus),
                React.createElement("p", null,
                    React.createElement("strong", null, "Starting Gear Idea:"),
                    " ",
                    arch.gearIdea))))),
        React.createElement(Collapsible, { title: "Step 2: Generate a Character Description" },
            React.createElement("p", null, "Roll on the Character Description Roll Table for a humorous, Chuck Norris-style one-liner that defines your character's legendary reputation, or create your own with DM approval."),
            React.createElement(NumberedRollTable, { items: CHARACTER_DESCRIPTIONS, title: "Character Description Roll Table", diceType: "d10" })),
        React.createElement(Collapsible, { title: "Step 3: Assign Stats" },
            React.createElement("p", null,
                "Distribute ",
                React.createElement("strong", null, "10 points"),
                " across the following six core stats. No stat can be lower than 0 or higher than 4 at character creation (before Archetype bonuses)."),
            React.createElement("ul", { className: "list-disc list-inside ml-4 my-2 space-y-1" }, STAT_KEYS.map(stat => React.createElement("li", { key: stat }, stat))),
            React.createElement("p", null,
                React.createElement("strong", null, "Health Points (HP):"),
                " Your character starts with ",
                React.createElement("strong", null, "10 + DEF Stat"),
                " Health Points.")),
        React.createElement(Collapsible, { title: "Step 4: Select Starting Gear & Trinket" },
            React.createElement("p", null, "Choose a basic loadout based on your archetype. Roll on the Trinkets Roll Table for a quirky personal item."),
            React.createElement(NumberedRollTable, { items: TRINKETS, title: "Trinkets Roll Table", diceType: "d10" })),
        React.createElement(Collapsible, { title: "Step 5: Choose/Roll a Signature Catchphrase" },
            React.createElement("p", null, "Every action hero needs one! Roll on the table below or invent your own (DM approval needed)."),
            React.createElement(NumberedRollTable, { items: CATCHPHRASES, title: "Catchphrase Roll Table", diceType: "d10" })),
        React.createElement(Collapsible, { title: "Step 6: Defining Trait" },
            React.createElement("p", null, "Choose or roll for a defining trait that sets your character apart. This provides a small mechanical perk or roleplaying hook."),
            React.createElement(NumberedRollTable, { items: DEFINING_TRAITS, title: "Defining Trait Roll Table", diceType: "d6" })),
        React.createElement(Collapsible, { title: "Step 7: Background and Motivation" },
            React.createElement("p", null, "Develop a brief backstory and a personal motivation or secret mission. You can create your own or roll on the tables below for some 90s trope inspiration."),
            React.createElement(NumberedRollTable, { items: BACKGROUND_STORIES, title: "90s Trope Character Backstories", diceType: "d10" }),
            React.createElement(NumberedRollTable, { items: MOTIVATIONS, title: "90s Trope Character Motivations", diceType: "d10" }))),
    React.createElement(Section, { title: "Static Printable Character Sheet", explosionIntensity: 2 },
        React.createElement(CharacterSheetLayout, { staticData: true }))));
// Renamed CharacterSheet to CharacterSheetLayout to be more generic for static and fillable
const CharacterSheetLayout = ({ sheetData, onInputChange, onNumberInputChange, staticData = false, selectedArchetype }) => {
    const data = staticData ? INITIAL_FILLABLE_SHEET_DATA : sheetData || INITIAL_FILLABLE_SHEET_DATA;
    const inputClass = "w-full p-1 border border-gray-400 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500 print:bg-white print:text-black print:border-black";
    const textareaClass = `${inputClass} min-h-[60px]`;
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 print:text-black";
    const fieldWrapperClass = "mb-3";
    return (React.createElement("div", { className: "printable-character-sheet p-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-black dark:border-gray-500 print:border-black print:bg-white print:text-black" },
        React.createElement("h2", { className: "font-action text-3xl text-center mb-4 text-orange-600 dark:text-orange-500 print:text-black" }, "ACTION HERO CHARACTER SHEET"),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 print:grid-cols-3" },
            React.createElement("div", { className: `print:col-span-1 ${fieldWrapperClass}` },
                React.createElement("label", { htmlFor: "name", className: labelClass }, "Name:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.name || "____________________") : React.createElement("input", { type: "text", name: "name", id: "name", value: data.name, onChange: onInputChange, className: inputClass })),
            React.createElement("div", { className: `print:col-span-2 ${fieldWrapperClass}` },
                React.createElement("label", { htmlFor: "archetypeName", className: labelClass }, "Archetype:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.archetypeName || "____________________") :
                    React.createElement("select", { name: "archetypeName", id: "archetypeName", value: data.archetypeName, onChange: onInputChange, className: inputClass }, ARCHETYPES.map(arch => React.createElement("option", { key: arch.name, value: arch.name }, arch.name))))),
        selectedArchetype && !staticData && (React.createElement("div", { className: "mb-3 p-2 bg-orange-100 dark:bg-orange-900/30 rounded text-sm" },
            React.createElement("p", null,
                React.createElement("strong", null, "Bonus:"),
                " ",
                selectedArchetype.bonus),
            React.createElement("p", null,
                React.createElement("strong", null, "Gear Idea:"),
                " ",
                selectedArchetype.gearIdea))),
        React.createElement("div", { className: fieldWrapperClass },
            React.createElement("label", { htmlFor: "description", className: labelClass }, "Legendary Description:"),
            staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.description || "____________________________________________________") : React.createElement("textarea", { name: "description", id: "description", value: data.description, onChange: onInputChange, className: textareaClass, rows: 2 })),
        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mb-4 print:grid-cols-3" },
            STAT_KEYS.map(statKey => (React.createElement("div", { key: statKey, className: fieldWrapperClass },
                React.createElement("label", { htmlFor: `stat-${statKey}`, className: labelClass },
                    statKey,
                    ":"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.stats[statKey] || "0") : React.createElement("input", { type: "number", name: `stat-${statKey}`, id: `stat-${statKey}`, value: data.stats[statKey], onChange: onNumberInputChange, className: `${inputClass} w-16 text-center`, min: "0", max: "10" })))),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "hp", className: labelClass }, "HP:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.hp || "10") : React.createElement("input", { type: "number", name: "hp", id: "hp", value: data.hp, onChange: onNumberInputChange, className: `${inputClass} w-16 text-center` })),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "maxHp", className: labelClass }, "Max HP:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.maxHp || "10") : React.createElement("input", { type: "number", name: "maxHp", id: "maxHp", value: data.maxHp, onChange: onNumberInputChange, className: `${inputClass} w-16 text-center` })),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "stuntPoints", className: labelClass }, "Stunt Points:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.stuntPoints || "0") : React.createElement("input", { type: "number", name: "stuntPoints", id: "stuntPoints", value: data.stuntPoints, onChange: onNumberInputChange, className: `${inputClass} w-16 text-center` }))),
        React.createElement("div", { className: "space-y-2 mb-4" },
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "catchphrase", className: labelClass }, "Catchphrase:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.catchphrase || "____________________") : React.createElement("input", { type: "text", name: "catchphrase", id: "catchphrase", value: data.catchphrase, onChange: onInputChange, className: inputClass })),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "definingTraitName", className: labelClass }, "Defining Trait Name:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.definingTraitName || "____________________") : React.createElement("input", { type: "text", name: "definingTraitName", id: "definingTraitName", value: data.definingTraitName, onChange: onInputChange, className: inputClass, placeholder: "e.g., Unflappable Calm" })),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "definingTraitDescription", className: labelClass }, "Defining Trait Description:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.definingTraitDescription || "____________________") : React.createElement("textarea", { name: "definingTraitDescription", id: "definingTraitDescription", value: data.definingTraitDescription, onChange: onInputChange, className: textareaClass, rows: 2, placeholder: "Description of the trait's effect" })),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "actionHeroFeats", className: labelClass }, "Action Hero Feat(s):"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.actionHeroFeats || "____________________") : React.createElement("textarea", { name: "actionHeroFeats", id: "actionHeroFeats", value: data.actionHeroFeats, onChange: onInputChange, className: textareaClass, rows: 2 })),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "signatureMoves", className: labelClass }, "Signature Move(s):"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.signatureMoves || "____________________") : React.createElement("textarea", { name: "signatureMoves", id: "signatureMoves", value: data.signatureMoves, onChange: onInputChange, className: textareaClass, rows: 2 }))),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 print:grid-cols-2" },
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "gear", className: labelClass }, "Gear:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.gear || "____________________") : React.createElement("textarea", { name: "gear", id: "gear", value: data.gear, onChange: onInputChange, className: textareaClass, rows: 3 })),
            React.createElement("div", { className: fieldWrapperClass },
                React.createElement("label", { htmlFor: "trinket", className: labelClass }, "Trinket:"),
                staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.trinket || "____________________") : React.createElement("input", { type: "text", name: "trinket", id: "trinket", value: data.trinket, onChange: onInputChange, className: inputClass }))),
        React.createElement("div", { className: fieldWrapperClass },
            React.createElement("label", { htmlFor: "background", className: labelClass }, "Background:"),
            staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.background || "____________________") : React.createElement("textarea", { name: "background", id: "background", value: data.background, onChange: onInputChange, className: textareaClass, rows: 3 })),
        React.createElement("div", { className: fieldWrapperClass },
            React.createElement("label", { htmlFor: "motivation", className: labelClass }, "Motivation/Secret Mission:"),
            staticData ? React.createElement("p", { className: "border-b border-gray-400 print:border-black h-6" }, data.motivation || "____________________") : React.createElement("textarea", { name: "motivation", id: "motivation", value: data.motivation, onChange: onInputChange, className: textareaClass, rows: 3 })),
        !staticData && (React.createElement("div", { className: "text-center mt-6 space-x-2 no-print" },
            React.createElement(ActionButton, { onClick: () => window.print() }, "Print Sheet"))),
        React.createElement("p", { className: "text-xs text-center print-only mt-2" }, "Sheet Version 1.1 - ACTION HEROES: THE RPG!")));
};
const FillableCharacterSheetPage = () => {
    const LOCAL_STORAGE_KEY = 'actionHeroFillableSheet_v1';
    const [sheetData, setSheetData] = useState(INITIAL_FILLABLE_SHEET_DATA);
    const [selectedArchetype, setSelectedArchetype] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    useEffect(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                // Ensure stats object is complete, merging with initial if necessary
                const completeStats = STAT_KEYS.reduce((acc, statKey) => {
                    var _a, _b;
                    acc[statKey] = (_b = (_a = parsedData.stats) === null || _a === void 0 ? void 0 : _a[statKey]) !== null && _b !== void 0 ? _b : 0;
                    return acc;
                }, {});
                setSheetData(Object.assign(Object.assign(Object.assign({}, INITIAL_FILLABLE_SHEET_DATA), parsedData), { stats: completeStats }));
            }
            catch (error) {
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
            setSheetData(prev => (Object.assign(Object.assign({}, prev), { maxHp: newMaxHp, hp: Math.min(prev.hp, newMaxHp) })));
        }
    }, [sheetData.archetypeName, sheetData.stats, sheetData.hp, sheetData.maxHp]); // Added dependencies
    const showFeedback = (message) => {
        setFeedbackMessage(message);
        setTimeout(() => setFeedbackMessage(null), 3000);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSheetData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleNumberInputChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseInt(value);
        if (name.startsWith("stat-")) {
            const statKey = name.replace("stat-", ""); // Simpler split
            setSheetData(prev => (Object.assign(Object.assign({}, prev), { stats: Object.assign(Object.assign({}, prev.stats), { [statKey]: isNaN(numValue) ? 0 : numValue }) })));
        }
        else {
            setSheetData(prev => (Object.assign(Object.assign({}, prev), { [name]: isNaN(numValue) ? 0 : numValue })));
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
    return (React.createElement(Section, { title: "Fillable Character Sheet", explosionIntensity: 3, initiallyOpen: true },
        React.createElement("p", { className: "mb-4" }, "Fill in your hero's details below. Your data will be saved in your browser."),
        feedbackMessage && (React.createElement("div", { className: `p-3 mb-4 rounded-md text-sm ${feedbackMessage.includes("Saved") ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}` }, feedbackMessage)),
        React.createElement(CharacterSheetLayout, { sheetData: sheetData, onInputChange: handleInputChange, onNumberInputChange: handleNumberInputChange, selectedArchetype: selectedArchetype }),
        React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 no-print" },
            React.createElement(ActionButton, { onClick: saveSheet, className: "w-full sm:w-auto" }, "Save Sheet"),
            React.createElement(ActionButton, { onClick: clearSheet, className: "w-full sm:w-auto bg-red-600 hover:bg-red-700" }, "Clear Sheet"))));
};
const NpcBestiaryPage = () => (React.createElement(Section, { title: "NPCs / Bestiary: The Legends of the Silver Fist", explosionIntensity: 5 },
    React.createElement("p", null, "These are near-mythical, almost impossible-to-defeat NPC action heroes who might occasionally appear. The Dojo Master can use the \"Legends of the Silver Fist\" mechanic to bring them into play."),
    React.createElement(Collapsible, { title: "\"Legends of the Silver Fist\" Mechanic", initiallyOpen: true },
        React.createElement("p", null,
            React.createElement("strong", null, "Overview:"),
            " Once per session (or per story arc), DM may roll on the table OR pick a Legend. The Legend appears dramatically, delivers justice/mayhem/wisdom, then vanishes mysteriously."),
        React.createElement("p", null,
            React.createElement("strong", null, "Trigger Conditions:"),
            " Player rolls natural 1 or 10; Chaos Escalation result; players about to be TPK'd; DM feels it's awesome; reward for trope-heavy play.")),
    React.createElement(NumberedRollTable, { items: LEGENDS_OF_THE_SILVER_FIST, title: "Legends of the Silver Fist Table", diceType: "d10" }),
    React.createElement(Collapsible, { title: "Optional Twist for Legends" },
        React.createElement("p", null, "If a player character attempts to imitate, appeal to, or dramatically acknowledge one of the Legends, the DM might grant that player advantage on their next roll or a small temporary buff out of sheer respect from the Legend (or the universe)."))));
const GeneralRollTablesPage = () => (React.createElement("div", { className: "space-y-6" },
    React.createElement(Section, { title: "General Roll Tables", explosionIntensity: 3, initiallyOpen: true },
        React.createElement(NumberedRollTable, { items: PLOT_HOOKS, title: "Plot Hooks for Instant Action!", diceType: "d10" }),
        React.createElement(NumberedRollTable, { items: RANDOM_NPC_GENERATOR, title: "Random NPC Generator for Instant Contact/Complication!", diceType: "d10" }))));
const CampaignPageRenderer = ({ campaign }) => {
    return (React.createElement(Section, { title: campaign.title, explosionIntensity: 5, initiallyOpen: false },
        React.createElement("p", null,
            React.createElement("strong", null, "Story Hook:"),
            " ",
            campaign.storyHook),
        campaign.worldMapConcept && React.createElement("p", { className: "mt-2" },
            React.createElement("strong", null, "World Map Concept:"),
            " ",
            campaign.worldMapConcept),
        React.createElement("h3", { className: "text-xl font-semibold text-yellow-400 mt-4 mb-2" }, "Key Locations:"),
        campaign.keyLocations.map((loc, index) => (React.createElement(Collapsible, { key: index, title: loc.name, titleClassName: "text-lg text-orange-400", initiallyOpen: false },
            React.createElement("p", { className: "italic text-gray-400 dark:text-gray-500 mb-1" }, loc.description),
            loc.whatHappens && loc.whatHappens.length > 0 && (React.createElement(React.Fragment, null,
                React.createElement("h4", { className: "font-semibold text-yellow-300 mt-2" }, "What Happens Here:"),
                React.createElement("ul", { className: "list-disc list-inside ml-4 text-sm space-y-1" }, loc.whatHappens.map((wh, i) => React.createElement("li", { key: i }, wh))))),
            loc.mapPrompt && React.createElement("p", { className: "text-xs italic text-gray-500 mt-2" },
                "Map Prompt Idea: ",
                loc.mapPrompt))))));
};
const CampaignsPage = () => (React.createElement("div", { className: "space-y-6" },
    React.createElement(Section, { title: "Campaign Story Arcs", explosionIntensity: 5, initiallyOpen: true },
        React.createElement("p", null, "Here are five fully fleshed-out campaign story arcs to get your adrenaline pumping!")),
    CAMPAIGNS.map(campaign => React.createElement(CampaignPageRenderer, { key: campaign.id, campaign: campaign })),
    React.createElement(NpcBestiaryPage, null),
    React.createElement(GeneralRollTablesPage, null)));
const ToolsPage = () => {
    const handlePrint = (printModeClass) => {
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
    return (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
        React.createElement("div", { className: "md:col-span-1" },
            React.createElement(Section, { title: "Dice Roller", explosionIntensity: 1, initiallyOpen: true },
                React.createElement(DiceRoller, null))),
        React.createElement("div", { className: "md:col-span-1" },
            React.createElement(Section, { title: "Character Generator", explosionIntensity: 3, initiallyOpen: true },
                React.createElement(CharacterGenerator, null))),
        React.createElement("div", { className: "md:col-span-2" },
            React.createElement(Section, { title: "PDF Export Options", explosionIntensity: 2, initiallyOpen: true },
                React.createElement("p", { className: "mb-4" },
                    "Use these options to save the TTRPG content as a PDF. For best results, use your browser's \"Save as PDF\" destination in the print dialog. ",
                    React.createElement("strong", { className: "text-yellow-400" }, "Tip:"),
                    " Expand any collapsible sections you want included in the PDF before printing."),
                React.createElement("div", { className: "flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4" },
                    React.createElement(ActionButton, { onClick: () => handlePrint('print-full-visuals-active'), className: "w-full sm:w-auto" }, "Save as PDF (Full Visuals)"),
                    React.createElement(ActionButton, { onClick: () => handlePrint('print-ink-saver-active'), className: "w-full sm:w-auto bg-sky-600 hover:bg-sky-700" }, "Download Print-Friendly PDF")),
                React.createElement("p", { className: "text-xs text-gray-400 dark:text-gray-500 mt-4" }, "Note: PDF generation quality may vary by browser. Chrome is generally recommended for \"Save as PDF\". The \"Print-Friendly\" version drastically reduces ink usage by removing backgrounds and simplifying styles.")))));
};
const ExtrasPage = () => (React.createElement("div", { className: "space-y-6" },
    React.createElement(Section, { title: "Action Movie Glossary", explosionIntensity: 2, initiallyOpen: true },
        React.createElement("p", { className: "mb-4" }, "Key terms and tropes from the world of 90s action cinema and TTRPGs."),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, ACTION_MOVIE_GLOSSARY.map(term => (React.createElement("div", { key: term.term, className: "p-3 bg-gray-800/70 dark:bg-black/50 rounded-md" },
            React.createElement(Tooltip, { text: term.definition },
                React.createElement("h4", { className: "font-semibold text-orange-400 text-lg cursor-help" }, term.term)),
            React.createElement("p", { className: "text-sm text-gray-300 dark:text-gray-400" }, term.definition),
            term.category && React.createElement("p", { className: "text-xs text-yellow-500 mt-1" },
                React.createElement("em", null,
                    "Category: ",
                    term.category))))))),
    React.createElement(Section, { title: "Recommended Viewing List", explosionIntensity: 3 },
        React.createElement("p", { className: "mb-4" }, "Need inspiration? Check out these classic action flicks!"),
        React.createElement(StyledTable, { headers: ["Title", "Theme/Reason"], data: RECOMMENDED_VIEWING_LIST.map(item => [item.title, item.theme]), caption: React.createElement("span", { className: "font-action text-2xl text-orange-500 dark:text-orange-400 tracking-wider uppercase" }, "Must-Watch Action Movies") })),
    React.createElement(Section, { title: "Behind The Scenes", explosionIntensity: 1 },
        React.createElement("p", { className: "mb-4" }, "Some design notes and inspirations for ACTION HEROES: THE RPG!"),
        BEHIND_THE_SCENES_NOTES.map(note => (React.createElement(Collapsible, { key: note.title, title: note.title, titleClassName: "text-lg text-yellow-400" },
            React.createElement("p", null, note.content)))))));
const App = () => {
    const [isDarkMode, toggleTheme] = useTheme();
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return (React.createElement("div", { className: `min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-950 text-gray-200' : 'bg-gray-100 text-gray-800'} transition-colors duration-300` },
        React.createElement(Header, { isDarkMode: isDarkMode, toggleTheme: toggleTheme }),
        React.createElement("main", { className: "flex-grow container mx-auto px-4 py-8" },
            React.createElement(Suspense, { fallback: React.createElement("div", { className: "text-center p-10 text-2xl font-action" }, "LOADING ACTION...") },
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(CoverPage, null) }),
                    React.createElement(Route, { path: "/rules", element: React.createElement(RulesPage, null) }),
                    React.createElement(Route, { path: "/characters", element: React.createElement(CharacterCreationPage, null) }),
                    React.createElement(Route, { path: "/fillable-sheet", element: React.createElement(FillableCharacterSheetPage, null) }),
                    React.createElement(Route, { path: "/campaigns", element: React.createElement(CampaignsPage, null) }),
                    React.createElement(Route, { path: "/tools", element: React.createElement(ToolsPage, null) }),
                    React.createElement(Route, { path: "/extras", element: React.createElement(ExtrasPage, null) }),
                    React.createElement(Route, { path: "*", element: React.createElement("div", null,
                            React.createElement("h1", { className: "font-action text-4xl text-red-500" }, "404 - PAGE NOT FOUND, MAGGOT!"),
                            React.createElement("p", null, "Looks like you took a wrong turn into a B-movie dead end.")) })))),
        React.createElement(Footer, null),
        React.createElement(BackToTopButton, null)));
};
export default App;
