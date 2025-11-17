import { useStore } from "@/stores/StoreContext";
import { highlightKeywords, lastCommit } from "@/utils/";

import { ASCII_ART, QUICK_ACTION_LINKS, TYPE_SPEED } from "../../constants";
import { useTypewriter } from "../../hooks/useTypewriter";

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

  return (
    <div className="crt-text my-3 -ml-2 border border-dashed border-[#2D2B40] p-4">
      <div className="text-center text-[#E0DEF4]/80">
        <p className="mb-2 min-h-[1.5rem]">
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
        <pre className="mb-1 text-center text-xs leading-tight text-white">
          {ASCII_ART}
        </pre>

        <div className="flex justify-center gap-2">
          {QUICK_ACTION_LINKS.map((link) => (
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

        <div className="mt-1 flex items-center justify-between text-[9px] text-[#E0DEF4]/50">
          <div className="flex flex-col text-center font-mono">
            <p>
              <span className="opacity-70">Last Updated: </span>
              {new Date(lastCommit.date).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
