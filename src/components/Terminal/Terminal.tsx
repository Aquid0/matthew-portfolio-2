"use client";

import {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useStore } from "@/stores/StoreContext";
import { TerminalLine } from "@/types/terminal";

import { commands } from "./commands/CommandRegistry";

export const Terminal = memo(({ windowId }: { windowId: string }) => {
  const { terminalStore } = useStore();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      terminalStore.addToHistory(windowId, trimmed);
      setLines((prev) => [...prev, { type: "input", content: trimmed }]);

      const [command, ...args] = trimmed.split(" ");

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
    },
    [windowId, terminalStore],
  );

  useEffect(() => {
    terminalStore.registerTerminal(windowId, executeCommand);
    return () => terminalStore.unregisterTerminal(windowId);
  }, [windowId, terminalStore, executeCommand]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      const lastCmd = terminalStore.getPreviousCommand(windowId);
      setInput(lastCmd || "");

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.value.length;
          inputRef.current.selectionEnd = inputRef.current.value.length;
        }
      }, 0);
    } else if (e.key === "ArrowDown") {
      const nextCmd = terminalStore.getNextCommand(windowId);
      setInput(nextCmd || "");

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.value.length;
          inputRef.current.selectionEnd = inputRef.current.value.length;
        }
      }, 0);
    }
  };

  const Prompt = () => (
    <>
      <span className="text-[#7C76C7]">guest@matthew-portfolio</span>
      <span className="text-[#E0DEF4]">
        {"\u00A0"}~{"\u00A0"}$
      </span>
    </>
  );

  return (
    <div
      className="absolute inset-0 cursor-default overflow-auto px-2 pt-4 font-mono text-sm text-[#E0DEF4]"
      onClick={() => inputRef.current?.focus()}
      tabIndex={-1}
    >
      {lines.map((line, i) => (
        <div key={i}>
          {line.type === "input" && (
            <>
              <Prompt /> {line.content}
            </>
          )}
          {line.type === "output" && <div className="ml-2">{line.content}</div>}
          {line.type === "component" && line.content}
        </div>
      ))}
      <div className="flex gap-2">
        <span>
          <Prompt />
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#E0DEF4] outline-none"
          autoFocus
        />
      </div>
    </div>
  );
});

Terminal.displayName = "Terminal";
