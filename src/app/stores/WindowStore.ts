import { action, computed, makeObservable, observable } from "mobx";

import type { WindowData } from "../system/Window/types";
import { AppRegistry } from "./constants/AppRegistry";
import type { AppId } from "./types";

export class WindowStore {
  availableApps: WindowData[] = [];
  taskbarApps: AppId[] = [];
  private readonly MAX_Z_INDEX = 1000;

  constructor() {
    makeObservable(this, {
      availableApps: observable,
      taskbarApps: observable,
      taskbarItems: computed,
      addWindow: action,
      removeWindow: action,
      minimizeWindow: action,
      toggleMaximizeWindow: action,
      updateWindowBounds: action,
      focusWindow: action,
      windowsWithZIndex: computed,
    });
  }

  get windowsWithZIndex() {
    return this.availableApps
      .filter((w) => w.windowState !== "MINIMISED")
      .map((window, index) => ({
        ...window,
        zIndex: this.MAX_Z_INDEX - index,
        isFocused: index === 0,
      }));
  }

  get taskbarItems() {
    const runningAppIds = Array.from(
      new Set(this.availableApps.map((w) => w.appId)),
    );

    return AppRegistry.apps.map((app) => ({
      app,
      isRunning: runningAppIds.includes(app.id),
      availableWindows: this.availableApps.filter((w) => w.appId === app.id),
      isFocused: this.availableApps[0]?.appId === app.id,
    }));
  }

  addWindow(window: WindowData) {
    this.availableApps = [window, ...this.availableApps];
  }

  removeWindow(id: string) {
    this.availableApps = this.availableApps.filter((w) => w.id !== id);
  }

  minimizeWindow(id: string) {
    this.availableApps = this.availableApps.map((w) =>
      w.id === id ? { ...w, windowState: "MINIMISED" } : w,
    );
  }
  toggleMaximizeWindow(id: string) {
    this.availableApps = this.availableApps.map((w) => {
      if (w.id !== id) return w;
      const newState = w.windowState === "MAXIMISED" ? "NORMAL" : "MAXIMISED";
      return { ...w, windowState: newState };
    });
  }

  updateWindowBounds(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.availableApps = this.availableApps.map((w) =>
      w.id === id ? { ...w, x, y, width, height } : w,
    );
  }

  focusWindow(id: string) {
    const windowIndex = this.availableApps.findIndex((w) => w.id === id);
    if (windowIndex === -1) return;

    const [focusedWindow] = this.availableApps.splice(windowIndex, 1);
    this.availableApps = [focusedWindow, ...this.availableApps];

    if (focusedWindow.windowState === "MINIMISED") {
      focusedWindow.windowState = "NORMAL";
    }
  }

  getWindow(id: string) {
    return this.availableApps.find((w) => w.id === id);
  }
}
