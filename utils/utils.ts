/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * You are free to:
 *  - Share — copy and redistribute the material in any medium or format
 *  - Adapt — remix, transform, and build upon the material
 *
 * Under the following terms:
 *  - Attribution — You must give appropriate credit
 *  - NonCommercial — You may not use the material for commercial purposes
 *  - ShareAlike — If you remix, transform, or build upon the material,
 *    you must distribute your contributions under the same license as the original
 *
 * No warranties are given. The license may not give you all of the permissions
 * necessary for your intended use.
 */

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
