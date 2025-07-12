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

export default () => {
  const reagentsStore = useReagentsStore();

  const { locale } = useI18n();

  function getReagents(amount: number = 0) {

    // TODO: add types
    function getReagentType(key, data) {
      if (key in FORMULAS) {
        return ReagentTypeName.FORMULA;
      } else if (key in COMPOUNDS) {
        return ReagentTypeName.COMPOUND;
      }
      return data.type;
    }

    const sortObjectByName = (object: Record<string, FormulaObjectType>) => {
      const result: [string, FormulaObjectType][] = typedEntries(object);
      result.sort((a, b) => a[1].name.localeCompare(b[1].name, locale.value));
      return result;
    };

    const formulas: Record<string, FormulaObjectType> = { ...FORMULAS };
    if (locale.value === 'en') {
      typedEntries(FORMULA_NAMES_EN).forEach(([key, name]) => {
        formulas[key] = {
          ...FORMULAS[key],
          name,
        };
      });
    }

    const compounds: Record<string, CompoundObjectType> = { ...COMPOUNDS };
    if (locale.value === 'en') {
      typedEntries(COMPOUND_NAMES_EN).forEach(([key, name]) => {
        compounds[key] = {
          ...FORMULAS[key],
          name,
        };
      });
    }

    const FORMULAS_SORTED = Object.fromEntries(sortObjectByName(formulas));
    const COMPOUNDS_SORTED = Object.fromEntries(sortObjectByName(compounds));
    const OWN_REAGENTS_SORTED = Object.fromEntries(sortObjectByName(reagentsStore.reagents));

    return [
      ...typedEntries({
        ...FORMULAS_SORTED,
        ...COMPOUNDS_SORTED,
        ...OWN_REAGENTS_SORTED,
      }).map(([key, data]) => new Reagent({
        key: key as ReagentKeyType,
        ...data,
        amount,
        type: getReagentType(key, data),
      })),
    ];
  }

  function checkName(name: string) {
    return name in FORMULAS || name in COMPOUNDS || name in reagentsStore.reagents;
  }

  return {
    getReagents,
    checkName,
  };
};
