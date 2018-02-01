import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/input}}`);

    assert.equal(this.$('input.select-box-input').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/input class-prefix="foo"}}`);

    assert.equal(this.$('.foo-input').length, 1,
      'can override the class prefix');
  });

  test('type', async function(assert) {
    assert.expect(2);

    await render(hbs `{{select-box/input}}`);

    assert.ok(!this.$('.select-box-input').attr('type'),
      'select box inputs are not search boxes by default due to unwanted ' +
      'behaviour when you press escape');

    await render(hbs `{{select-box/input type="email"}}`);

    assert.equal(this.$('.select-box-input').attr('type'), 'email',
      'can change the type of the select box input');
  });

  test('value', async function(assert) {
    assert.expect(3);

    this.set('myObj', { value: 'foo' });

    await render(hbs `{{select-box/input value=myObj.value}}`);

    const $input = this.$('.select-box-input');

    assert.equal($input.val(), 'foo',
      'can specify the initial value');

    this.set('myObj.value', 'bar');

    assert.equal($input.val(), 'bar',
      'updating the value updates the text box value');

    $input.val('baz').trigger('input').trigger('change');

    assert.equal(this.get('myObj.value'), 'bar',
      'changing the input value does not mutate the value attribute');
  });

  test('inputting', async function(assert) {
    assert.expect(2);

    this.set('inputText', (value, sb) => {
      assert.equal(value, 'foo',
        'inputting text sends an action with the value');

      assert.ok(typeof sb === 'object',
        'sends the api');
    });

    await render(hbs `
      {{#select-box as |sb|}}
        {{sb.input on-input=(action inputText)}}
      {{/select-box}}
    `);

    this.$('.select-box-input').val('foo').trigger('input');
  });

  test('on-clear action', async function(assert) {
    assert.expect(1);

    this.set('cleared', sb => {
      assert.ok(typeof sb === 'object',
        'clearing the input value sends an action with the select box api');
    });

    await render(hbs `
      {{#select-box as |sb|}}
        {{sb.input value="foo" on-clear=(action cleared)}}
      {{/select-box}}
    `);

    this.$('.select-box-input').val('').trigger('input');
  });

  test('on-delete action', async function(assert) {
    assert.expect(2);

    let count = 0;

    this.set('deleted', sb => {
      count++;

      assert.ok(typeof sb === 'object',
        'the on-delete action receives select box api');
    });

    await render(hbs `
      {{#select-box as |sb|}}
        {{sb.input value="f" on-delete=(action deleted)}}
      {{/select-box}}
    `);

    const input = this.$('.select-box-input').get(0);

    input.value = 'x';

    await triggerKeyEvent(input, 'keydown', 8);

    input.value = '';

    await triggerKeyEvent(input, 'keydown', 8);

    assert.equal(count, 1,
      'delete action is only fired when value is blank & backspace is pressed');
  });
});
