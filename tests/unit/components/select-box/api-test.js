import { test, moduleForComponent } from 'ember-qunit';
import run from 'ember-runloop';
const { keys } = Object;

moduleForComponent('select-box', 'select-box (api)', {
  needs: []
});


test('api', function(assert) {
  assert.expect(1);

  let selectBox;

  run(() => selectBox = this.subject());

  let functions = keys(selectBox.get('api'));

  assert.deepEqual(functions, [
    'open',
    'close',
    'toggle',
    'select',
    'update',
    'search',
    'setInputValue',
    'focusInput',
    'activateOptionAtIndex',
    'activateNextOption',
    'activatePreviousOption',
    'deactivateOptions',
    'activateSelectedOptionAtIndex',
    'activateNextSelectedOption',
    'activatePreviousSelectedOption',
    'deactivateSelectedOptions',
    'navigateOptionsUp',
    'navigateOptionsDown'
  ]);
});

