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

  function getReagents(amount: number = 0) {

    function getReagentType(key, data) {
      if (key in FORMULAS) {
        return ReagentTypeName.FORMULA;
      } else if (key in COMPOUNDS) {
        return ReagentTypeName.COMPOUND;
      }
      return data.type;
    }

    return [
      ...typedEntries({ ...FORMULAS, ...COMPOUNDS, ...reagentsStore.reagents }).map(([key, data]) => new Reagent({
        key,
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
