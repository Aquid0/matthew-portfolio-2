import { Maximize2, Minus, X } from "lucide-react";

import type { TitleBarProps } from "./types";

export const TitleBar = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
}: TitleBarProps) => {
  return (
    <div className="w-full h-8 bg-zinc-800 flex items-center justify-between window-drag-handle">
      <div className="text-sm h-full px-2 bg-zinc-900 font-bold flex items-center rounded-t-xl">
        {title}
      </div>
      <div className="flex items-center gap-3">
        <button
          className="w-6 h-6 bg-zinc-800 hover:bg-yellow-600 transition-colors"
          onClick={onMinimize}
        >
          <Minus />
        </button>
        <button
          className="w-6 h-6 bg-zinc-800 hover:bg-green-600 transition-colors"
          onClick={onMaximize}
        >
          <Maximize2 />
        </button>
        <button
          className="w-6 h-6 bg-zinc-800 hover:bg-red-600 transition-colors"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
    </div>
  );
};
