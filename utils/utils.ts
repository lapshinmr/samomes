type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

export function typedEntries<T>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}
