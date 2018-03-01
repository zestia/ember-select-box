import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

module('select-box/native', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native}}`);

    assert.equal(this.$('select.select-box').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(2);

    await render(hbs `{{select-box/native class-prefix="foo"}}`);

    assert.equal(this.$('.foo').length, 1,
      'can override the class prefix');

    await render(hbs `
      {{#select-box/native class-prefix="foo" as |sb|}}
        {{#sb.group}}
          {{sb.option}}
        {{/sb.group}}
      {{/select-box/native}}
    `);

    assert.ok(
      this.$('.foo-group').length === 1 &&
      this.$('.foo-option').length === 1,
      'class prefix trickles down to children'
    );
  });

  test('name', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native name="foo"}}`);

    assert.equal(this.$('.select-box').attr('name'), 'foo',
      'can set a name attribute');
  });

  test('title', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native title="foo"}}`);

    assert.equal(this.$('.select-box').attr('title'), 'foo',
      'can set a title attribute');
  });

  test('aria label', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native aria-label="Something"}}`);

    assert.equal(this.$('.select-box').attr('aria-label'), 'Something',
      'setting the aria label works');
  });

  test('autofocus', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native autofocus=true}}`);

    assert.equal(this.$('.select-box').prop('autofocus'), true,
      'can autofocus a native select box');
  });

  test('required', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native required=true}}`);

    assert.equal(this.$('.select-box').prop('required'), true,
      'can set the required attribute');
  });

  test('disabling', async function(assert) {
    assert.expect(3);

    await render(hbs `{{select-box/native}}`);

    assert.ok(this.$('.select-box').not(':disabled'),
      'enabled by default');

    this.set('isDisabled', true);

    await render(hbs `{{select-box/native disabled=isDisabled}}`);

    assert.ok(this.$('.select-box').is(':disabled'),
      'can be disabled');

    this.set('isDisabled', false);

    assert.ok(this.$('.select-box').not(':disabled'),
      'can be re-enabled');
  });

  test('tabindex', async function(assert) {
    assert.expect(2);

    await render(hbs `{{select-box/native}}`);

    assert.strictEqual(this.$('.select-box').attr('tabindex'), undefined,
      'default tabindex');

    await render(hbs `{{select-box/native tabindex=5}}`);

    assert.strictEqual(this.$('.select-box').attr('tabindex'), '5',
      'can specify a tabindex attribute');
  });

  test('size', async function(assert) {
    assert.expect(2);

    await render(hbs `{{select-box/native}}`);

    assert.strictEqual(this.$('.select-box').attr('size'), undefined,
      'default size');

    await render(hbs `{{select-box/native size=2}}`);

    assert.strictEqual(this.$('.select-box').attr('size'), '2',
      'can specify a size attribute');
  });

  test('changing the selected value', async function(assert) {
    assert.expect(3);

    this.set('selectedValue', 'foo');

    await render(hbs`
      {{#select-box/native value=selectedValue as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box/native}}
    `);

    const $foo = this.$('.select-box-option[value="foo"]');
    const $bar = this.$('.select-box-option[value="bar"]');

    assert.ok($foo.is(':selected') && $bar.not(':selected'),
      'the option with the matching value is selected initially');

    this.set('selectedValue', 'bar');

    assert.ok($foo.not(':selected') && $bar.is(':selected'),
      'changing the value causes the options to re-compute which is selected');

    this.set('selectedValue', null);

    assert.ok($foo.is(':selected') && $bar.not(':selected'),
      'setting no value results in the first option being selected');
  });

  test('change event selects an option', async function(assert) {
    assert.expect(3);

    this.set('initialSelectedValue', null);
    this.set('selectedValue', null);

    this.set('selected', value => {
      this.set('selectedValue', value);
    });

    await render(hbs`
      {{#select-box/native
        value=initialSelectedValue
        on-select=(action selected) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box/native}}
    `);

    this.$('.select-box').val('bar').trigger('change');

    assert.strictEqual(this.get('initialSelectedValue'), null,
      'does not mutate the initial selected value');

    assert.equal(this.get('selectedValue'), 'bar',
      'sends an action with the selected value');

    assert.ok(this.$('.select-box-option:eq(1)').is(':selected'),
      'renders the correct selected option');
  });

  test('usage with mut helper', async function(assert) {
    assert.expect(1);

    this.set('selectedValue', 'bar');

    await render(hbs`
      {{#select-box/native
        value=selectedValue
        on-select=(action (mut selectedValue)) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box/native}}
    `);

    this.$('.select-box').val('foo').trigger('change');

    assert.equal(this.get('selectedValue'), 'foo',
      'can be used with the mut helper');
  });

  test('usage with unbound helper', async function(assert) {
    assert.expect(1);

    this.set('selectedValue', 'foo');

    await render(hbs`
      {{#select-box/native value=(unbound selectedValue) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box/native}}
    `);

    this.set('selectedValue', 'bar');

    assert.equal(this.$('.select-box').val(), 'foo',
      'value should not change');
  });

  test('multiple selection', async function(assert) {
    assert.expect(2);

    this.set('selected', value => {
      assert.deepEqual(value, ['foo', 'bar'],
        'sends an action with the values of the selected options');
    });

    await render(hbs`
      {{#select-box/native multiple=true on-select=(action selected) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box/native}}
    `);

    this.$('.select-box').val(['foo', 'bar']).trigger('change');

    assert.deepEqual(this.$('.select-box').val(), ['foo', 'bar'],
      'the select box reports that the expected options are selected');
  });

  test('selecting non primitives', async function(assert) {
    assert.expect(1);

    this.set('foo', ['foo']);
    this.set('bar', { bar: 'baz' });

    this.set('selected', value => {
      assert.deepEqual(value, [['foo'], { bar: 'baz' }],
        'can select options with non primitive values');
    });

    await render(hbs`
      {{#select-box/native multiple=true on-select=(action selected) as |sb|}}
        {{sb.option value=foo}}
        {{sb.option value=bar}}
      {{/select-box/native}}
    `);

    this.$('.select-box-option').prop('selected', true);
    this.$('.select-box').trigger('change');
  });

  test('options with no label', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#select-box/native as |sb|}}
        {{#sb.option value="foo" as |o|}}
          {{~o.label~}}
        {{/sb.option}}
      {{/select-box/native}}
    `);

    assert.equal(this.$('.select-box-option:eq(0)').text(), 'foo',
      "a native select box option's label defaults to it's value");
  });

  test('manual selection (initial value)', async function(assert) {
    assert.expect(1);

    this.set('barSelected', true);

    await render(hbs`
      {{#select-box/native value="baz" as |sb|}}
        {{sb.option value="foo" selected=false}}
        {{sb.option value="bar" selected=true}}
        {{sb.option value="baz" selected=false}}
      {{/select-box/native}}
    `);

    assert.equal(this.$('.select-box').val(), 'bar',
      'manually selected values take priority over the initial value');
  });

  test('manual selection (multiple values)', async function(assert) {
    assert.expect(2);

    this.set('barSelected', true);

    await render(hbs`
      {{#select-box/native multiple=true as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar" selected=barSelected}}
        {{sb.option value="baz" selected=bazSelected}}
      {{/select-box/native}}
    `);

    assert.deepEqual(this.$('.select-box').val(), ['bar'],
      'can manually specify a selected value');

    this.set('bazSelected', true);

    assert.deepEqual(this.$('.select-box').val(), ['bar', 'baz'],
      'can manually select multiple values');
  });

  test('non-component options (single)', async function(assert) {
    assert.expect(2);

    this.set('nonPrimitive', { id: 456 });
    this.set('primitive', 123);

    this.set('selected', value => {
      assert.strictEqual(value, '123',
        'can select primitive values');
    });

    await render(hbs`
      {{#select-box/native on-select=(action selected) as |sb|}}
        <option value={{nonPrimitive}}>Primitive</option>
        <option value={{primitive}}>Primitive</option>
      {{/select-box/native}}
    `);

    assert.equal(this.$('option:eq(0)').attr('value'), '[object Object]',
      'non primitive values are stringified');

    this.$('.select-box').val('123').trigger('change');
  });

  test('non-component options (multiple)', async function(assert) {
    assert.expect(1);

    this.set('selected', values => {
      assert.deepEqual(values, ['Hello', 'World'],
        'can select multiple values from non-component options');
    });

    await render(hbs`
      {{#select-box/native multiple=true on-select=(action selected) as |sb|}}
        <option value="Hello"></option>
        <option value="World"></option>
      {{/select-box/native}}
    `);

    this.$('.select-box').val(['Hello', 'World']).trigger('change');
  });

  test('non-component options (mixed)', async function(assert) {
    assert.expect(1);

    this.set('selected', values => {
      assert.deepEqual(values, ['foo'],
        'non-component options are ignored if option components are registered');
    });

    await render(hbs`
      {{#select-box/native multiple=true on-select=(action selected) as |sb|}}
        {{sb.option value="foo"}}
        <option value="bar"></option>
      {{/select-box/native}}
    `);

    this.$('.select-box').val(['foo', 'bar']).trigger('change');
  });

  test('initial update action', async function(assert) {
    assert.expect(1);

    const layout = hbs`
      <div class="foo-select-display-label">
        {{displayLabel}}
      </div>
      {{#select-box/native
        value=value
        on-update=(action "updateDisplayLabel") as |sb|}}
        {{yield sb}}
      {{/select-box/native}}
    `;

    const FooSelectBox = Component.extend({
      layout,
      actions: {
        updateDisplayLabel() {
          this.set('displayLabel', this.$('option:selected').text());
        }
      }
    });

    this.owner.register('component:select-box/foo', FooSelectBox);

    await render(hbs`
      {{#select-box/foo value="bar" as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box/foo}}
    `);

    assert.equal(this.$('.foo-select-display-label').text().trim(), 'bar',
      'regression test: the update action is fired after all options have rendered');
  });

  test('customising selection', async function(assert) {
    assert.expect(1);

    let count = 0;

    this.set('buildSelection', () => count++);

    await render(hbs`
      {{#select-box/native on-build-selection=(action buildSelection) as |sb|}}
        {{sb.option value="foo"}}
      {{/select-box/native}}
    `);

    this.$('.select-box').val('foo').trigger('change');

    assert.equal(count, 0,
      'on-build-selection does not fire on native select components');
  });
});
