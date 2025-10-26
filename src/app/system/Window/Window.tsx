"use client";

import { observer } from "mobx-react-lite";
import { Rnd } from "react-rnd";

import { useStore } from "@/app/stores/StoreContext";

import { TitleBar } from "./components/TitleBar";
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
        className="h-1/2 w-1/2 bg-white shadow-md"
        data-window-id={id}
        style={{ zIndex: zIndex }}
        onMouseDown={handleFocus}
        dragHandleClassName="window-drag-handle"
      >
        <TitleBar
          title={title}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
        {children}
      </Rnd>
    );
  },
);
