import invokeAction from './invoke';

export default function focusInAction(component, e) {
  invokeAction(component, 'onFocusIn', e, component.api);
}
