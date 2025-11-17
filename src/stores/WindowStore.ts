import { action, computed, makeObservable, observable } from "mobx";

import { AppRegistry } from "@/constants/AppRegistry";
import type { AppId } from "@/types/store";
import type { WindowData } from "@/types/window";

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
      maximizedWindowId: computed,
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
    this.availableApps.unshift(window);
  }

  removeWindow(id: string) {
    const index = this.availableApps.findIndex((w) => w.id === id);
    if (index !== -1) this.availableApps.splice(index, 1);
  }

  get maximizedWindowId() {
    const maximized = this.availableApps.find(
      (w) => w.windowState === "MAXIMISED",
    );
    return maximized?.id || null;
  }

  minimizeWindow(id: string) {
    const window = this.availableApps.find((w) => w.id === id);
    if (window) window.windowState = "MINIMISED";
  }

  toggleMaximizeWindow(id: string) {
    const windowIndex = this.availableApps.findIndex((w) => w.id === id);
    if (windowIndex === -1) return;

    const window = this.availableApps[windowIndex];

    if (window.windowState === "MAXIMISED") {
      this.availableApps[windowIndex] = { ...window, windowState: "NORMAL" };
      this.availableApps = this.availableApps.map((w) =>
        w.id !== id && w.windowState === "MINIMISED"
          ? { ...w, windowState: "NORMAL" }
          : w,
      );
    } else {
      this.availableApps[windowIndex] = { ...window, windowState: "MAXIMISED" };
      this.availableApps = this.availableApps.map((w) =>
        w.id !== id && w.windowState === "NORMAL"
          ? { ...w, windowState: "MINIMISED" }
          : w,
      );
    }
  }

  updateWindowBounds(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    const window = this.availableApps.find((w) => w.id === id);
    if (window) {
      window.x = x;
      window.y = y;
      window.width = width;
      window.height = height;
    }
  }

  focusWindow(id: string) {
    const windowIndex = this.availableApps.findIndex((w) => w.id === id);
    if (windowIndex === -1) return;

    const [focusedWindow] = this.availableApps.splice(windowIndex, 1);
    this.availableApps.unshift(focusedWindow);

    if (focusedWindow.windowState === "MINIMISED") {
      focusedWindow.windowState = "NORMAL";
    }
  }

  getWindow(id: string) {
    return this.availableApps.find((w) => w.id === id);
  }
}
