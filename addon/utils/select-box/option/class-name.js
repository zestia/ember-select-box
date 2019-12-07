import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export default function className() {
  return computed('isActive', 'isDisabled', 'isSelected', function() {
    const classNames = [];

    classNames.push(buildClassName(this, 'option'));

    if (this.isActive) {
      classNames.push(buildClassName(this, 'option', 'active'));
    }

    if (this.isDisabled) {
      classNames.push(buildClassName(this, 'option', 'disabled'));
    }

    if (this.isSelected) {
      classNames.push(buildClassName(this, 'option', 'selected'));
    }

    return classNames.join(' ');
  });
}
