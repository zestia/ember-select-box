import apiMacro from '../shared/api';

const publicProperties = {
  apiValue: 'value',
  index: true,
  isPending: true,
  isFulfilled: true,
  isSettled: true,
  isSelected: true,
  domElement: 'element',
  isOpen: true,
  isMultiple: true,
  isFocused: true,
  isDisabled: true,
  isSearching: true,
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
