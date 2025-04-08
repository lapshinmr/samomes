export default () => {
  const itemIndexToRemove = useState(() => null);
  const isRemovePopup = useState(() => false);

  function onRemove(index: number) {
    itemIndexToRemove.value = index;
    isRemovePopup.value = true;
  }

  function onRemoveConfirmation() {
    itemIndexToRemove.value = null;
    isRemovePopup.value = false;
  }

  return {
    itemIndexToRemove,
    isRemovePopup,
    onRemove,
    onRemoveConfirmation,
  };
};
