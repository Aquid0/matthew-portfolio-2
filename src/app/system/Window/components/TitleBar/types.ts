import { variant } from "../../types";

export type TitleBarProps = {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  variant: variant;
  isFocused?: boolean;
};
