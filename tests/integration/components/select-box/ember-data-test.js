import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Adapter from 'ember-data/adapters/json-api';
import Serializer from 'ember-data/serializers/json-api';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

module('select-box (ember data)', function(hooks) {
  setupRenderingTest(hooks);

  let store;
  let payload;
  let delay = 0;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');

    this.owner.register(
      'model:foo',
      Model.extend({
        name: attr()
      })
    );

    this.owner.register('serializer:foo', Serializer);

    this.owner.register(
      'adapter:foo',
      Adapter.extend({
        ajax() {
          return new Promise(resolve => {
            later(() => {
              resolve(payload);
            }, delay);
          });
        }
      })
    );
  });

  test('multiple select with ED', async function(assert) {
    assert.expect(2);

    const foos = [];

    for (let i = 0; i < 10; i++) {
      foos.push({
        id: i,
        type: 'foo',
        attributes: {
          name: `Foo ${i}`
        }
      });
    }

    payload = { data: foos };
    delay = 100;

    this.set('foos', store.findAll('foo'));
    this.set(
      'value',
      store.findAll('foo').then(foos => {
        return foos.filter(foo => {
          return foo.id >= 5;
        });
      })
    );

    await render(hbs`
      <SelectBox @value={{this.value}} @multiple={{true}} as |sb|>
        {{#if sb.isPending}}
          ...
        {{else}}
          {{#each this.foos as |foo|}}
            <sb.Option @value={{foo}}>
              {{foo.name}}
            </sb.Option>
          {{/each}}
        {{/if}}
      </SelectBox>
    `);

    assert.dom('.select-box__option--selected').exists({ count: 5 });
    assert
      .dom('.select-box__option:not(.select-box__option--selected)')
      .exists({ count: 5 });
  });
});
