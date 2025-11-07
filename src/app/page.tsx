"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useStore } from "@/app/stores/StoreContext";
import { Desktop } from "@/app/system/Desktop";
import { Taskbar } from "@/app/system/Taskbar";
import { Window } from "@/app/system/Window";

const Home = observer(() => {
  const { windowStore } = useStore();

  // Add initial windows when component mounts
  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - 40; // Subtract taskbar height
    const gap = 8; // Buffer between windows

    windowStore.addWindow({
      id: "test-window-1",
      appId: "test-1",
      title: "Test Window 1",
      x: gap,
      y: gap,
      width: viewportWidth / 2 - gap - gap / 2,
      height: viewportHeight - gap * 2,
      windowState: "NORMAL",
    });

    windowStore.addWindow({
      id: "test-window-2",
      appId: "test-2",
      title: "Test Window 2",
      x: viewportWidth / 2 + gap / 2,
      y: gap,
      width: viewportWidth / 2 - gap - gap / 2,
      height: viewportHeight / 2 - gap - gap / 2,
      windowState: "NORMAL",
    });

    windowStore.addWindow({
      id: "test-window-3",
      appId: "test-3",
      title: "Test Window 3",
      x: viewportWidth / 2 + gap / 2,
      y: viewportHeight / 2 + gap / 2,
      width: viewportWidth / 2 - gap - gap / 2,
      height: viewportHeight / 2 - gap - gap / 2,
      windowState: "NORMAL",
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
