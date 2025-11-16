"use client";

import {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useStore } from "@/stores/StoreContext";
import { TerminalLine } from "@/types/terminal";
import { moveCursorToEnd } from "@/utils/input";

import { commands } from "./commands/CommandRegistry";

export const Terminal = memo(({ windowId }: { windowId: string }) => {
  const { terminalStore } = useStore();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const focusInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.focus({ preventScroll: true });
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      scrollPositionRef.current = containerRef.current.scrollTop;
    }, 100);
    // TODO: This waits for the new input line to load, and then we scroll to the bottom. There needs
    // to be a better solution here
  };

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
      scrollToBottom();
    },
    [windowId, terminalStore],
  );

  useEffect(() => {
    terminalStore.registerTerminal(windowId, executeCommand);
    return () => terminalStore.unregisterTerminal(windowId);
  }, [windowId, terminalStore, executeCommand]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPositionRef.current;
    }
  });

  const handleScroll = () => {
    if (!containerRef.current) return;
    scrollPositionRef.current = containerRef.current.scrollTop;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
      ref={containerRef}
      className="absolute inset-0 cursor-default overflow-auto px-2 pt-4 font-mono text-sm text-[#E0DEF4]"
      onScroll={handleScroll}
      onClick={focusInput}
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
          className="flex-1 cursor-default bg-transparent text-[#E0DEF4] outline-none"
        />
      </div>
    </div>
  );
});

Terminal.displayName = "Terminal";
