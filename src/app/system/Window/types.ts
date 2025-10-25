import type { AppId } from "@/app/stores/types";

export type WindowData = {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  isMaximized?: boolean;
  zIndex?: number;
};

export type WindowProps = WindowData & {
  children: React.ReactNode;
  onClose?: (id: string) => void;
};
