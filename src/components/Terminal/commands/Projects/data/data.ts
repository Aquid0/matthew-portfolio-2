import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    name: "Neovim Config",
    url: "https://github.com/vereis/nix-config/tree/master/modules/home/neovim/lua",
    description:
      "Personal Neovim configuration based on Lazy, with LSP support, Treesitter, and custom Lua plugins.",
    tags: ["neovim", "lua"],
    lastUpdated: "17-11-2025",
  },
  {
    name: "Portfolio Website",
    url: "https://github.com/example/portfolio",
    description:
      "Terminal-inspired portfolio built with Next.js and TypeScript.",
    tags: ["nextjs", "typescript", "react"],
    lastUpdated: "17-11-2025",
  },
];
