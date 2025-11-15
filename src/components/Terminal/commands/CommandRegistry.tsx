import { CommandHandler } from "@/types/terminal";

import { QuickActions } from "./QuickActions";

export const commands: Record<string, CommandHandler> = {
  help: () => "Available commands: help, about, projects, clear, quick_actions",
  about: () => "Matthew's Portfolio - Software Developer",
  clear: () => null,
  quick_actions: () => <QuickActions />,
  projects: () => "Projects: Project 1, Project 2...",
};
