export enum LogLevel {
  INFO = "info",
  ERROR = "error",
}

export const logger = (level: LogLevel, resolver: string, message: string) => {
  console[level](JSON.stringify({ level, resolver, message }));
};
