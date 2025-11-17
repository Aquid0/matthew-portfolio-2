import type { AppId } from "@/types/store";

export type WindowState = "MINIMISED" | "MAXIMISED" | "NORMAL";

export type variant = "minimal" | "full";

export type WindowData = {
  id: string;
  appId: AppId;
  title: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  windowState: WindowState;
  zIndex?: number;
  prevX?: number;
  prevY?: number;
  prevWidth?: number;
  prevHeight?: number;
  isFixed?: boolean;
  variant?: variant;
};

export type WindowProps = WindowData & {
  children: React.ReactNode;
  onClose?: (id: string) => void;
  isFocused?: boolean;
};
