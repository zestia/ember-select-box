import { apiMacro } from '../component/api';

const publicProperties = [
  'element',
  'isBusy',
  'isDisabled',
  'isFocused',
  'isFulfilled',
  'isMultiple',
  'isOpen',
  'isPending',
  'isRejected',
  'isSearching',
  'isSettled',
  'isSlowSearch',
  'value'
];

const publicActions = [
  'activateNextOption',
  'activateNextSelectedOption',
  'activateOptionForValue',
  'activateOptionAtIndex',
  'activateOptionForKeyCode',
  'activatePreviousOption',
  'activatePreviousSelectedOption',
  'activateSelectedOptionAtIndex',
  'blurInput',
  'cancelSearch',
  'close',
  'deactivateOptions',
  'deactivateSelectedOptions',
  'focusInput',
  'open',
  'search',
  'select',
  'selectActiveOption',
  'setInputValue',
  'toggle',
  'update'
];

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
