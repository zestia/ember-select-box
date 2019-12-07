import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export default function className() {
  return computed('isActive', function() {
    const classNames = [];

    const { selectBox } = this;

    classNames.push(buildClassName(selectBox, 'selected-option'));

    if (this.isActive) {
      classNames.push(buildClassName(selectBox, 'selected-option', 'active'));
    }

    return classNames.join(' ');
  });
}
