"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import { useStore } from "@/stores/StoreContext";
import { TerminalLine as TerminalLineType } from "@/types/terminal";

import { Prompt } from "./components/Prompt";
import { TerminalLine } from "./components/TerminalLine";
import { useTerminalExecution } from "./hooks/useTerminalExecution";
import { useTerminalInput } from "./hooks/useTerminalInput";
import { useTerminalScroll } from "./hooks/useTerminalScroll";
import { TerminalProps } from "./types";

export const Terminal = memo(({ windowId, initialCommand }: TerminalProps) => {
  const { terminalStore, windowStore } = useStore();

  const [lines, setLines] = useState<TerminalLineType[]>([]);
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const hasRunInitialCommand = useRef(false);

  const { containerRef, scrollToBottom, handleScroll } = useTerminalScroll();

  const executeCommand = useTerminalExecution(
    windowId,
    terminalStore,
    windowStore,
    setLines,
    scrollToBottom,
  );

  const handleKeyDown = useTerminalInput(
    windowId,
    terminalStore,
    input,
    setInput,
    executeCommand,
    inputRef,
  );

  const focusInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    terminalStore.registerTerminal(windowId, executeCommand);
    if (initialCommand && !hasRunInitialCommand.current) {
      hasRunInitialCommand.current = true;
      executeCommand(initialCommand);
    }
  }, [windowId, terminalStore, executeCommand, initialCommand]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  return (
    <div
      ref={containerRef}
      className="scrollbar-hide absolute inset-0 cursor-default overflow-auto px-2 pt-4 font-mono text-sm text-[#E0DEF4]"
      onScroll={handleScroll}
      onClick={focusInput}
      tabIndex={-1}
    >
      {lines.map((line, i) => (
        <div key={i}>
          <TerminalLine line={line} />
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
