import { Maximize2, Minus, X } from "lucide-react";

import type { TitleBarProps } from "./types";

export const TitleBar = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  variant,
}: TitleBarProps) => {
  if (variant === "minimal") {
    return (
      <div className="crt-title absolute -top-3 left-2 cursor-default border border-[#65384B] bg-[#110E1D] px-3 py-1 text-xs font-bold text-[#7C76C7] select-none">
        {title}
      </div>
    );
  } else {
    return (
      <div className="window-drag-handle flex h-8 w-full items-center justify-between bg-zinc-800">
        <div className="crt-title flex h-full cursor-default items-center rounded-t-xl bg-zinc-900 px-2 text-sm font-bold text-[#7C76C7] select-none">
          {title}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="h-6 w-6 bg-zinc-800 transition-colors hover:bg-yellow-600"
            onClick={onMinimize}
          >
            <Minus />
          </button>
          <button
            className="h-6 w-6 bg-zinc-800 transition-colors hover:bg-green-600"
            onClick={onMaximize}
          >
            <Maximize2 />
          </button>
          <button
            className="h-6 w-6 bg-zinc-800 transition-colors hover:bg-red-600"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
      </div>
    );
  }
};
