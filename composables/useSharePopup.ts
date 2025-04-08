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
  };

  return {
    itemIndexToShare,
    isSharePopup,
    onShare,
    copyUrl,
    encodeUrl,
  };
};
