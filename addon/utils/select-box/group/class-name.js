import { computed } from '@ember/object';
import { buildClassName } from '../../shared/class-name';

export function className() {
  return computed(function() {
    return buildClassName(this, 'group');
  });
}

export function groupLabelClassName() {
  return computed(function() {
    return buildClassName(this, 'group-label');
  });
}

export function groupOptionsClassName() {
  return computed(function() {
    return buildClassName(this, 'group-options');
  });
}
