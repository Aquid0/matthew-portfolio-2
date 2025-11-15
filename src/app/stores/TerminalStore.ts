import { action, makeObservable, observable } from "mobx";

export class TerminalStore {
  terminals: Map<string, (cmd: string) => void> = new Map();

  constructor() {
    makeObservable(this, {
      terminals: observable,
      registerTerminal: action,
      unregisterTerminal: action,
      executeInTerminal: action,
    });
  }

  registerTerminal(terminalId: string, executeCommand: (cmd: string) => void) {
    this.terminals.set(terminalId, executeCommand);
  }

  unregisterTerminal(terminalId: string) {
    this.terminals.delete(terminalId);
  }

  executeInTerminal(terminalId: string, cmd: string) {
    const executeCommand = this.terminals.get(terminalId);
    executeCommand?.(cmd);
  }
}
