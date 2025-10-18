"use client";

import { Desktop } from "@/app/system/Desktop";
import { Taskbar } from "@/app/system/Taskbar";
import { Window } from "@/app/system/Window";

const Home = () => {
  return (
    <Desktop>
      <Window title="test window" x={0} y={0} width={320} height={200}>
        <h1 className="text-black">Hello World</h1>
      </Window>
      <Taskbar />
    </Desktop>
  );
};

export default Home;
