import StartIcon from "@public/start.svg";
import React from "react";

import { Icon } from "@/app/components/Icon";

export const Taskbar = () => {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 h-10 bg-zinc-800 flex items-center">
      {/* Start Icon */}
      <Icon icon={StartIcon} />

      {/* App Icons */}
      <div className="flex flex-1">{/* App icons will go here */}</div>

      {/* Date/Time */}
      <div className="px-2 h-10 flex gap-1 flex-col items-center justify-center text-white text-xs hover:bg-zinc-600 transition-colors">
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
