type Keys<T> = { [K in keyof T]: K }[keyof T][];
type Values<T> = { [K in keyof T]: T[K] }[keyof T][];
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

export function typedKeys<T>(obj: T): Keys<T> {
  return Object.keys(obj) as Keys<T>;
}

export function typedValues<T>(obj: T): Values<T> {
  return Object.values(obj) as Values<T>;
}

export function typedEntries<T>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}
