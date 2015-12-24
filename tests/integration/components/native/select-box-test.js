import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box/native', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native}}`);

  assert.equal(this.$('select.select-box').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/native class-prefix='foo'}}`);

  assert.equal(this.$('.foo').length, 1,
    'can add a class prefix');

  this.render(hbs `
    {{#select-box/native class-prefix='foo' as |sb|}}
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


test('aria', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native aria-label='Something'}}`);

  assert.equal(this.$('.select-box').attr('aria-label'), 'Something',
    'setting the aria label works');
});


test('disabling', function(assert) {
  assert.expect(3);

  this.render(hbs `{{select-box/native}}`);

  assert.ok(this.$('.select-box').not(':disabled'),
    'enabled by default');

  this.set('isDisabled', true);

  this.render(hbs `{{select-box/native disabled=isDisabled}}`);

  assert.ok(this.$('.select-box').is(':disabled'),
    'can be disabled');

  this.set('isDisabled', false);

  assert.ok(this.$('.select-box').not(':disabled'),
    'can be re-enabled');
});


test('tabindex', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/native}}`);

  assert.strictEqual(this.$('.select-box').attr('tabindex'), undefined,
    'default tabindex');

  this.render(hbs `{{select-box/native tabindex=5}}`);

  assert.strictEqual(this.$('.select-box').attr('tabindex'), '5',
    'can specify a tabindex attribute');
});


test('size', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/native}}`);

  assert.strictEqual(this.$('.select-box').attr('size'), undefined,
    'default size');

  this.render(hbs `{{select-box/native size=2}}`);

  assert.strictEqual(this.$('.select-box').attr('size'), '2',
    'can specify a size attribute');
});


test('changing the selected value', function(assert) {
  assert.expect(3);

  this.set('selectedValue', 'foo');

  this.render(hbs`
    {{#select-box/native value=selectedValue as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
    {{/select-box/native}}
  `);

  let $foo = this.$(".select-box-option[value='foo']");
  let $bar = this.$(".select-box-option[value='bar']");

  assert.ok($foo.is(':selected') && !$bar.is(':selected'),
    'the option with the matching value is selected initially');

  this.set('selectedValue', 'bar');

  assert.ok(!$foo.is(':selected') && $bar.is(':selected'),
    'changing the value causes the options to re-compute which is selected');

  this.set('selectedValue', null);

  assert.ok($foo.is(':selected') && !$bar.is(':selected'),
    "setting no value results in the first option being selected");
});


test('change event selects an option', function(assert) {
  assert.expect(3);

  this.set('initialSelectedValue', null);
  this.set('selectedValue', null);

  this.on('selected', (value) => {
    this.set('selectedValue', value);
  });

  this.render(hbs`
    {{#select-box/native
      value=initialSelectedValue
      on-select=(action 'selected') as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
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


test('usage with mut helper', function(assert) {
  assert.expect(1);

  this.set('selectedValue', 'bar');

  this.render(hbs`
    {{#select-box/native
      value=selectedValue
      on-select=(action (mut selectedValue)) as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box/native}}
  `);

  this.$('.select-box').val('foo').trigger('change');

  assert.equal(this.get('selectedValue'), 'foo',
    'can be used with the mut helper');
});


test('multiple selection', function(assert) {
  assert.expect(2);

  this.on('selected', (value) => {
    assert.deepEqual(value, ['foo', 'bar'],
      'sends an action with the values of the selected options');
  });

  this.render(hbs`
    {{#select-box/native multiple=true on-select=(action 'selected') as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box/native}}
  `);

  this.$('.select-box').val(['foo', 'bar']).trigger('change');

  assert.deepEqual(this.$('.select-box').val(), ['foo', 'bar'],
    'the select box reports that the expected options are selected');
});


test('selecting non primitives', function(assert) {
  assert.expect(1);

  this.set('foo', ['foo']);
  this.set('bar', { bar: 'baz' });

  this.on('selected', (value) => {
    assert.deepEqual(value, [['foo'], { bar: 'baz' }],
      'can select options with non primitive values');
  });

  this.render(hbs`
    {{#select-box/native multiple=true on-select=(action 'selected') as |sb|}}
      {{sb.option value=foo}}
      {{sb.option value=bar}}
    {{/select-box/native}}
  `);

  this.$('.select-box-option').prop('selected', true);
  this.$('.select-box').trigger('change');
});


test('options with no label', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#select-box/native as |sb|}}
      {{#sb.option value='foo' as |o|}}
        {{~o.label~}}
      {{/sb.option}}
    {{/select-box/native}}
  `);

  assert.equal(this.$('.select-box-option:eq(0)').text(), 'foo',
    "a native select box option's label defaults to it's value");
});




