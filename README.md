# Matthew's Portfolio

A terminal-inspired portfolio website built with Next.js, featuring a retro CRT aesthetic and interactive window management system.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** MobX
- **UI Components:** Custom window system with drag/resize

## Project Structure

```
src/
├── app/              # Next.js App Router (routes, layouts, pages)
│   ├── layout.tsx    # Root layout with providers
│   ├── page.tsx      # Home page with window system
│   └── globals.css   # Global styles and animations
├── components/       # Reusable components
│   ├── Terminal/     # Terminal emulator with command system
│   ├── system/       # Window management (Window, Desktop, Taskbar)
│   └── Icon/         # Icon component
├── stores/           # MobX state management
│   ├── WindowStore.ts      # Window state and operations
│   ├── TerminalStore.ts    # Terminal command execution
│   └── StoreContext.tsx    # React context provider
├── types/            # Shared TypeScript types
│   ├── window.ts     # Window-related types
│   ├── terminal.ts   # Terminal-related types
│   └── store.ts      # Store-related types
├── constants/        # App-wide constants
│   └── AppRegistry.ts      # Application registry
├── hooks/            # Custom React hooks (future)
└── utils/            # Utility functions (future)
```

## Architecture Decisions

### Type Organization

**Shared Types (`src/types/`):**

- Used across multiple modules
- Represent domain models/entities
- Core data structures
- Examples: `WindowData`, `TerminalLine`, `AppId`

**Local Types (`component/types.ts`):**

- Only used within that component/module
- Implementation details
- Examples: `TitleBarProps`, `IconProps`

**Rule:** If you import a type from `../../../`, move it to `src/types/`

### Component Structure

- **Terminal:** Command-line interface with typewriter animations and syntax highlighting
- **Window System:** Draggable, resizable windows with minimize/maximize
- **Desktop:** Main container with CRT effect overlay
- **Taskbar:** Application launcher and window management

### State Management

- **WindowStore:** Manages window positions, states, and z-index
- **TerminalStore:** Handles command execution across multiple terminal instances
- **MobX Observables:** Reactive state updates with minimal boilerplate

## Key Features

### Terminal System

- Typewriter animation for text display
- Syntax highlighting for keywords (React, TypeScript, Amazon)
- Command registry for extensible commands
- Multiple terminal instances with cross-terminal command execution

### Window Management

- Drag and drop positioning
- Resize with min/max constraints
- Minimize/maximize states
- Focus management with visual indicators
- Z-index stacking

### Visual Effects

- CRT screen flicker animation
- Text glow effects
- Terminal cursor blink (530ms standard rate)
- Smooth transitions for focus states

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Code Style

- **Imports:** Use `@/` path aliases for clean imports
- **Components:** Functional components with TypeScript
- **State:** MobX observers for reactive components
- **Styling:** Tailwind utility classes with custom animations
- **Types:** Explicit typing, avoid `any`

## Future Enhancements

- [ ] Add more terminal commands (projects, skills, contact)
- [ ] Implement command history (arrow keys)
- [ ] Add tab completion
- [ ] Create custom hooks for reusable logic
- [ ] Add unit tests
- [ ] Improve mobile responsiveness
