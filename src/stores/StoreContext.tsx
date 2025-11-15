"use client";

import { createContext, useContext, useState } from "react";

import { TerminalStore } from "./TerminalStore";
import { WindowStore } from "./WindowStore";

class RootStore {
  windowStore: WindowStore;
  terminalStore: TerminalStore;

  constructor() {
    this.windowStore = new WindowStore();
    this.terminalStore = new TerminalStore();
  }
}
const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => new RootStore());

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
