import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';
import { configureAsCombobox, configureAsListbox } from '../select-box/role';
import { set } from '@ember/object';

export function registerInput(selectBox, input) {
  assert('select-box can only have 1 input', !selectBox.input);

  set(selectBox, 'input', input);

  scheduleOnce('afterRender', configureAsCombobox, selectBox);
}

export function deregisterInput(selectBox, input) {
  set(selectBox, 'input', null);

  scheduleOnce('afterRender', configureAsListbox, selectBox);
}
