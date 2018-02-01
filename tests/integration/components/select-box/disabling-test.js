import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (disabling)', function(hooks) {
  setupRenderingTest(hooks);

  test('disabling and enabling', async function(assert) {
    assert.expect(4);

    const isDisabled = () => {
      return this.$('.select-box').hasClass('is-disabled');
    };

    await render(hbs `{{select-box}}`);

    assert.ok(!isDisabled(),
      'enabled by default');

    this.set('isDisabled', true);

    await render(hbs `{{select-box disabled=isDisabled}}`);

    assert.ok(isDisabled(),
      'can set the disabled state, adding a class name');

    this.set('isDisabled', false);

    assert.ok(!isDisabled(),
      'can change the disabled state, removing the class name');

    await render(hbs `
      {{#select-box disabled=true as |sb|}}
        {{sb.input}}
      {{/select-box}}
    `);

    assert.ok(this.$('.select-box-input').is(':disabled'),
      "a select box's input element is disabled if the select box is disabled");
  });

  test('aria disabled', async function(assert) {
    assert.expect(2);

    this.set('disabled', true);

    await render(hbs `{{select-box disabled=disabled}}`);

    assert.ok(this.$('.select-box').get(0).hasAttribute('aria-disabled'),
      'receives an aria disabled attribute when disabled');

    this.set('disabled', false);

    assert.ok(!this.$('.select-box').get(0).hasAttribute('aria-disabled'),
      'aria disabled attribute is removed when enabled');
  });
});
