import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export function className() {
  return computed(function() {
    const { selectBox } = this.args;
    return buildClassName(selectBox, 'group');
  });
}

export function groupLabelClassName() {
  return computed(function() {
    const { selectBox } = this.args;
    return buildClassName(selectBox, 'group-label');
  });
}

export function groupOptionsClassName() {
  return computed(function() {
    const { selectBox } = this.args;
    return buildClassName(selectBox, 'group-options');
  });
}
