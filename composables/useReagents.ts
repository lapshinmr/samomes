export default () => {
  const reagentsStore = useReagentsStore();

  function getReagents(amount: number = 0) {
    const reagents: Record<string, OwnReagentType> = {};
    reagentsStore.reagents.forEach((reagent) => {
      reagents[reagent.key] = { ...reagent };
    });

    function getReagentType(key, data) {
      if (key in FORMULAS) {
        return ReagentTypeName.FORMULA;
      } else if (key in COMPOUNDS) {
        return ReagentTypeName.COMPOUND;
      }
      return data.type;
    }

    return [
      ...typedEntries({ ...FORMULAS, ...COMPOUNDS, ...reagents }).map(([key, data]) => new Reagent({
        key,
        ...data,
        amount,
        type: getReagentType(key, data),
      })),
    ];
  }

  function checkName(name: string) {
    const ownReagentNames = reagentsStore.reagents.map((item) => item.key);
    return name in FORMULAS || name in COMPOUNDS || ownReagentNames.includes(name);
  }

  return {
    getReagents,
    checkName,
  };
};
