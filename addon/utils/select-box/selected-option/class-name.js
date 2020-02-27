import { buildClassName as className } from '../../shared/class-name';

export default function buildClassName(selectedOption) {
  const classNames = [];

  const { selectBox } = selectedOption.args;

  classNames.push(className(selectBox, 'selected-option'));

  if (selectedOption.isActive) {
    classNames.push(className(selectBox, 'selected-option', 'active'));
  }

  return classNames.join(' ');
}
