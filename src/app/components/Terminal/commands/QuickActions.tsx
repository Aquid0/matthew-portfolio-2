import { useEffect, useState } from "react";

import { useStore } from "@/app/stores/StoreContext";

import { asciiArt } from "./ascii-art";

export const QuickActions = () => {
  const { terminalStore } = useStore();
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Matthew | Front End Engineer Intern @ Amazon";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);
  const links = [
    { label: "About", command: "about" },
    { label: "Projects", command: "projects" },
    { label: "Skills", command: "skills" },
    { label: "Contact", command: "contact" },
  ];

  return (
    <div className="my-3 -ml-2 border border-dashed border-[#2D2B40] p-4">
      <p className="text-center text-[#E0DEF4]">
        {(() => {
          const amazonIndex = fullText.indexOf("Amazon");
          const beforeAmazon = displayedText.slice(0, amazonIndex);
          const amazonPart = displayedText.slice(amazonIndex, amazonIndex + 6);
          const afterAmazon = displayedText.slice(amazonIndex + 6);

          return (
            <>
              {beforeAmazon}
              {amazonPart && (
                <span className="text-[#FF9900]">{amazonPart}</span>
              )}
              {afterAmazon}
              <span className="caret-blink"> ▋</span>
            </>
          );
        })()}
      </p>

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
