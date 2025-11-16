import { action, makeObservable, observable } from "mobx";

type Terminal = {
  executeCommand: (cmd: string) => void;
  commandHistory: string[];
  historyIndex: number;
};

export class TerminalStore {
  terminals: Map<string, Terminal> = new Map();

  constructor() {
    makeObservable(this, {
      terminals: observable,
      registerTerminal: action,
      unregisterTerminal: action,
      executeInTerminal: action,
      addToHistory: action,
      getPreviousCommand: action,
      getNextCommand: action,
    });
  }

  registerTerminal(terminalId: string, executeCommand: (cmd: string) => void) {
    if (!this.terminals.has(terminalId)) {
      this.terminals.set(terminalId, {
        executeCommand,
        commandHistory: [""],
        historyIndex: -1,
      });
    } else {
      const existing = this.terminals.get(terminalId)!;
      existing.executeCommand = executeCommand; // Update the function property under closure
    }
  }

  unregisterTerminal(terminalId: string) {
    this.terminals.delete(terminalId);
  }

  executeInTerminal(terminalId: string, cmd: string) {
    const terminal = this.terminals.get(terminalId);
    if (terminal) {
      this.addToHistory(terminalId, cmd);
      terminal.executeCommand(cmd);
    }
  }

  addToHistory(terminalId: string, cmd: string) {
    const terminal = this.terminals.get(terminalId);
    if (terminal && cmd.trim()) {
      terminal.commandHistory.push(cmd);
      terminal.historyIndex = terminal.commandHistory.length;
    }
    console.log(terminal?.historyIndex);
  }

  getPreviousCommand(terminalId: string): string | undefined {
    const terminal = this.terminals.get(terminalId);
    if (terminal && terminal.historyIndex > 0) {
      terminal.historyIndex--;
      return terminal.commandHistory[terminal.historyIndex];
    }
  }

  getNextCommand(terminalId: string): string | undefined {
    const terminal = this.terminals.get(terminalId);
    if (
      terminal &&
      terminal.historyIndex <= terminal.commandHistory.length - 1
    ) {
      terminal.historyIndex++;
      return terminal.commandHistory[terminal.historyIndex];
    }
    return "";
  }
}
