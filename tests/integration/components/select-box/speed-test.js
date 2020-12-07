import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import config from 'dummy/config/environment';

module('select-box (speed)', function (hooks) {
  setupRenderingTest(hooks);

  const testInProd = config.APP.buildTarget === 'production' ? test : skip;

  hooks.beforeEach(function () {
    this.items = [];

    for (let i = 0; i <= 1000; i++) {
      this.items.push(`Item ${i}`);
    }
  });

  testInProd('component options', async function (assert) {
    assert.expect(1);

    const start = Date.now();

    await render(hbs`
      <SelectBox as |sb|>
        {{#each this.items as |item|}}
          <sb.Option @value={{item}}>{{item}}</sb.Option>
        {{/each}}
      </SelectBox>
    `);

    const end = Date.now() - start;

    assert.ok(end < 800, `${end}ms too slow`);
  });

  testInProd('non-component options', async function (assert) {
    assert.expect(1);

    const start1 = Date.now();

    await render(hbs`
      <SelectBox>
        {{#each this.items as |item|}}
          <option value={{item}}>{{item}}</option>
        {{/each}}
      </SelectBox>
    `);

    const end1 = Date.now() - start1;

    const start2 = Date.now();

    await render(hbs`
      <SelectBox as |sb|>
        {{#each this.items as |item|}}
          <sb.Option @value={{item}}>{{item}}</sb.Option>
        {{/each}}
      </SelectBox>
    `);

    const end2 = Date.now() - start2;

    assert.ok(end1 < end2, 'renders faster with non-component options');
  });
});
