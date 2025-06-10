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

export const format = (value: string | number, precision: number | undefined = 3): number | null => {
  if (value === undefined || value === null) {
    return null;
  }
  const num = +value;
  if (isNaN(num)) {
    return null;
  }

  const options = {
    useGrouping: false,
  };
  if (precision !== undefined) {
    options['maximumSignificantDigits'] = precision;
  }
  const formatter = new Intl.NumberFormat('en-US', options);
  return +formatter.format(num);
};

export const formatDate = (value: string | InstanceType<typeof Date>): string => {
  return new Date(value).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

export const getDate = (value: InstanceType<typeof Date>): string => {
  return value.toISOString().split('T')[0];
};

export const getWeekday = (value: string | InstanceType<typeof Date>): string => {
  return new Date(value).toLocaleDateString('ru-RU', { weekday: 'short' });
};

