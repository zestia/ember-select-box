import { computed } from '@ember/object';
import { buildClassName } from '../shared/class-name';

export default function className() {
  return computed(
    'isOpen',
    'isFocused',
    'isDisabled',
    'isMultiple',
    'isBusy',
    function() {
      const classNames = [];

      classNames.push(buildClassName(this));

      if (this.isOpen) {
        classNames.push(buildClassName(this, null, 'open'));
      }

      if (this.isFocused) {
        classNames.push(buildClassName(this, null, 'focused'));
      }

      if (this.isDisabled) {
        classNames.push(buildClassName(this, null, 'disabled'));
      }

      if (this.isMultiple) {
        classNames.push(buildClassName(this, null, 'multiple'));
      }

      if (this.isBusy) {
        classNames.push(buildClassName(this, null, 'busy'));
      }

      return classNames.join(' ');
    }
  );
}
