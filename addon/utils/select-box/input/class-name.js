import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export default function className() {
  return computed(function() {
    const { selectBox } = this;
    return buildClassName(selectBox, 'input');
  });
}
