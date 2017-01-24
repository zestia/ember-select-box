import { test, moduleForComponent } from 'ember-qunit';
import run from 'ember-runloop';
import events from '../../../helpers/keyboard-events';
import jQuery from 'jquery';
const { keys } = Object;
import { capitalize } from 'ember-string';

moduleForComponent('select-box', 'select-box (keyboard methods)', {
  unit: true
});


keys(events).forEach(key => {

  const keyName    = capitalize(key);
  const methodName = `press${keyName}`;

  test(`${methodName} method`, function(assert) {
    assert.expect(1);

    run(() => {
      const options = {};
      options[methodName] = e => {
        assert.ok(e instanceof jQuery.Event,
          `calls a method relating to the key pressed for ${key}`);
      };

      const selectBox = this.subject(options);
      this.render();

      selectBox.$().trigger(events[key]());
    });
  });

});
