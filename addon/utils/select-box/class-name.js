import { buildClassName as className } from '../shared/class-name';

export default function buildClassName(selectBox) {
  const classNames = [];

  classNames.push(className(selectBox));

  if (selectBox.isOpen) {
    classNames.push(className(selectBox, null, 'open'));
  }

  if (selectBox.isFocused) {
    classNames.push(className(selectBox, null, 'focused'));
  }

  if (selectBox.isDisabled) {
    classNames.push(className(selectBox, null, 'disabled'));
  }

  if (selectBox.isMultiple) {
    classNames.push(className(selectBox, null, 'multiple'));
  }

  if (selectBox.isBusy) {
    classNames.push(className(selectBox, null, 'busy'));
  }

  return classNames.join(' ');
}
