import { makeAutoObservable } from "mobx";

import type { WindowData } from "../system/Window/types";

export class WindowStore {
  windows: WindowData[] = [];
  private readonly MAX_Z_INDEX = 1000;

  constructor() {
    makeAutoObservable(this);
  }

  addWindow(window: WindowData) {
    // Add new window at the front (index 0 = highest z-index)
    this.windows = [window, ...this.windows];
    this.recalculateZIndices();
  }

  removeWindow(id: string) {
    this.windows = this.windows.filter((w) => w.id !== id);
    this.recalculateZIndices();
  }

  minimizeWindow(id: string) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, isMinimized: true } : w
    );
  }

  maximizeWindow(id: string) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, isMaximized: true } : w
    );
  }

  focusWindow(id: string) {
    // Find the window and move it to the front
    const windowIndex = this.windows.findIndex((w) => w.id === id);
    if (windowIndex === -1) return;

    // Remove window from current position and add to front
    const [focusedWindow] = this.windows.splice(windowIndex, 1);
    this.windows = [focusedWindow, ...this.windows];

    this.recalculateZIndices();
  }

  private recalculateZIndices() {
    // Index 0 gets highest z-index (MAX_Z_INDEX)
    // Index 1 gets MAX_Z_INDEX - 1, etc.
    this.windows = this.windows.map((window, index) => ({
      ...window,
      zIndex: this.MAX_Z_INDEX - index,
    }));
  }
}
