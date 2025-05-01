export default () => {
  const { t } = useI18n();

  function required(value: number | string | unknown[]): boolean | string {
    if (
      value !== null
        && value !== undefined
        && value !== ''
        && (Array.isArray(value) ? value.length > 0 : true)
    ) {
      return true;
    }
    return t('validation.required');
  }

  function positive (value: number | string): boolean | string {
    if (typeof value === 'number' && value > 0) {
      return true;
    }
    return t('validation.positive');
  }

  const positiveOrZero = (value: number | string):  boolean | string => {
    if (typeof value === 'number' && value >= 0) {
      return true;
    }
    return t('validation.positiveOrZero');
  };

  const positiveOrEmpty = (value: number | string | null): boolean | string => {
    if (typeof value === 'number' && value > 0) {
      return true;
    } else if (typeof value === 'string' && value === '') {
      return true;
    } else if (value === null) {
      return true;
    }
    return t('validation.positiveOrEmpty');
  };

  return {
    required,
    positive,
    positiveOrZero,
    positiveOrEmpty,
  };
};
