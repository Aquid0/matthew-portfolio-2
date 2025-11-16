import { CommandHandler } from "@/types/terminal";

import { About } from "./About";
import { QuickActions } from "./QuickActions";

export const commands: Record<string, CommandHandler> = {
  help: () => "Available commands: help, about, projects, clear, quick_actions",
  about: () => <About />,
  clear: () => null,
  quick_actions: () => <QuickActions />,
  projects: () => "Projects: Project 1, Project 2...",
};
