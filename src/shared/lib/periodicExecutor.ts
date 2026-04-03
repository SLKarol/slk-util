export class PeriodicExecutor {
  private timerId: NodeJS.Timeout | null = null;

  constructor(
    private readonly task: () => Promise<void>,
    private readonly intervalMs: number,
  ) {}

  start = () => {
    if (this.timerId) {
      console.warn("Timer is already running");
      return;
    }

    const executeAndSchedule = async () => {
      try {
        await this.task();
      } catch (error) {
        console.error("Periodic task failed:", error);
      }
      this.timerId = setTimeout(executeAndSchedule, this.intervalMs);
    };

    executeAndSchedule();
  };

  stop = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  };
}
