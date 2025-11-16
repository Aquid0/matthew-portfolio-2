import { useStore } from "@/stores/StoreContext";

import { TYPE_SPEED } from "./constants";
import { asciiArt } from "./data/ascii-art";
import { useTypewriter } from "./hooks/useTypewriter";
import { highlightKeywords } from "./utils/highlightKeywords";

export const QuickActions = () => {
  const { terminalStore } = useStore();
  const introText = "Matthew | Front End Engineer Intern @ Amazon";
  const summary =
    "Specializing in React, TypeScript, and modern web development";

  const displayedText = useTypewriter(introText);
  const displayedText2 = useTypewriter(
    summary,
    TYPE_SPEED,
    introText.length * TYPE_SPEED,
  );
  const links = [
    { label: "About", command: "about" },
    { label: "Projects", command: "projects" },
    { label: "Skills", command: "skills" },
    { label: "Contact", command: "contact" },
    { label: "Quick Actions", command: "quick_actions" },
  ];

  return (
    <div className="my-3 -ml-2 border border-dashed border-[#2D2B40] p-4">
      <div className="text-center text-[#E0DEF4]/80">
        <p className="mb-2">
          {highlightKeywords(displayedText, introText, {
            keyword: "Amazon",
            color: "text-[#FF9900]",
          })}
        </p>
        <p className="min-h-[1.25rem] text-sm">
          {highlightKeywords(displayedText2 || "", summary, [
            { keyword: "React", color: "text-[#61DBFB]" },
            { keyword: "TypeScript", color: "text-[#007acc]" },
          ])}
          <span
            className={`text-lg ${displayedText.length >= introText.length ? "caret-blink" : "invisible"}`}
          >
            ▋
          </span>
        </p>
      </div>

      <div className="flex-col gap-8">
        <pre className="text-center text-xs leading-tight text-white">
          {asciiArt}
        </pre>

        <div className="flex justify-center gap-2">
          {links.map((link) => (
            <button
              key={link.command}
              onClick={() =>
                terminalStore.executeInTerminal("main-terminal", link.command)
              }
              className="px-2 py-1 text-left text-[#7C76C7] transition-colors hover:bg-[#7C76C7]/20"
            >
              [ {link.label} ]
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
