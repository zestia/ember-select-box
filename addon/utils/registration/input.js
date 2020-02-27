import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';
import { configureAsCombobox, configureAsListbox } from '../select-box/role';

export function registerInput(selectBox, input) {
  assert('select-box can only have 1 input', !selectBox.input);

  selectBox.input = input;

  scheduleOnce('afterRender', selectBox, configureAsCombobox, selectBox);
}

export function deregisterInput(selectBox, input) {
  selectBox.input = null;

  scheduleOnce('afterRender', selectBox, configureAsListbox, selectBox);
}
