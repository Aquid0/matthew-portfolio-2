import { useStore } from "@/app/stores/StoreContext";

import { asciiArt } from "./ascii-art";
import { useTypewriter } from "./hooks/useTypewriter";
import { highlightKeyword } from "./utils/highlightKeyword";

export const QuickActions = () => {
  const { terminalStore } = useStore();
  const introText = "Matthew | Front End Engineer Intern @ Amazon";
  const summary = "Building high impact, large-scale applications with React";

  const displayedText = useTypewriter(introText);
  const displayedText2 = useTypewriter(summary, 35, introText.length * 35);
  const links = [
    { label: "About", command: "about" },
    { label: "Projects", command: "projects" },
    { label: "Skills", command: "skills" },
    { label: "Contact", command: "contact" },
  ];

  return (
    <div className="my-3 -ml-2 border border-dashed border-[#2D2B40] p-4">
      <div className="text-center text-[#E0DEF4]/80">
        <p>
          {highlightKeyword(
            displayedText,
            introText,
            "Amazon",
            "text-[#FF9900]",
          )}
        </p>
        <p className="text-sm">
          {highlightKeyword(displayedText2, summary, "React", "text-[#61DBFB]")}
          {displayedText.length >= introText.length && (
            <span className="caret-blink text-lg">▋</span>
          )}
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
