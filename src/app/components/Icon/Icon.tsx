import { useState } from "react";

import type { IconProps } from "./types";

export const Icon = ({
  icon: IconComponent,
  width = 35,
  height = 35,
  variant = "taskbar",
  color = "white",
  isFocused = false,
  isRunning = false,
  onClick,
  windows = [],
}: IconProps) => {
  const [showPreviewList, setShowPreviewList] = useState(false);
  const shouldShowPreview =
    variant === "taskbar" && showPreviewList && windows.length > 0;

  const handleWindowSelect = (windowId: string) => {
    onClick?.(windowId);
    setShowPreviewList(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPreviewList(true)}
      onMouseLeave={() => setShowPreviewList(false)}
    >
      <div
        className={`flex h-10 items-center justify-center px-2 transition-colors duration-100 hover:bg-zinc-600 ${isFocused || shouldShowPreview ? "bg-zinc-600" : ""}`}
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
      {shouldShowPreview && (
        <div className="absolute bottom-10 left-0 z-50 flex w-48 flex-col gap-1 rounded bg-zinc-700 p-2 shadow-lg">
          {windows.map((window) => (
            <div
              key={window.id}
              className="cursor-pointer truncate rounded bg-zinc-600 px-3 py-2 text-sm text-white hover:bg-zinc-500"
              onClick={() => handleWindowSelect(window.id)}
            >
              {window.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
