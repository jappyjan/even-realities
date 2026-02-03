export type EvenBetterLoggerImplementation = {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
}

export type EvenBetterLogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

export class EvenBetterLogger {
    public static level: EvenBetterLogLevel = 'error';

    public static implementation: EvenBetterLoggerImplementation = {
        warn: console.warn,
        error: console.error,
        info: console.info,
        debug: console.debug,
    };

    public static debug(message: string): void {
        if (EvenBetterLogger.level !== 'debug') {
            return;
        }
        EvenBetterLogger.implementation.debug(message);
    }

    public static info(message: string): void {
        if (!['debug', 'info'].includes(EvenBetterLogger.level)) {
            return;
        }
        EvenBetterLogger.implementation.info(message);
    }


    public static warn(message: string): void {
        if (!['debug', 'info', 'warn'].includes(EvenBetterLogger.level)) {
            return;
        }
        EvenBetterLogger.implementation.warn(message);
    }

    public static error(message: string): void {
        if (EvenBetterLogger.level === 'none') {
            return;
        }
        EvenBetterLogger.implementation.error(message);
    }
}