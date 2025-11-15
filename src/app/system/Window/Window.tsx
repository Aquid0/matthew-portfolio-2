"use client";

import { observer } from "mobx-react-lite";
import { Rnd } from "react-rnd";

import { useStore } from "@/app/stores/StoreContext";

import { TitleBar } from "./components/TitleBar";
import type { WindowProps } from "./types";

export const Window = observer(
  ({
    children,
    title,
    x,
    y,
    width,
    height,
    id,
    zIndex,
    isFixed = false,
    showTitlebar = true,
  }: WindowProps) => {
    const { windowStore } = useStore();

    const handleClose = () => {
      windowStore.removeWindow(id);
    };

    const handleMinimize = () => {
      windowStore.minimizeWindow(id);
    };

    const handleToggleMaximize = () => {
      windowStore.toggleMaximizeWindow(id);
    };

    const handleFocus = () => {
      windowStore.focusWindow(id);
    };

    switch (windowStore.getWindow(id)?.windowState) {
      case "MINIMISED":
        return null;
      case "MAXIMISED":
        return (
          <div
            className="absolute bg-white shadow-md"
            data-window-id={id}
            style={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "calc(100vh - 40px)",
              zIndex: zIndex,
            }}
            onMouseDown={handleFocus}
          >
            <div data-window-content={id}>
              <TitleBar
                title={title}
                onClose={handleClose}
                onMinimize={handleMinimize}
                onMaximize={handleToggleMaximize}
              />
              {children}
            </div>
          </div>
        );
      default:
        break;
    }

    return (
      <Rnd
        position={{ x, y }}
        size={{ width, height }}
        onDragStop={(e, d) => {
          windowStore.updateWindowBounds(id, d.x, d.y, width, height);
        }}
        disableDragging={isFixed}
        onResizeStop={(e, direction, ref, delta, position) => {
          windowStore.updateWindowBounds(
            id,
            position.x,
            position.y,
            parseInt(ref.style.width),
            parseInt(ref.style.height),
          );
        }}
        minWidth={320}
        minHeight={200}
        bounds="window"
        className="h-1/2 w-1/2 bg-white shadow-md"
        data-window-id={id}
        style={{ zIndex: zIndex }}
        onMouseDown={handleFocus}
        dragHandleClassName="window-drag-handle"
        resizeHandleStyles={{
          top: { cursor: "ns-resize" },
          right: { cursor: "ew-resize" },
          bottom: { cursor: "ns-resize" },
          left: { cursor: "ew-resize" },
          topRight: { cursor: "nesw-resize" },
          bottomRight: { cursor: "nwse-resize" },
          bottomLeft: { cursor: "nesw-resize" },
          topLeft: { cursor: "nwse-resize" },
        }}
      >
        <div data-window-content={id}>
          {showTitlebar && (
            <TitleBar
              title={title}
              onClose={handleClose}
              onMinimize={handleMinimize}
              onMaximize={handleToggleMaximize}
            />
          )}
          {children}
        </div>
      </Rnd>
    );
  },
);
