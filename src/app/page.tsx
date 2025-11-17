"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { Desktop } from "@/components/system/Desktop";
import { Taskbar } from "@/components/system/Taskbar";
import { Window } from "@/components/system/Window";
import { Terminal } from "@/components/Terminal";
import { useStore } from "@/stores/StoreContext";

const Home = observer(() => {
  const { windowStore } = useStore();

  useEffect(() => {
    windowStore.addWindow({
      id: "main-terminal",
      appId: "test-1",
      title: "MAIN TERMINAL",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      windowState: "NORMAL",
      isFixed: true,
    });

    windowStore.addWindow({
      id: "quick-actions",
      appId: "test-2",
      title: "QUICK ACTIONS",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      windowState: "NORMAL",
      isFixed: true,
      initialCommand: "quick_actions",
    });

    windowStore.addWindow({
      id: "sub-terminal",
      appId: "test-3",
      title: "SUB TERMINAL",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      windowState: "NORMAL",
      isFixed: true,
      initialCommand: "help",
    });
  }, [windowStore]);

  const mainTerminal = windowStore.getWindow("main-terminal");
  const quickActions = windowStore.getWindow("quick-actions");
  const subTerminal = windowStore.getWindow("sub-terminal");

  return (
    <Desktop>
      {mainTerminal && (
        <div
          className={`${!windowStore.fullscreenWindowId ? "row-span-2" : ""} ${windowStore.fullscreenWindowId && windowStore.fullscreenWindowId !== "main-terminal" ? "hidden" : ""}`}
        >
          <Window {...mainTerminal}>
            <Terminal
              windowId={mainTerminal.id}
              initialCommand={mainTerminal.initialCommand}
            />
          </Window>
        </div>
      )}
      {quickActions && (
        <div
          className={
            windowStore.fullscreenWindowId &&
            windowStore.fullscreenWindowId !== "quick-actions"
              ? "hidden"
              : ""
          }
        >
          <Window {...quickActions}>
            <Terminal
              windowId={quickActions.id}
              initialCommand={quickActions.initialCommand}
            />
          </Window>
        </div>
      )}
      {subTerminal && (
        <div
          className={
            windowStore.fullscreenWindowId &&
            windowStore.fullscreenWindowId !== "sub-terminal"
              ? "hidden"
              : ""
          }
        >
          <Window {...subTerminal}>
            <Terminal
              windowId={subTerminal.id}
              initialCommand={subTerminal.initialCommand}
            />
          </Window>
        </div>
      )}
      <Taskbar />
    </Desktop>
  );
});

export default Home;
