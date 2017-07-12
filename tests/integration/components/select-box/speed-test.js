/* eslint-disable no-console */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import RSVP from 'rsvp';
import { A as emberA } from '@ember/array';
import wait from 'ember-test-helpers/wait';


moduleForComponent('', 'select-box (promises)', {
  integration: true,

  beforeEach() {
    this.set('times', []);

    this.set('items', emberA());

    for (let i = 0; i <= 500; i++) {
      this.get('items').pushObject(`Item ${i}`);
    }

    this.set('promiseItems', emberA(this.get('items').map(item => {
      return new RSVP.Promise(resolve => {
        resolve(item);
      });
    })));

    this.set('selectedPromiseItems', emberA());

    for (let i = 100; i <= 500; i += 100) {
      this.get('selectedPromiseItems').pushObject(
        this.get('promiseItems').objectAt(i)
      );
    }
  }
});



test('extreme example average speed', function(assert) {
  assert.expect(0);

  const start = Date.now();

  this.render(hbs`
    {{#select-box value=selectedPromiseItems multiple=true as |sb|}}
      {{#each promiseItems as |promiseItem|}}
        <option value={{promiseItem}}></option>
      {{/each}}
    {{/select-box}}
  `);

  return wait().then(() => {
    const end = Date.now() - start;

    console.log(end);
  });
});
