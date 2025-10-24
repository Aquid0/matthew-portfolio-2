import { computed, makeObservable, observable, action } from "mobx";

import type { WindowData } from "../system/Window/types";

export class WindowStore {
  windows: WindowData[] = [];
  private readonly MAX_Z_INDEX = 1000;

  constructor() {
    makeObservable(this, {
      windows: observable,
      addWindow: action,
      removeWindow: action,
      minimizeWindow: action,
      maximizeWindow: action,
      focusWindow: action,
      windowsWithZIndex: computed,
    });
  }

  get windowsWithZIndex() {
    return this.windows.map((window, index) => ({
      ...window,
      zIndex: this.MAX_Z_INDEX - index,
    }));
  }

  addWindow(window: WindowData) {
    this.windows = [window, ...this.windows];
  }

  removeWindow(id: string) {
    this.windows = this.windows.filter((w) => w.id !== id);
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
    const windowIndex = this.windows.findIndex((w) => w.id === id);
    if (windowIndex === -1) return;

    const [focusedWindow] = this.windows.splice(windowIndex, 1);
    this.windows = [focusedWindow, ...this.windows];
  }
}
