import { buildClassName as className } from '../../shared/class-name';

export default function buildClassName(option) {
  const classNames = [];

  const { selectBox } = option.args;

  classNames.push(className(selectBox, 'option'));

  if (option.isActive) {
    classNames.push(className(selectBox, 'option', 'active'));
  }

  if (option.isDisabled) {
    classNames.push(className(selectBox, 'option', 'disabled'));
  }

  if (option.isSelected) {
    classNames.push(className(selectBox, 'option', 'selected'));
  }

  return classNames.join(' ');
}
