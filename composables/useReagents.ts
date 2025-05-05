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
