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
  const recipesStore = useRecipesStore();
  const fertilizersStore = useFertilizersStore();
  const remineralsStore = useRemineralsStore();

  function checkName(name: string) {
    const recipesNames = recipesStore.fertilizerRecipes.map((item) => item.name);
    const fertilizersNames = fertilizersStore.fertilizers.map((item) => item.name);
    const remineralsNames = remineralsStore.remineralRecipes.map((item) => item.name);

    return recipesNames.includes(name) || fertilizersNames.includes(name) || remineralsNames.includes(name);
  }

  return {
    checkName,
  };
};
