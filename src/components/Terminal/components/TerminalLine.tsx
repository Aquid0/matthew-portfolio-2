import { TerminalLine as TerminalLineType } from "@/types/terminal";

import { Prompt } from "./Prompt";

type TerminalLineProps = {
  line: TerminalLineType;
};

export const TerminalLine = ({ line }: TerminalLineProps) => {
  if (line.type === "input") {
    return (
      <>
        <Prompt /> {line.content}
      </>
    );
  }

  if (line.type === "output") {
    return <div className="ml-2">{line.content}</div>;
  }

  if (line.type === "component") {
    return <>{line.content}</>;
  }

  return null;
};
