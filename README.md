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

## Future Enhancements

- [ ] Add more terminal commands (projects, skills, contact)
- [ ] Implement command history (arrow keys)
- [ ] Add tab completion
- [ ] Create custom hooks for reusable logic
- [ ] Add unit tests
- [ ] Improve mobile responsiveness
