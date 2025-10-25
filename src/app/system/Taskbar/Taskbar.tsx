import StartIcon from "@public/start.svg";
import React from "react";

import { Icon } from "@/app/components/Icon/Icon";

export const Taskbar = () => {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 h-10 bg-zinc-800 flex items-center px-">
      {/* Start Icon */}
      <Icon icon={StartIcon} />

      {/* Taskbar Icons */}

      {/* Right Side Icons */}
    </div>
  );
};
