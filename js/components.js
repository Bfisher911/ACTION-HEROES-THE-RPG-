import React, { useState, useEffect, useCallback } from 'react';
import { Stat } from './types';
import { ARCHETYPES, BACKGROUND_STORIES, BASE_HP, CATCHPHRASES, CHARACTER_DESCRIPTIONS, DEFINING_TRAITS, getRandomElement, MAX_STAT_INITIAL, MIN_STAT_INITIAL, MOTIVATIONS, rollD10, STAT_KEYS, STAT_POINTS_TOTAL, TRINKETS } from './constants';
// SVG Icons
export const FilmStripIcon = ({ className }) => (React.createElement("svg", { className: `decorative-film-strip-icon ${className}`, viewBox: "0 0 100 20", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("rect", { width: "100", height: "20" }),
    React.createElement("rect", { x: "5", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "15", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "25", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "35", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "45", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "55", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "65", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "75", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "85", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "95", y: "3", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "5", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "15", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "25", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "35", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "45", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "55", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "65", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "75", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "85", y: "13", width: "4", height: "4", fill: "white" }),
    React.createElement("rect", { x: "95", y: "13", width: "4", height: "4", fill: "white" })));
export const CrimeSceneTapePattern = ({ className }) => (React.createElement("div", { className: `crime-scene-tape-pattern h-8 bg-yellow-400 text-black font-bold overflow-hidden whitespace-nowrap flex items-center ${className}` },
    React.createElement("div", { className: "animate-marquee" },
        React.createElement("span", { className: "mx-4" }, "DO NOT CROSS - ACTION ZONE - DO NOT CROSS - ACTION ZONE -"),
        React.createElement("span", { className: "mx-4" }, "DO NOT CROSS - ACTION ZONE - DO NOT CROSS - ACTION ZONE -")),
    React.createElement("style", null, `
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: inline-block;
        animation: marquee 10s linear infinite;
      }
    `)));
export const BulletHoleIcon = ({ className }) => (React.createElement("svg", { className: `decorative-bullet-hole ${className}`, width: "24", height: "24", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("circle", { cx: "50", cy: "50", r: "12", fill: "black" }),
    React.createElement("path", { d: "M50 30 L40 45 L30 40 L35 50 L30 60 L40 55 L50 70 L60 55 L70 60 L65 50 L70 40 L60 45 Z", fill: "rgba(0,0,0,0.5)" })));
export const ExplosionIcon = ({ className }) => (React.createElement("svg", { className: `explosion-meter-icon ${className}`, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M12 2C9.28 2 7.03 3.58 5.83 5.83L2.22 7.5L5.83 9.17C7.03 11.42 9.28 13 12 13C14.72 13 16.97 11.42 18.17 9.17L21.78 7.5L18.17 5.83C16.97 3.58 14.72 2 12 2ZM12 4C13.47 4 14.84 4.79 15.83 6.04L17.5 9H14V11H10V9H6.5L8.17 6.04C9.16 4.79 10.53 4 12 4ZM6 14V22H8V14H6ZM10 14V22H14V14H10ZM16 14V22H18V14H16Z" })));
export const Section = ({ title, children, explosionIntensity, initiallyOpen = true }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);
    return (React.createElement("section", { className: "mb-8 p-4 md:p-6 bg-gray-800/50 dark:bg-black/30 border-2 border-orange-500 rounded-lg shadow-2xl relative overflow-hidden" },
        React.createElement("div", { className: "decorative-film-strip-border" },
            React.createElement("div", { className: "absolute top-0 left-0 right-0 h-5 bg-repeat-x", style: { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20' viewBox='0 0 80 20'%3E%3Crect width='80' height='20' fill='%231f2937'/%3E%3Crect x='5' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='15' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='25' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='35' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='45' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='55' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='65' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='75' y='3' width='4' height='14' fill='%23f97316'/%3E%3C/svg%3E")` } })),
        React.createElement(BulletHoleIcon, { className: "absolute top-2 right-16 w-6 h-6 text-gray-400 dark:text-gray-600 transform rotate-12 decorative-bullet-hole" }),
        React.createElement(BulletHoleIcon, { className: "absolute top-8 right-2 w-5 h-5 text-gray-400 dark:text-gray-600 transform -rotate-6 decorative-bullet-hole" }),
        React.createElement("header", { className: "mb-4 pt-5 flex justify-between items-center cursor-pointer", onClick: () => setIsOpen(!isOpen) },
            React.createElement("h2", { className: "font-action text-3xl md:text-4xl text-orange-500 tracking-wider uppercase" }, title),
            React.createElement("div", { className: "flex items-center" },
                explosionIntensity !== undefined && React.createElement(ExplosionMeter, { intensity: explosionIntensity }),
                React.createElement("span", { className: "text-2xl text-orange-500 ml-4" }, isOpen ? '▼' : '►'))),
        isOpen && (React.createElement("div", { className: "prose prose-invert max-w-none prose-headings:text-orange-400 prose-a:text-yellow-400 hover:prose-a:text-yellow-300 prose-strong:text-orange-300" }, children)),
        React.createElement("div", { className: "decorative-film-strip-border" },
            React.createElement("div", { className: "absolute bottom-0 left-0 right-0 h-5 bg-repeat-x", style: { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20' viewBox='0 0 80 20'%3E%3Crect width='80' height='20' fill='%231f2937'/%3E%3Crect x='5' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='15' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='25' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='35' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='45' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='55' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='65' y='3' width='4' height='14' fill='%23f97316'/%3E%3Crect x='75' y='3' width='4' height='14' fill='%23f97316'/%3E%3C/svg%3E")` } }))));
};
export const Collapsible = ({ title, children, initiallyOpen = false, titleClassName = "text-xl text-yellow-400 font-semibold" }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);
    return (React.createElement("div", { className: "mb-4" },
        React.createElement("button", { onClick: () => setIsOpen(!isOpen), className: `w-full text-left p-3 bg-gray-700/70 dark:bg-black/50 hover:bg-gray-600/70 dark:hover:bg-gray-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center ${titleClassName}` },
            title,
            React.createElement("span", { className: "text-orange-500 text-xl" }, isOpen ? '▲' : '▼')),
        isOpen && React.createElement("div", { className: "mt-2 p-3 bg-gray-800/50 dark:bg-black/30 rounded-md" }, children)));
};
export const StyledTable = ({ headers, data, caption }) => (React.createElement("div", { className: "my-4 overflow-x-auto classified-document-style p-4 border-2 border-dashed border-gray-500 dark:border-gray-400 bg-amber-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-sm" },
    caption && React.createElement("caption", { className: "p-2 text-lg font-semibold text-left text-gray-700 dark:text-gray-300" }, caption),
    React.createElement("table", { className: "min-w-full divide-y divide-gray-400 dark:divide-gray-500 font-mono" },
        React.createElement("thead", { className: "bg-gray-200 dark:bg-gray-600" },
            React.createElement("tr", null, headers.map((header, index) => (React.createElement("th", { key: index, scope: "col", className: "px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300" }, header))))),
        React.createElement("tbody", { className: "bg-amber-50 dark:bg-gray-700 divide-y divide-gray-300 dark:divide-gray-500" }, data.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex, className: "hover:bg-gray-100 dark:hover:bg-gray-600/50" }, row.map((cell, cellIndex) => (React.createElement("td", { key: cellIndex, className: `px-4 py-2 whitespace-normal text-sm text-gray-700 dark:text-gray-200 ${cellIndex === 0 && typeof cell === 'string' && cell.match(/^\d+$/) ? 'w-20 text-center font-bold' : ''}` }, cell))))))))));
export const ExplosionMeter = ({ intensity }) => (React.createElement("div", { className: "flex items-center", title: `Explosion Intensity: ${intensity}/5` }, Array.from({ length: 5 }).map((_, i) => (React.createElement(ExplosionIcon, { key: i, className: `w-5 h-5 md:w-6 md:h-6 ${i < intensity ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}` })))));
export const DiceRoller = () => {
    const [result, setResult] = useState(null);
    const [rolling, setRolling] = useState(false);
    const handleRoll = () => {
        setRolling(true);
        setResult(null);
        setTimeout(() => {
            const roll = rollD10();
            setResult(roll);
            setRolling(false);
        }, 500); // Simulate rolling animation
    };
    return (React.createElement("div", { className: "p-4 bg-gray-700/50 dark:bg-black/50 rounded-lg shadow-md text-center" },
        React.createElement("h3", { className: "text-xl font-action text-yellow-400 mb-2" }, "D10 Dice Roller"),
        React.createElement("button", { onClick: handleRoll, disabled: rolling, className: "no-print px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors duration-150 ease-in-out disabled:opacity-50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400" }, rolling ? "Rolling..." : "Roll d10"),
        result !== null && (React.createElement("div", { className: "mt-4 text-4xl font-action tracking-wider" },
            React.createElement("p", { className: `p-4 rounded-lg inline-block ${result === 1 ? 'bg-red-700 text-white shadow-lg' :
                    result === 10 ? 'bg-green-600 text-white shadow-lg' :
                        'bg-gray-600 dark:bg-gray-800 text-yellow-300'}` }, result),
            result === 1 && React.createElement("p", { className: "text-sm text-red-400 mt-1" }, "Disastrous Fail!"),
            result === 10 && React.createElement("p", { className: "text-sm text-green-400 mt-1" }, "Epic Success!")))));
};
export const CharacterGenerator = () => {
    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const generateCharacter = useCallback(() => {
        setIsLoading(true);
        setCharacter(null);
        setTimeout(() => {
            var _a, _b;
            const archetype = getRandomElement(ARCHETYPES);
            const description = getRandomElement(CHARACTER_DESCRIPTIONS);
            const trinket = getRandomElement(TRINKETS);
            const catchphrase = getRandomElement(CATCHPHRASES);
            const definingTrait = getRandomElement(DEFINING_TRAITS);
            const background = getRandomElement(BACKGROUND_STORIES);
            const motivation = getRandomElement(MOTIVATIONS);
            let points = STAT_POINTS_TOTAL;
            const stats = STAT_KEYS.map(stat => ({ stat, value: MIN_STAT_INITIAL }));
            // Apply archetype bonuses (simplified for brevity, ensure all archetypes are covered in full code)
            const bonuses = ((_a = ARCHETYPES.find(a => a.name === archetype.name)) === null || _a === void 0 ? void 0 : _a.bonus.split(', ')) || [];
            bonuses.forEach(b => {
                const parts = b.match(/([+-]\d+) to (Combat|Agility|Strength|Intellect|Charisma|Defense)/i);
                if (parts && parts.length >= 3) {
                    const value = parseInt(parts[1]);
                    const statName = parts[2]; // This needs proper mapping
                    // This mapping is tricky due to Stat enum values having spaces and parens.
                    // For a robust solution, map bonus strings to Stat enum keys more carefully.
                    // Quick fix: assuming direct match on simplified stat name for now
                    const targetStat = stats.find(s => s.stat.toLowerCase().includes(statName.toLowerCase()));
                    if (targetStat)
                        targetStat.value += value;
                }
            });
            while (points > 0) {
                const randomStatIndex = Math.floor(Math.random() * STAT_KEYS.length);
                if (stats[randomStatIndex].value < MAX_STAT_INITIAL) {
                    stats[randomStatIndex].value++;
                    points--;
                }
                if (stats.every(s => s.value >= MAX_STAT_INITIAL) && points > 0)
                    break; // Avoid infinite loop if all maxed
            }
            const defenseStat = ((_b = stats.find(s => s.stat === Stat.Defense)) === null || _b === void 0 ? void 0 : _b.value) || 0;
            const hp = BASE_HP + defenseStat;
            setCharacter({
                archetype,
                description,
                stats,
                hp,
                gear: archetype.gearIdea,
                trinket,
                catchphrase,
                definingTrait,
                background,
                motivation
            });
            setIsLoading(false);
        }, 750);
    }, []);
    useEffect(() => {
        generateCharacter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isLoading) {
        return React.createElement("div", { className: "text-center p-6 text-yellow-400" }, "Generating explosive new character...");
    }
    if (!character) {
        return (React.createElement("div", { className: "text-center p-6" },
            React.createElement("p", { className: "text-red-400 mb-4" }, "Could not generate character. Try again!"),
            React.createElement(ActionButton, { onClick: generateCharacter, className: "no-print" }, "Generate Character")));
    }
    return (React.createElement("div", { className: "p-4 bg-gray-700/70 dark:bg-black/50 rounded-lg shadow-xl" },
        React.createElement("div", { className: "flex justify-between items-center mb-4" },
            React.createElement("h3", { className: "font-action text-2xl text-yellow-400" }, "Random Character"),
            React.createElement(ActionButton, { onClick: generateCharacter, className: "px-4 py-2 text-sm no-print" }, "Re-Generate")),
        React.createElement("div", { className: "space-y-3 text-gray-200 dark:text-gray-300" },
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Archetype:"),
                " ",
                character.archetype.name,
                " - ",
                React.createElement("span", { className: "text-sm italic" }, character.archetype.description)),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Legendary Description:"),
                " \"",
                character.description,
                "\""),
            React.createElement("div", null,
                React.createElement("strong", { className: "text-orange-400" }, "Stats:"),
                React.createElement("ul", { className: "list-disc list-inside ml-4" }, character.stats.map(s => React.createElement("li", { key: s.stat },
                    s.stat,
                    ": ",
                    s.value)))),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "HP:"),
                " ",
                character.hp),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Suggested Gear:"),
                " ",
                character.gear),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Trinket:"),
                " ",
                character.trinket),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Catchphrase:"),
                " \"",
                character.catchphrase,
                "\""),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Defining Trait:"),
                " ",
                character.definingTrait.name,
                " - ",
                React.createElement("span", { className: "text-sm italic" }, character.definingTrait.description)),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Background:"),
                " ",
                character.background),
            React.createElement("p", null,
                React.createElement("strong", { className: "text-orange-400" }, "Motivation:"),
                " ",
                character.motivation))));
};
export const ThemeToggle = ({ isDarkMode, toggleTheme }) => (React.createElement("button", { onClick: toggleTheme, className: "no-print p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors", "aria-label": "Toggle theme" }, isDarkMode ? (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-yellow-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }))) : (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" })))));
export const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
    return (React.createElement(React.Fragment, null, isVisible && (React.createElement("button", { onClick: scrollToTop, className: "no-print fixed bottom-6 right-6 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-opacity duration-300 z-50", "aria-label": "Scroll to top" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 15l7-7 7 7" }))))));
};
export const LoadingBar = ({ progress }) => (React.createElement("div", { className: "w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-600 shadow-inner overflow-hidden" },
    React.createElement("div", { className: "bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out", style: { width: `${progress}%` } })));
export const Tooltip = ({ text, children }) => {
    return (React.createElement("span", { className: "group relative inline-block" },
        children,
        React.createElement("span", { className: "invisible group-hover:visible absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black/80 rounded-md whitespace-nowrap shadow-lg transition-opacity duration-200" }, text)));
};
export const ActionButton = ({ onClick, children, className = '', disabled = false }) => (React.createElement("button", { onClick: onClick, disabled: disabled, className: `no-print px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-action rounded-lg transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 ${className}` }, children));
export const NumberedRollTable = ({ items, title, diceType }) => {
    const headers = [`Roll (${diceType.toUpperCase()})`, "Result"];
    const data = items.map((item, index) => {
        const rollNumber = index + 1;
        let resultCell;
        if (typeof item === 'string') {
            resultCell = item;
        }
        else { // RollTableItem
            resultCell = (React.createElement(React.Fragment, null,
                React.createElement("strong", null,
                    item.name,
                    ":"),
                " ",
                item.description));
        }
        return [rollNumber.toString(), resultCell];
    });
    return (React.createElement("div", { className: "my-6 classified-document-style p-3 md:p-4 border-2 border-dashed border-gray-500 dark:border-gray-400 bg-amber-50 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 rounded-sm shadow-lg" },
        React.createElement("h4", { className: "text-xl font-action text-gray-700 dark:text-orange-400 mb-3 tracking-wide" }, title),
        React.createElement("div", { className: "overflow-x-auto" },
            React.createElement("table", { className: "min-w-full divide-y divide-gray-400 dark:divide-gray-500 font-mono text-sm" },
                React.createElement("thead", { className: "bg-gray-200 dark:bg-gray-700" },
                    React.createElement("tr", null, headers.map((header, index) => (React.createElement("th", { key: index, scope: "col", className: "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300" }, header))))),
                React.createElement("tbody", { className: "bg-amber-50 dark:bg-gray-700/70 divide-y divide-gray-300 dark:divide-gray-600" }, data.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex, className: "hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors duration-150" }, row.map((cell, cellIndex) => (React.createElement("td", { key: cellIndex, className: `px-3 py-2 whitespace-normal ${cellIndex === 0 ? 'w-20 md:w-24 text-center font-bold text-orange-600 dark:text-yellow-400' : 'text-gray-800 dark:text-gray-200'}` }, cell)))))))))));
};
