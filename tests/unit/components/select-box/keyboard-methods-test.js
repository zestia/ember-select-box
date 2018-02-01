import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { keys as eventKeys } from '@zestia/ember-select-box/mixins/select-box/keyboard-events';
const { keys } = Object;
import { run } from '@ember/runloop';
import { capitalize } from '@ember/string';

module('select-box (keyboard methods)', function(hooks) {
  setupTest(hooks);

  test('keydown methods', function(assert) {
    assert.expect(1);

    const called = [];

    run(() => {
      const TestComponent = this.owner.factoryFor('component:select-box');

      const options = keys(eventKeys).reduce((options, key) => {
        const methodName = `press${capitalize(eventKeys[key])}`;
        options[methodName] = () => {
          called.push(methodName);
        };
        return options;
      }, {});

      const component = TestComponent.create(options);

      keys(eventKeys).forEach(key => {
        component.keyDown({ which: key });
      });
    });

    assert.deepEqual(called, [
      'pressBackspace',
      'pressTab',
      'pressEnter',
      'pressEscape',
      'pressLeft',
      'pressUp',
      'pressRight',
      'pressDown'
    ], 'calls methods named that of the key that was pressed');
  });
});
