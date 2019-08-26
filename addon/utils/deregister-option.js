import scheduleUpdateOptions from './schedule-update-options';

export default function deregisterOption(component, option) {
  component._options.removeObject(option);
  scheduleUpdateOptions(component);
}
