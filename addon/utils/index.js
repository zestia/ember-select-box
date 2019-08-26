import { computed } from '@ember/object';

export default function index() {
  return computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
  });
}
