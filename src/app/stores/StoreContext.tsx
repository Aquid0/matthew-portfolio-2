"use client";

import { createContext, useContext, useState } from "react";

import { WindowStore } from "./WindowStore";

class RootStore {
  windowStore: WindowStore;

  constructor() {
    this.windowStore = new WindowStore();
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
