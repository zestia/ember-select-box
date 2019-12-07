import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export default function className() {
  return computed('isActive', 'isDisabled', 'isSelected', function() {
    const classNames = [];

    const { selectBox } = this;

    classNames.push(buildClassName(selectBox, 'option'));

    if (this.isActive) {
      classNames.push(buildClassName(selectBox, 'option', 'active'));
    }

    if (this.isDisabled) {
      classNames.push(buildClassName(selectBox, 'option', 'disabled'));
    }

    if (this.isSelected) {
      classNames.push(buildClassName(selectBox, 'option', 'selected'));
    }

    return classNames.join(' ');
  });
}
