import scheduleUpdateOptions from './schedule-update-options';

export default function registerOption(selectBox, option) {
  selectBox._options.addObject(option);
  scheduleUpdateOptions(selectBox);
}
