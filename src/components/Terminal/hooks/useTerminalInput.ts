import { KeyboardEvent } from "react";

import { TerminalStore } from "@/stores/TerminalStore";
import { moveCursorToEnd } from "@/utils/input";

export const useTerminalInput = (
  windowId: string,
  terminalStore: TerminalStore,
  input: string,
  setInput: (value: string) => void,
  executeCommand: (cmd: string) => void,
  inputRef: React.RefObject<HTMLInputElement>,
) => {
  return (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        executeCommand(input);
        setInput("");
        break;
      case "ArrowUp":
        const lastCmd = terminalStore.getPreviousCommand(windowId);
        setInput(lastCmd || "");
        moveCursorToEnd(inputRef.current);
        break;
      case "ArrowDown":
        const nextCmd = terminalStore.getNextCommand(windowId);
        setInput(nextCmd || "");
        moveCursorToEnd(inputRef.current);
        break;
      default:
        return;
    }
  };
};
