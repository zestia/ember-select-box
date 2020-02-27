import { apiMacro } from '../component/api';

const publicProperties = {
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
  isSlowSearch: true,
  value: true
};

const publicActions = {
  activateNextOption: true,
  activateNextSelectedOption: true,
  activateOptionForValue: true,
  activateOptionAtIndex: true,
  activateOptionForKeyCode: true,
  activatePreviousOption: true,
  activatePreviousSelectedOption: true,
  activateSelectedOptionAtIndex: true,
  blurInput: true,
  cancelSearch: true,
  close: true,
  deactivateOptions: true,
  deactivateSelectedOptions: true,
  focusInput: true,
  open: true,
  search: true,
  select: true,
  selectActiveOption: true,
  setInputValue: true,
  toggle: true,
  update: true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
