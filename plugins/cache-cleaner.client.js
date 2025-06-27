// plugins/cache-cleaner.client.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    const APP_VERSION = '1.0.3';
    const VERSION_KEY = 'app_version';

    const clearAllCaches = async () => {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('All caches cleared');
      } catch (error) {
        console.error('Error clearing caches:', error);
      }
    };

    const checkVersion = async () => {
      const storedVersion = localStorage.getItem(VERSION_KEY);

      if (storedVersion !== APP_VERSION) {
        console.log('Version changed, clearing caches...');
        await clearAllCaches();
        localStorage.setItem(VERSION_KEY, APP_VERSION);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    };

    checkVersion();
  }
});
