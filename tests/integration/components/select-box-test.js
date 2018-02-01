import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box}}`);

    assert.equal(this.$('div.select-box').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix attr', async function(assert) {
    assert.expect(9);

    await render(hbs `
      {{#select-box class-prefix="foo" as |sb|}}
        {{sb.input}}
        {{#sb.selected-options}}
          {{sb.selected-option}}
        {{/sb.selected-options}}
        {{#sb.options}}
          {{#sb.group}}
            {{sb.option}}
          {{/sb.group}}
        {{/sb.options}}
      {{/select-box}}
    `);

    assert.equal(this.$('.foo').length, 1);
    assert.equal(this.$('.foo-input').length, 1);
    assert.equal(this.$('.foo-options').length, 1);
    assert.equal(this.$('.foo-selected-options').length, 1);
    assert.equal(this.$('.foo-group').length, 1);
    assert.equal(this.$('.foo-group-label').length, 1);
    assert.equal(this.$('.foo-group-options').length, 1);
    assert.equal(this.$('.foo-option').length, 1);
    assert.equal(this.$('.foo-selected-option').length, 1);
  });

  test('extending with class prefix', async function(assert) {
    assert.expect(1);

    const FooSelectBox = SelectBox.extend({
      classNamePrefix: 'foo'
    });

    this.owner.register('component:select-box/foo', FooSelectBox);

    await render(hbs `{{select-box/foo}}`);

    assert.ok(this.$('.foo').length, 1,
      'can set the class name prefix to create custom select boxes');
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box}}`);

    assert.equal(this.$('.select-box').attr('role'), 'listbox',
      'a select box has an appropriate aria role');
  });

  test('multiple class', async function(assert) {
    assert.expect(2);

    await render(hbs `{{select-box}}`);

    assert.ok(!this.$('.select-box').hasClass('is-multiple'),
      'no multiple class');

    await render(hbs `{{select-box multiple=true}}`);

    assert.ok(this.$('.select-box').hasClass('is-multiple'),
      'has multiple class');
  });

  test('initial update action', async function(assert) {
    assert.expect(1);

    this.set('updated', value => {
      assert.strictEqual(value, undefined,
        'fires an initial update action with the selected value');
    });

    await render(hbs `{{select-box on-update=(action updated)}}`);
  });

  test('subsequent update actions', async function(assert) {
    assert.expect(1);

    let count = 0;

    this.set('selectedValue', 'foo');

    this.set('updated', value => {
      count++;
      if (count === 2) {
        assert.strictEqual(value, 'bar',
          'fires an update action when the value changes');
      }
    });

    await render(hbs `
      {{select-box
        value=selectedValue
        on-update=(action updated)}}
    `);

    this.set('selectedValue', 'bar');
  });

  test('update action', async function(assert) {
    assert.expect(1);

    let count = 0;

    this.set('updated', () => {
      count++;
    });

    await render(hbs `
      {{select-box
        disabled=isDisabled
        on-update=(action updated)}}
    `);

    this.set('isDisabled', true);

    assert.equal(count, 1,
      'updating attributes other than the `value` ' +
      'should not fire update action');
  });

  test('init action', async function(assert) {
    assert.expect(2);

    let api;

    this.set('initialised', sb => api = sb);

    await render(hbs `{{select-box on-init=(action initialised)}}`);

    assert.ok(!this.$('.select-box').hasClass('is-open'),
      'precondition, not open');

    api.open();

    assert.ok(this.$('.select-box').hasClass('is-open'),
      'action is called with the api');
  });
});
