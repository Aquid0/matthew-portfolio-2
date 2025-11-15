"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useStore } from "@/app/stores/StoreContext";

import { commands } from "./commands/registry";
import { TerminalLine } from "./types";

export const Terminal = ({ windowId }: { windowId: string }) => {
  const { terminalStore } = useStore();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
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
  };

  useEffect(() => {
    terminalStore.registerTerminal(windowId, executeCommand);
    return () => terminalStore.unregisterTerminal(windowId);
  }, [windowId, terminalStore]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
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
};
