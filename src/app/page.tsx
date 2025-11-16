"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { Desktop } from "@/components/system/Desktop";
import { Taskbar } from "@/components/system/Taskbar";
import { Window } from "@/components/system/Window";
import { Terminal } from "@/components/Terminal";
import { useStore } from "@/stores/StoreContext";

const WINDOW_GAP = 16;

const Home = observer(() => {
  const { windowStore, terminalStore } = useStore();

  // Add initial windows when component mounts
  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - 40; // Subtract taskbar height

    windowStore.addWindow({
      id: "main-terminal",
      appId: "test-1",
      title: "MAIN TERMINAL",
      x: WINDOW_GAP,
      y: WINDOW_GAP,
      width: viewportWidth / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      height: viewportHeight - WINDOW_GAP * 2,
      windowState: "NORMAL",
      isFixed: true,
    });

    windowStore.addWindow({
      id: "quick-actions",
      appId: "test-2",
      title: "QUICK ACTIONS",
      x: viewportWidth / 2 + WINDOW_GAP / 2,
      y: WINDOW_GAP,
      width: viewportWidth / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      height: viewportHeight / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      windowState: "NORMAL",
      isFixed: true,
      initialCommand: "quick_actions",
    });

    windowStore.addWindow({
      id: "sub-terminal",
      appId: "test-3",
      title: "SUB TERMINAL",
      x: viewportWidth / 2 + WINDOW_GAP / 2,
      y: viewportHeight / 2 + WINDOW_GAP / 2,
      width: viewportWidth / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      height: viewportHeight / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      windowState: "NORMAL",
      isFixed: true,
      initialCommand: "help",
    });
  }, [windowStore, terminalStore]);

  return (
    <Desktop>
      {windowStore.windowsWithZIndex.map((windowData) => (
        <Window key={windowData.id} {...windowData}>
          <Terminal
            windowId={windowData.id}
            initialCommand={windowData.initialCommand}
          />
        </Window>
      ))}
      <Taskbar />
    </Desktop>
  );
});

export default Home;
