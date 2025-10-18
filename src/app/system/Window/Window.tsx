import { Minus, Maximize2, X } from "lucide-react";
import { Rnd } from "react-rnd";

import type { WindowProps } from "./types";

export const Window = ({
  children,
  title,
  x,
  y,
  width,
  height,
}: WindowProps) => {
  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width: width,
        height: height,
      }}
      className="w-1/2 h-1/2 bg-white shadow-md"
    >
      <div className="w-full h-8 bg-zinc-800 flex items-center justify-between">
        <div className="text-sm h-full px-2 bg-zinc-900 font-bold flex items-center rounded-t-2xl">
          {title}
        </div>
        <div className="flex items-center gap-3">
          <button className="w-6 h-6 bg-zinc-800">
            <Minus />
          </button>
          <button className="w-6 h-6 bg-zinc-800">
            <Maximize2 />
          </button>
          <button className="w-6 h-6 bg-zinc-800">
            <X />
          </button>
        </div>
      </div>
      {children}
    </Rnd>
  );
};
