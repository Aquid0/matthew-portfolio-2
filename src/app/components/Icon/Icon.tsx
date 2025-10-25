import type { IconProps } from "./types";

export const Icon = ({
  icon: IconComponent,
  width = 35,
  height = 35,
  color = "white",
}: IconProps) => {
  return (
    <div className="flex h-10 items-center justify-center px-2 transition-colors hover:bg-zinc-600">
      <IconComponent
        width={width}
        height={height}
        fill="currentColor"
        style={{ color }}
      />
    </div>
  );
};
