import type { ComponentType, SVGProps } from "react";

import type { WindowData } from "@/app/system/Window/types";

export type IconProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
  color?: string;
  windows?: WindowData[];
  isFocused?: boolean;
  isRunning?: boolean;
  onClick?: (windowId: string) => void;
};
