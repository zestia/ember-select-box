import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
const { keys } = Object;

module('select-box (api)', function(hooks) {
  setupTest(hooks);

  test('api', function(assert) {
    assert.expect(1);

    let selectBox;

    run(() => selectBox = this.owner.factoryFor('component:select-box').create());

    const properties = keys(selectBox.get('api'));

    assert.deepEqual(properties, [
      'value',
      'element',
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
});
