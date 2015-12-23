import { test, moduleForComponent } from 'ember-qunit';
import run from 'ember-runloop';
import events from '../../../helpers/keyboard-events';
import jQuery from 'jquery';
const { keys } = Object;
import { capitalize } from 'ember-string';

moduleForComponent('select-box', 'select-box (keyboard methods)', {
  needs: []
});


keys(events).forEach((key) => {

  let methodName = 'press' + capitalize(key);

  test(`${methodName} method`, function(assert) {
    assert.expect(1);

    run(() => {
      let options = {};
      options[methodName] = (e) => {
        assert.ok(e instanceof jQuery.Event,
          'calls a method relating to the key pressed for ' + key);
      };

      let selectBox = this.subject(options);
      this.render();

      selectBox.$().trigger(events[key]());
    });
  });

});

