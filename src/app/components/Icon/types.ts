import type { ComponentType, SVGProps } from "react";

export type IconProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
  color?: string;
};
