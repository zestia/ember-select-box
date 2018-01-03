import { test, moduleForComponent } from 'ember-qunit';
import { run } from '@ember/runloop';
const { keys } = Object;

moduleForComponent('select-box', 'select-box (api)', {
  unit: true
});


test('api', function(assert) {
  assert.expect(1);

  let selectBox;

  run(() => selectBox = this.subject());

  const functions = keys(selectBox.get('api'));

  assert.deepEqual(functions, [
    'open',
    'close',
    'toggle',
    'select',
    'update',
    'selectActiveOption',
    'search',
    'stopSearching',
    'setInputValue',
    'focusInput',
    'blurInput',
    'activateOptionAtIndex',
    'activateNextOption',
    'activatePreviousOption',
    'deactivateOptions',
    'activateSelectedOptionAtIndex',
    'activateNextSelectedOption',
    'activatePreviousSelectedOption',
    'deactivateSelectedOptions'
  ]);
});
