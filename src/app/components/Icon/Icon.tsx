import type { IconProps } from "./types";

export const Icon = ({
  icon: IconComponent,
  width = 35,
  height = 35,
  color = "white",
}: IconProps) => {
  return (
    <div className="px-2 h-10 hover:bg-zinc-600 transition-colors flex items-center justify-center">
      <IconComponent
        width={width}
        height={height}
        fill="currentColor"
        style={{ color }}
      />
    </div>
  );
};
