export type RuleType<T> = (value: T) => boolean | string;

// TODO: make text as an argument
export const required = (value: number | string | unknown[]): boolean | string => {
  if (
    value !== null
    && value !== undefined
    && value !== ''
    && (Array.isArray(value) ? value.length > 0 : true)
  ) {
    return true;
  }
  return 'Required';
};

export const positive = (value: number | string): boolean | string => {
  if (typeof value === 'number' && value > 0) {
    return true;
  }
  return 'Only positive number'
}

export const positiveOrZero = (value: number | string):  boolean | string => {
  if (typeof value === 'number' && value >= 0) {
    return true;
  }
  return 'Only positive or zero number'
}

export const positiveOrEmpty = (value: number | string | null): boolean | string => {
  if (typeof value === 'number' && value > 0) {
    return true;
  } else if (typeof value === 'string' && value === '') {
    return true;
  } else if (value === null) {
    return true;
  }
  return 'Only positive or empty value'
}

export const email = (value: string): boolean | string => {
  const emailRegex = /^(\s+)?(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))(\s+)?$/;
  if (emailRegex.test(value)) {
    return true;
  }
  return 'Invalid email';
};

export default {
  required,
  positive,
  positiveOrZero,
  email,
}
