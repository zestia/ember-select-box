export function ready(selectBox) {
  selectBox.isReady = true;

  selectBox.args.onReady?.(selectBox.api);
}
