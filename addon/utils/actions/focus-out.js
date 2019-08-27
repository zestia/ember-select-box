import invokeAction from './invoke';

export default function focusOutAction(component, e) {
  invokeAction(component, 'onFocusOut', e, component.api);
}
