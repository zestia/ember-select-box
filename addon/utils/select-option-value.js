import invokeAction from './invoke-action';

export default function selectOptionValue(option) {
  if (option.isDisabled) {
    return;
  }

  invokeAction(option, '_onSelect', option.internalValue);
  invokeAction(option, 'onSelect', option.internalValue, option._parentApi);
}
