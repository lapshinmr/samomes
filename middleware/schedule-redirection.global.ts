export default defineNuxtRouteMiddleware((to, from) => {
  const schedulesStore = useSchedulesStore();
  const { appRoutes } = useAppRoutes();

  if (
    schedulesStore.isSchedules
    && !sessionStorage.getItem('hasVisited')
    && to.path !== appRoutes.value.schedules.path
  ) {
    sessionStorage.setItem('hasVisited', 'true');
    return navigateTo(appRoutes.value.schedules.path);
  }
});
