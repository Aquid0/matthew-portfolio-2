import { useCallback } from "react";

import { TerminalStore } from "@/stores/TerminalStore";
import { WindowStore } from "@/stores/WindowStore";
import { TerminalLine } from "@/types/terminal";
import { highlightKeywords } from "@/utils/";

import { commands } from "../commands/CommandRegistry";

export const useTerminalExecution = (
  windowId: string,
  terminalStore: TerminalStore,
  windowStore: WindowStore,
  setLines: React.Dispatch<React.SetStateAction<TerminalLine[]>>,
  scrollToBottom: () => void,
) => {
  return useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      terminalStore.addToHistory(windowId, trimmed);
      setLines((prev) => [...prev, { type: "input", content: trimmed }]);

      const [command, ...args] = trimmed.split(" ");

      if (command === "full") {
        const currentWindow = windowStore.getWindow(windowId);
        const wasMaximized = currentWindow?.windowState === "MAXIMISED";
        windowStore.toggleMaximizeWindow(windowId);
        if (wasMaximized) {
          const text = "TERMINAL VIEW ENABLED";
          setLines((prev) => [
            ...prev,
            {
              type: "component",
              content: highlightKeywords(text, text, {
                keyword: "TERMINAL VIEW",
                color: "text-[#fc3468]",
              }),
            },
          ]);
        } else {
          const text = `FULLSCREEN ENABLED FOR ${windowId}`;
          setLines((prev) => [
            ...prev,
            {
              type: "component",
              content: highlightKeywords(text, text, [
                { keyword: "FULLSCREEN", color: "text-[#fc3468]" },
                { keyword: windowId, color: "text-[#fc3468]" },
              ]),
            },
          ]);
        }
        return;
      }

      if (command === "clear") {
        setLines([]);
        return;
      }

      if (!commands[command]) {
        setLines((prev) => [
          ...prev,
          { type: "output", content: `Command not found: ${command}` },
        ]);
        return;
      }

      const output = commands[command](args);
      if (output) {
        setLines((prev) => [...prev, { type: "output", content: output }]);
      }
      scrollToBottom();
    },
    [windowId, terminalStore, windowStore, setLines, scrollToBottom],
  );
};
