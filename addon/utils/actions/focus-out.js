import invokeAction from './invoke';

export default function focusOutAction(selectBox, e) {
  invokeAction(selectBox, 'onFocusOut', e, selectBox.api());
}
