export default () => {
  const localePath = useLocalePath();

  const appRoutes = computed(() => {
    const result: Partial<Record<RouteType, {
      key: string;
      icon: string;
      path: string;
    }>> = {};
    typedEntries(ROUTES).forEach(([key, value]) => {
      result[key] = {
        ...value,
        path: `${localePath(key)}/`,
      };
    });
    return result;
  });

  return {
    appRoutes,
  };
};
