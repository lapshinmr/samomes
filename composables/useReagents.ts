export default () => {
  function getReagents(amount: number = 0) {
    return [
      ...Object.entries({ ...FORMULAS, ...COMPOUNDS }).map(([key, data]) => new Reagent({
        key,
        ...data,
        amount,
        type: key in FORMULAS ? ReagentTypeName.FORMULA : ReagentTypeName.COMPOUND,
      })),
    ];
  }

  return {
    getReagents,
  };
};
