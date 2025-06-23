export default () => {

  const tanksStore = useTanksStore();
  const recipesStore = useRecipesStore();
  const fertilizersStore = useFertilizersStore();
  const remineralsStore = useRemineralsStore();

  const { getReagents } = useReagents();

  function copyOldData() {
    // COPY tanks from udata
    if (!tanksStore.isUpdated) {
      const data = JSON.parse(localStorage.getItem('udata')) || {};
      const tanks = data.tanks || [];
      tanks.forEach((tank) => {
        const tankObject = {
          name: tank.name,
          volume: tank.volume,
          waterChangePercent: tank.waterChange,
          waterChangeVolume: tank.waterChangeVolume,
          filterVolume: tank.filter,
        };
        tanksStore.addTank(tankObject);
      });
      tanksStore.setUpdated(true);
    }

    // COPY recipes from udata
    if (!recipesStore.isUpdated) {
      const data = JSON.parse(localStorage.getItem('udata')) || {};
      const recipes = data.recipes || [];
      const INITIAL_REAGENT_AMOUNT = 0;
      const reagents = getReagents(INITIAL_REAGENT_AMOUNT);
      const reagentH2O = reagents.find((reagent) => reagent.key === H2O);
      recipes.forEach((recipe) => {
        const recipeObject = {
          name: recipe.name,
          description: recipe.note,
          tankVolume: recipe.tankVolume,
          reagents: [],
        };
        if (recipe.volume) {
          reagentH2O.amount = recipe.volume;
          recipeObject.reagents.push(reagentH2O.toJson());
        }
        Object.entries(recipe.mass).forEach(([reagentName, amount]) => {
          const reagent = reagents.find((reagent) => reagent.key === reagentName);
          if (reagent instanceof Reagent && amount) {
            reagent.amount = amount as number;
            recipeObject.reagents.push(reagent.toJson());
          }
        });
        recipesStore.addRecipe(recipeObject);
      });
      recipesStore.setUpdated(true);
    }

    // COPY reminerals from udata
    if (!remineralsStore.isUpdated) {
      const data = JSON.parse(localStorage.getItem('udata')) || {};
      const reminerals = data.reminerals || [];
      const INITIAL_REAGENT_AMOUNT = 0;
      const reagents = getReagents(INITIAL_REAGENT_AMOUNT);
      const reagentH2O = reagents.find((reagent) => reagent.key === H2O);
      reminerals.forEach((remineral) => {
        const remineralObject = {
          name: remineral.name,
          description: remineral.note,
          changeVolume: remineral.volume,
          doseVolume: remineral.doseVolume,
          totalVolume: remineral.substanceVolume,
          reagents: [],
        };
        if (remineral.substanceVolume) {
          reagentH2O.amount = remineral.substanceVolume;
          remineralObject.reagents.push(reagentH2O.toJson());
        }
        Object.entries(remineral.mass).forEach(([reagentName, amount]) => {
          const reagent = reagents.find((reagent) => reagent.key === reagentName);
          if (reagent instanceof Reagent && amount) {
            reagent.amount = amount as number;
            remineralObject.reagents.push(reagent.toJson());
          }
        });
        remineralsStore.addRemineral(remineralObject);
      });
      remineralsStore.setUpdated(true);
    }

    // COPY fertilizers from udata
    if (!fertilizersStore.isUpdated) {
      const data = JSON.parse(localStorage.getItem('udata')) || {};
      const fertilizers = data.fertilizers || [];
      fertilizers.forEach((fertilizer) => {
        const fertilizerObject = {
          name: fertilizer.name,
          description: fertilizer.note,
          isPercent: fertilizer.isPercent,
          isLiquid: fertilizer.isLiluid || true,
          ions: {},
        };
        Object.entries(fertilizer.elements).forEach(([ion, amount]) => {
          if (amount) {
            fertilizerObject.ions[ion] = amount;
          }
        });
        fertilizersStore.addFertilizer(fertilizerObject);
      });
      fertilizersStore.setUpdated(true);
    }
  }

  return {
    copyOldData,
  };
}
