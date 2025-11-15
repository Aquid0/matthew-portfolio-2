"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { Terminal } from "@/app/components/Terminal";
import { useStore } from "@/app/stores/StoreContext";
import { Desktop } from "@/app/system/Desktop";
import { Taskbar } from "@/app/system/Taskbar";
import { Window } from "@/app/system/Window";

const WINDOW_GAP = 16;

const Home = observer(() => {
  const { windowStore } = useStore();

  // Add initial windows when component mounts
  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - 40; // Subtract taskbar height

    windowStore.addWindow({
      id: "test-window-1",
      appId: "test-1",
      title: "Main Terminal",
      x: WINDOW_GAP,
      y: WINDOW_GAP,
      width: viewportWidth / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      height: viewportHeight - WINDOW_GAP * 2,
      windowState: "NORMAL",
      isFixed: true,
    });

    windowStore.addWindow({
      id: "test-window-2",
      appId: "test-2",
      title: "Quick Actions",
      x: viewportWidth / 2 + WINDOW_GAP / 2,
      y: WINDOW_GAP,
      width: viewportWidth / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      height: viewportHeight / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      windowState: "NORMAL",
      isFixed: true,
    });

    windowStore.addWindow({
      id: "test-window-3",
      appId: "test-3",
      title: "Sub Terminal",
      x: viewportWidth / 2 + WINDOW_GAP / 2,
      y: viewportHeight / 2 + WINDOW_GAP / 2,
      width: viewportWidth / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      height: viewportHeight / 2 - WINDOW_GAP - WINDOW_GAP / 2,
      windowState: "NORMAL",
      isFixed: true,
    });
  }, [windowStore]);

  return (
    <Desktop>
      {windowStore.windowsWithZIndex.map((windowData) => (
        <Window key={windowData.id} {...windowData}>
          <Terminal />
        </Window>
      ))}
      <Taskbar />
    </Desktop>
  );
});

export default Home;
