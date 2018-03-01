import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Adapter from 'ember-data/adapters/json-api';
import { later } from '@ember/runloop';

module('select-box (ember data)', function(hooks) {
  setupRenderingTest(hooks);

  let store;
  let payload;
  let delay = 0;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');

    this.owner.register('model:foo', Model.extend({
      name: attr()
    }));

    this.owner.register('adapter:foo', Adapter.extend({
      ajax() {
        return new Promise(resolve => {
          later(() => {
            resolve(payload);
          }, delay);
        });
      }
    }));
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
    this.set('value', store.findAll('foo').then(foos => {
      return foos.filter(foo => {
        return foo.get('id') >= 5;
      });
    }));

    await render(hbs `
      {{#select-box value=value multiple=true as |sb|}}
        {{#each foos as |foo|}}
          {{sb.option value=foo label=foo.name}}
        {{/each}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-option.is-selected').length, 5);
    assert.equal(this.$('.select-box-option:not(.is-selected)').length, 5);
  });
});
