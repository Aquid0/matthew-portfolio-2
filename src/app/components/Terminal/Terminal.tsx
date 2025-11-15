"use client";

import { KeyboardEvent, useRef, useState } from "react";

export const Terminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLines((prev) => [...prev, input]);
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
          <Prompt /> {line}
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
