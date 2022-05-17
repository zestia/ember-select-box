export function _insertComponent(component) {
  component.args._onInsert?.(component);
}

export function _destroyComponent(component) {
  component.args._onDestroy?.(component);
}
