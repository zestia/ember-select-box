import invokeAction from './invoke';

export default function focusInAction(selectBox, e) {
  invokeAction(selectBox, 'onFocusIn', e, selectBox.api());
}
