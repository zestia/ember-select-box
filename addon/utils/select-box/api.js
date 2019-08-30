import { apiMacro } from '../component/api';

const publicProperties = {
  resolvedValue: 'value',
  domElement: 'element',
  isBusy: true,
  isDisabled: true,
  isFocused: true,
  isFulfilled: true,
  isMultiple: true,
  isOpen: true,
  isPending: true,
  isRejected: true,
  isSearching: true,
  isSettled: true,
  isSlowSearch: true
};

const publicActions = {
  open: true,
  close: true,
  toggle: true,
  select: true,
  update: true,
  selectActiveOption: true,
  search: true,
  cancelSearch: true,
  setInputValue: true,
  focusInput: true,
  blurInput: true,
  activateOptionAtIndex: true,
  activateNextOption: true,
  activatePreviousOption: true,
  activateOptionForKeyCode: true,
  deactivateOptions: true,
  activateSelectedOptionAtIndex: true,
  activateNextSelectedOption: true,
  activatePreviousSelectedOption: true,
  deactivateSelectedOptions: true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
