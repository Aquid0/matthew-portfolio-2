"use client";

import { observer } from "mobx-react-lite";
import React from "react";

import { useStore } from "@/stores/StoreContext";

export const Desktop = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { windowStore } = useStore();
    console.log("Current viewMode:", windowStore.viewMode);

    return (
      <div className="crt-effect crt-text h-full w-full bg-[url('/desktop.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
        <div
          className={`grid h-[calc(100%-40px)] gap-4 p-4 ${windowStore.viewMode === "projects" ? "grid-cols-1 grid-rows-1" : "grid-cols-2 grid-rows-2"}`}
        >
          {children}
        </div>
      </div>
    );
  },
);
