"use client";

import { KeyboardEvent, useRef, useState } from "react";

export const Terminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLines((prev) => [...prev, `$ ${input}`, `Command: ${input}`, ""]);
      setInput("");
    }
  };

  return (
    <div
      className="h-full w-full overflow-auto px-2 pt-4 font-mono text-sm text-[#E0DEF4]"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i}>{line || "\u00A0"}</div>
      ))}
      <div className="flex">
        <span>$ </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};
