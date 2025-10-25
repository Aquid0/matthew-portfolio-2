import React from "react";

import { Icon } from "@/app/components/Icon";
import StartIcon from "@public/start.svg";

export const Taskbar = () => {
  return (
    <div className="fixed right-0 bottom-0 left-0 flex h-10 w-full items-center bg-zinc-800">
      {/* Start Icon */}
      <Icon icon={StartIcon} />

      {/* App Icons */}
      <div className="flex flex-1">{/* App icons will go here */}</div>

      {/* Date/Time */}
      <div className="flex h-10 flex-col items-center justify-center gap-1 px-2 text-xs text-white transition-colors hover:bg-zinc-600">
        <span>
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span>
          {new Date().toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};
