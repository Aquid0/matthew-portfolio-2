import { CommandHandler } from "@/types/terminal";

import { About } from "./About";
import { QuickActions } from "./QuickActions";

export const commands: Record<string, CommandHandler> = {
  help: () =>
    "Available commands: help, about, projects, clear, quick_actions, full",
  about: () => <About />,
  clear: () => null,
  full: () => null,
  quick_actions: () => <QuickActions />,
  projects: () => "Projects: Project 1, Project 2...",
};
