import type { ComponentType, SVGProps } from "react";

import type { WindowData } from "@/types/window";

export type IconVariant = "taskbar" | "window";

export type IconProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  variant?: IconVariant;
  width?: number;
  height?: number;
  color?: string;
  windows?: WindowData[];
  isFocused?: boolean;
  isRunning?: boolean;
  onClick?: (windowId: string) => void;
};
