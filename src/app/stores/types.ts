import { FC, SVGProps } from "react";

export type AppId = "test-1" | "test-2" | "test-3";

export type App = {
  id: AppId;
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  defaultWidth: number;
  defaultHeight: number;
};

export type AppRegistryProps = {
  apps: App[];
};
