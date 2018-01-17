import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import jQuery from 'jquery';
import promise from '../../../helpers/promises';

moduleForComponent('', 'select-box (promises)', {
  integration: true
});


test('promise value (single)', function(assert) {
  assert.expect(2);

  this.set('promise', promise('bar', null, 200));

  this.render(hbs`
    {{#select-box value=promise as |sb|}}
      {{sb.option value="foo"}}
      {{sb.option value="bar"}}
      {{sb.option value=promise}}
    {{/select-box}}
  `);

  assert.notStrictEqual(this.$('.select-box-option.is-selected').index(), 2,
    'waiting for the promise to resolve, does not match the promise');

  return wait().then(() => {
    assert.strictEqual(this.$('.select-box-option.is-selected').index(), 1,
      're-computes the selected value');
  });
});


test('promise value (multiple)', function(assert) {
  assert.expect(1);

  this.set('promises', [
    promise('foo'),
    promise('bar')
  ]);

  this.render(hbs`
    {{#select-box value=promises multiple=true as |sb|}}
      {{sb.option value="foo"}}
      {{sb.option value="bar"}}
      {{sb.option value="baz"}}
    {{/select-box}}
  `);

  return wait().then(() => {
    const labels = this.$('.select-box-option.is-selected')
      .map((i, o) => jQuery(o).text().trim())
      .toArray();

    assert.deepEqual(labels, ['foo', 'bar'],
      'resolves the promises');
  });
});


test('promise value (failure)', function(assert) {
  assert.expect(1);

  this.set('promise', promise(null, true));

  this.render(hbs`
    {{#select-box value=promise as |sb|}}
      {{sb.option value="foo"}}
      {{sb.option value="bar"}}
      {{sb.option value="baz"}}
    {{/select-box}}
  `);

  return wait().then(() => {
    assert.equal(this.$('.select-box-option.is-selected').length, 0,
      'does nothing with the value');
  });
});


test('promise option value', function(assert) {
  assert.expect(2);

  this.set('value', promise('bar', null, 200));
  this.set('foo', promise('foo', null, 200));
  this.set('bar', promise('bar', null, 200));
  this.set('baz', promise('baz', null, 200));

  this.render(hbs`
    {{#select-box value=value as |sb|}}
      {{sb.option value=foo}}
      {{sb.option value=bar}}
      {{sb.option value=baz}}
    {{/select-box}}
  `);

  return wait()
    .then(() => {
      assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
        'waits for promise to resolve before computing selected option');

      this.set('value', promise('baz'));
      return wait();
    })
    .then(() => {
      assert.equal(this.$('.select-box-option.is-selected').text(), 'baz',
        're-computation works');
    });
});


test('promise value order', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#select-box value=promise as |sb|}}
      {{sb.option value="foo"}}
      {{sb.option value="bar"}}
      {{sb.option value="baz"}}
    {{/select-box}}
  `);

  this.set('promise', promise('baz', null, 500));
  this.set('promise', promise('bar', null, 250));

  return wait().then(() => {
    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      'earlier promises are ignored');
  });
});


test('promise option value order', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#select-box value="bar" as |sb|}}
      {{sb.option value="foo"}}
      {{sb.option value=promise}}
      {{sb.option value="baz"}}
    {{/select-box}}
  `);

  this.set('promise', promise('qux', null, 500));
  this.set('promise', promise('bar', null, 250));

  return wait().then(() => {
    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      'earlier promises are ignored');
  });
});


test('promise option value (failure)', function(assert) {
  assert.expect(3);

  this.set('promise1', promise('Bar'));
  this.set('promise2', promise(null, 'Failed to resolve'));

  this.render(hbs`
    {{#select-box value="foo" as |sb|}}
      {{sb.option value=promise1 label="Foo"}}
      {{sb.option value=promise2}}
    {{/select-box}}
  `);

  return wait().then(() => {
    assert.equal(this.$('.select-box-option.is-selected').length, 0,
      'does nothing with the value');

    assert.equal(this.$('.select-box-option:eq(0)').text(), 'Foo',
      'uses label that is present');

    assert.equal(this.$('.select-box-option:eq(1)').text(), 'Failed to resolve',
      'no label present, and failed to resolve value, so display result of ' +
      'failure in place of label');
  });
});


test('weird failure', function(assert) {
  assert.expect(2);

  this.on('show', () => {
    promise(true, null, 100).then(() => this.set('showSelect', true));
  });

  this.render(hbs`
    {{#if showSelect}}
      {{#select-box on-select=(action (mut selectedValue)) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    {{/if}}
    <button onclick={{action "show"}}></button>
  `);

  this.$('button').trigger('click');

  return wait()
    .then(() => {
      this.$('.select-box-option:contains("baz")').trigger('click');
      return wait();
    }).then(() => {
      assert.equal(this.get('selectedValue'), 'baz');
      assert.equal(this.$('.select-box-option.is-selected').text(), 'baz');
    });
});
