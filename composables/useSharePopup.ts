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
  const snackbarStore = useSnackbarStore();
  const itemIndexToShare = useState(() => null);
  const isSharePopup = ref(false);

  function onShare(index: number) {
    itemIndexToShare.value = index;
    isSharePopup.value = true;
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    snackbarStore.show('Ссылка скопирована');
  }

  function encodeUrl (data: Record<string, unknown>) {
    if (itemIndexToShare.value === null) {
      return '';
    }

    let jsonString = JSON.stringify([data]);
    jsonString = jsonString.replace(/%/g, '%25');
    const encoded = encodeURIComponent(jsonString);
    return `${window.location.origin + window.location.pathname}share?share=${encoded}`;
  }

  return {
    itemIndexToShare,
    isSharePopup,
    onShare,
    copyUrl,
    encodeUrl,
  };
};
