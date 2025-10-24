"use client";

import { Minus, Maximize2, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Rnd } from "react-rnd";

import { useStore } from "@/app/stores/StoreContext";

import type { WindowProps } from "./types";

export const Window = observer(
  ({ children, title, x, y, width, height, id, zIndex }: WindowProps) => {
    const { windowStore } = useStore();

    const handleClose = () => {
      windowStore.removeWindow(id);
    };

    const handleMinimize = () => {
      windowStore.minimizeWindow(id);
    };

    const handleMaximize = () => {
      windowStore.maximizeWindow(id);
    };

    const handleFocus = () => {
      windowStore.focusWindow(id);
    };

    return (
      <Rnd
        default={{
          x: x,
          y: y,
          width: width,
          height: height,
        }}
        className="w-1/2 h-1/2 bg-white shadow-md"
        data-window-id={id}
        style={{ zIndex: zIndex }}
        onMouseDown={handleFocus}
        dragHandleClassName="window-drag-handle"
      >
        <div className="w-full h-8 bg-zinc-800 flex items-center justify-between window-drag-handle">
          <div className="text-sm h-full px-2 bg-zinc-900 font-bold flex items-center rounded-t-xl">
            {title}
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-6 h-6 bg-zinc-800 hover:bg-yellow-600 transition-colors"
              onClick={handleMinimize}
            >
              <Minus />
            </button>
            <button
              className="w-6 h-6 bg-zinc-800 hover:bg-green-600 transition-colors"
              onClick={handleMaximize}
            >
              <Maximize2 />
            </button>
            <button
              className="w-6 h-6 bg-zinc-800 hover:bg-red-600 transition-colors"
              onClick={handleClose}
            >
              <X />
            </button>
          </div>
        </div>
        {children}
      </Rnd>
    );
  }
);
