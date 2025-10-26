import { useState } from "react";

import type { IconProps } from "./types";

export const Icon = ({
  icon: IconComponent,
  width = 35,
  height = 35,
  color = "white",
  isFocused = false,
  isRunning = false,
  onClick,
  windows = [],
}: IconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isViewingPreview = isHovered && windows.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex h-10 items-center justify-center px-2 transition-colors duration-100 hover:bg-zinc-600 ${isFocused || isViewingPreview ? "bg-zinc-600" : ""}`}
      >
        <IconComponent
          width={width}
          height={height}
          fill="currentColor"
          style={{ color }}
        />
        {isRunning && (
          <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-zinc-100" />
        )}
      </div>

      {/* Preview window list */}
      {isHovered && windows.length > 0 && (
        <div className="absolute bottom-10 left-0 z-50 flex w-48 flex-col gap-1 rounded bg-zinc-700 p-2 shadow-lg">
          {windows.map((window) => (
            <div
              key={window.id}
              className="cursor-pointer truncate rounded bg-zinc-600 px-3 py-2 text-sm text-white hover:bg-zinc-500"
              onClick={() => onClick?.(window.id)}
            >
              {window.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
