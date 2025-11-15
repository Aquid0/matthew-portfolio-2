import { CommandHandler } from "../types";

export const commands: Record<string, CommandHandler> = {
  help: () => "Available commands: help, about, projects, clear",
  about: () => "Matthew's Portfolio - Software Developer",
  clear: () => null,
  projects: () => "Projects: Project 1, Project 2...",
};
