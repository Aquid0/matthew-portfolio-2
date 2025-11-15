export type TerminalLine = {
  type: "input" | "output" | "component";
  content: "string" | React.ReactNode;
};

export type CommandHandler = (args: string[]) => string | React.ReactNode;
