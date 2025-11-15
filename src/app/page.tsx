"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";

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
      title: "Test Window 1",
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
      title: "Test Window 2",
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
      title: "Test Window 3",
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
      {/* Render windows from the store */}
      {windowStore.windowsWithZIndex.map((windowData) => (
        <Window key={windowData.id} {...windowData}>
          <h1 className="text-black">Hello from {windowData.title}</h1>
        </Window>
      ))}
      <Taskbar />
    </Desktop>
  );
});

export default Home;
