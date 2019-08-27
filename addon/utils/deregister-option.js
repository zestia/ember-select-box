import scheduleUpdateOptions from './schedule-update-options';

export default function deregisterOption(selectBox, option) {
  selectBox._options.removeObject(option);
  scheduleUpdateOptions(selectBox);
}
