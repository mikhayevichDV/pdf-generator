export type ClassType<T = unknown> = new (...args: []) => T;

export type AbstractClassType<T = unknown> = abstract new (...args: []) => T;
