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
    windowStore.addWindow({
      id: "test-window-1",
      title: "Test Window 1",
      x: 100,
      y: 100,
      width: 320,
      height: 200,
    });

    windowStore.addWindow({
      id: "test-window-2",
      title: "Test Window 2",
      x: 200,
      y: 150,
      width: 320,
      height: 200,
    });

    windowStore.addWindow({
      id: "test-window-3",
      title: "Test Window 3",
      x: 300,
      y: 200,
      width: 320,
      height: 200,
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
