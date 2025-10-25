import React from "react";

export const Taskbar = () => {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 h-10 bg-zinc-800">
      {/* Start Icon */}

      {/* Taskbar Icons */}

      {/* Right Side Icons */}
    </div>
  );
};

// Unified Store Architecture
//
// App Registry (Static) - Single source of truth for "what apps exist"
// - Defined once in WindowStore as a constant object
// - Contains: id, name, icon, defaultWidth, defaultHeight
// - Never changes at runtime (like "installed apps" on your OS)
//
// Windows Array (Dynamic) - Single source of truth for "running apps"
// - Each window has: { id, appId, title, x, y, width, height, isMinimized, isMaximized }
// - window.appId references the App Registry
// - First item in array = focused/top window (z-index)
//
// Pinned Apps Array (Dynamic) - User preference for taskbar order
// - Array of appIds: ["chrome", "vscode", "files"]
// - Determines order of pinned icons in taskbar
// - Can be reordered via drag-and-drop
//
// Everything Else is Computed (No Duplication):
//
// Running Apps:
//   - Derived from windows array: Array.from(new Set(windows.map(w => w.appId)))
//   - No separate array needed
//
// Taskbar Items:
//   - Computed: pinnedAppIds + runningAppIds (merged intelligently)
//   - Each item knows: appId, isPinned, isRunning, windowCount, isFocused
//   - Automatically updates when windows change
//
// Window Z-Index:
//   - Computed from array position: windows[0] has highest z-index
//   - focusWindow() moves window to index 0
//
// Flow:
// 1. User clicks app icon → windowStore.launchApp(appId)
// 2. launchApp() adds new window to windows array (ONE update)
// 3. Computed properties automatically update:
//    - taskbarItems shows app as running
//    - windowsWithZIndex assigns z-index
//    - runningAppIds includes the new app
// 4. Components re-render via MobX observers
//
// No manual syncing between arrays. No side effects. One source of truth per concern.
