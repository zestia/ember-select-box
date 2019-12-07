import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export default function className() {
  return computed('isActive', function() {
    const classNames = [];

    classNames.push(buildClassName(this, 'selected-option'));

    if (this.isActive) {
      classNames.push(buildClassName(this, 'selected-option', 'active'));
    }

    return classNames.join(' ');
  });
}
