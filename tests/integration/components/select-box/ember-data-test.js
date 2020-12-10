import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Model, { attr, belongsTo } from '@ember-data/model';
import RESTAdapter from '@ember-data/adapter/rest';

module('select-box (ember data)', function (hooks) {
  setupRenderingTest(hooks);

  class FooModel extends Model {
    @attr name;
    @belongsTo('bar') bar;
  }

  class BarModel extends Model {
    @attr name;
  }

  class FooAdapter extends RESTAdapter {
    findAll() {
      return {
        foos: [
          {
            id: 1,
            name: 'Foo 1',
            bar: 1
          },
          {
            id: 2,
            name: 'Foo 2',
            bar: 2
          },
          {
            id: 3,
            name: 'Foo 3',
            bar: 3
          }
        ]
      };
    }
  }

  class BarAdapter extends RESTAdapter {
    findRecord(store, type, id) {
      return {
        bar: {
          id,
          name: `Bar ${id}`
        }
      };
    }
  }

  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store');

    this.owner.register('model:foo', FooModel);
    this.owner.register('model:bar', BarModel);
    this.owner.register('adapter:foo', FooAdapter);
    this.owner.register('adapter:bar', BarAdapter);
  });

  test('Promise Proxy is resolved', async function (assert) {
    assert.expect(2);

    this.foos = await this.store.findAll('foo');

    await render(hbs`
      <SelectBox @value={{this.bar2}} as |sb|>
        {{#each this.foos as |foo|}}
          <sb.Option @value={{foo.bar}} as |o|>
            {{o.value.name}} {{o.isSelected}}
          </sb.Option>
        {{/each}}
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .doesNotExist('awaiting promise proxy');

    this.set('bar2', this.store.peekRecord('bar', 2));

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');
  });
});
