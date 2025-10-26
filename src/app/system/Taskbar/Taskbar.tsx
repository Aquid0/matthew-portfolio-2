"use client";

import StartIcon from "@public/start.svg";

import React, { useEffect, useState } from "react";

import { Icon } from "@/app/components/Icon";

export const Taskbar = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex h-10 w-full items-center bg-zinc-800">
      {/* Start Icon */}
      <Icon icon={StartIcon} />

      {/* App Icons */}
      <div className="flex flex-1">{/* App icons will go here */}</div>

      {/* Date/Time */}
      <div className="flex h-10 cursor-default flex-col items-center justify-center gap-1 px-2 text-xs text-white transition-colors hover:bg-zinc-600">
        <span className="select-none">
          {time?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="select-none">
          {time?.toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};
