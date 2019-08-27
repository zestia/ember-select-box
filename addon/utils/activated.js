import invokeAction from './invoke-action';

export default function activate(option) {
  invokeAction(option, 'onActivate', option.internalValue, option._parentApi);
}
