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
      initialCommand: "quick_actions",
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

    // Set initial view as maximised main terminal

    windowStore.toggleMaximizeWindow("main-terminal");
  }, [windowStore]);

  const mainTerminal = windowStore.getWindow("main-terminal");
  const quickActions = windowStore.getWindow("quick-actions");
  const subTerminal = windowStore.getWindow("sub-terminal");

  return (
    <Desktop>
      {mainTerminal && (
        <div
          className={`${!windowStore.maximizedWindowId ? "row-span-2" : ""} ${mainTerminal.windowState === "MINIMISED" ? "hidden" : ""}`}
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
          className={quickActions.windowState === "MINIMISED" ? "hidden" : ""}
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
          className={subTerminal.windowState === "MINIMISED" ? "hidden" : ""}
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
