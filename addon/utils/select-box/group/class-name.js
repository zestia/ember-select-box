import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export function className() {
  return computed(function() {
    const { selectBox } = this;
    return buildClassName(selectBox, 'group');
  });
}

export function groupLabelClassName() {
  return computed(function() {
    const { selectBox } = this;
    return buildClassName(selectBox, 'group-label');
  });
}

export function groupOptionsClassName() {
  return computed(function() {
    const { selectBox } = this;
    return buildClassName(selectBox, 'group-options');
  });
}
