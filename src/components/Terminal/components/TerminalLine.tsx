import { TerminalLine as TerminalLineType } from "@/types/terminal";

import { Prompt } from "./Prompt";

type TerminalLineProps = {
  line: TerminalLineType;
};

export const TerminalLine = ({ line }: TerminalLineProps) => {
  switch (line.type) {
    case "input":
      return (
        <>
          <Prompt /> {line.content}
        </>
      );
    case "output":
      return <div className="ml-2">{line.content}</div>;
    case "component":
      return <>{line.content}</>;
    default:
      return null;
  }
};
