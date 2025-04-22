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
