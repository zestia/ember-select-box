import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box (promises)', function(hooks) {
  setupRenderingTest(hooks);

  test('promise value (single)', async function(assert) {
    assert.expect(6);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise1', deferred1.promise);
    this.set('promise2', deferred2.promise);

    await render(hbs`
      {{#select-box value=promise2 as |sb|}}
        {{sb.option value=promise1}}
        {{sb.option value="bar"}}
        {{sb.option value=promise2}}
      {{/select-box}}
    `);

    assert.ok(!this.$('.select-box-option:eq(0)').hasClass('is-selected'),
      'other promise, not selected');

    assert.ok(!this.$('.select-box-option:eq(1)').hasClass('is-selected'),
      'value is not selected, promise has not yet resolved');

    assert.ok(this.$('.select-box-option:eq(2)').hasClass('is-selected'),
      'value is selected, promises match');

    deferred1.resolve('foo');
    deferred2.resolve('bar');


    return settled().then(() => {
      assert.ok(!this.$('.select-box-option:eq(0)').hasClass('is-selected'),
        'wrong promise, not selected');

      assert.ok(this.$('.select-box-option:eq(1)').hasClass('is-selected'),
        'value is selected now that promise has resolved');

      assert.ok(this.$('.select-box-option:eq(2)').hasClass('is-selected'),
        'resolved value is selected');
    });
  });

  test('promise value (multiple)', async function(assert) {
    assert.expect(1);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promises', [
      deferred1.promise,
      deferred2.promise
    ]);

    await render(hbs`
      {{#select-box value=promises multiple=true as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    deferred1.resolve('foo');
    deferred2.resolve('bar');

    return settled().then(() => {
      const labels = this.$('.select-box-option.is-selected')
        .map((i, o) => o.textContent.trim())
        .toArray();

      assert.deepEqual(labels, ['foo', 'bar'],
        'resolves the promises');
    });
  });

  test('promise value (failure)', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('promise', deferred.promise);

    await render(hbs`
      {{#select-box value=promise as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    deferred.reject();

    return settled().then(() => {
      assert.equal(this.$('.select-box-option.is-selected').length, 0,
        'does nothing with the value');
    });
  });

  test('promise option value', async function(assert) {
    assert.expect(2);

    const deferred1 = defer();
    const deferred2 = defer();
    const deferred3 = defer();
    const deferred4 = defer();

    this.set('value', deferred1.promise);
    this.set('foo', deferred2.promise);
    this.set('bar', deferred3.promise);
    this.set('baz', deferred4.promise);

    await render(hbs`
      {{#select-box value=value as |sb|}}
        {{sb.option value=foo}}
        {{sb.option value=bar}}
        {{sb.option value=baz}}
      {{/select-box}}
    `);

    deferred1.resolve('bar');
    deferred2.resolve('foo');
    deferred3.resolve('bar');
    deferred4.resolve('baz');

    return settled()
      .then(() => {
        assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
          'waits for promise to resolve before computing selected option');

        this.set('value', deferred4.promise);
        return settled();
      })
      .then(() => {
        assert.equal(this.$('.select-box-option.is-selected').text(), 'baz',
          're-computation works');
      });
  });

  test('promise value order', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#select-box value=promise as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);
    this.set('promise', deferred2.promise);

    deferred2.resolve('bar');
    deferred1.resolve('baz');

    return settled().then(() => {
      assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
        'earlier promises are ignored');
    });
  });

  test('promise option value order', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#select-box value="bar" as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value=promise}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);
    this.set('promise', deferred2.promise);

    deferred2.resolve('bar');
    deferred1.resolve('qux');

    return settled().then(() => {
      assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
        'earlier promises are ignored');
    });
  });

  test('promise option value (failure)', async function(assert) {
    assert.expect(2);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise1', deferred1.promise);
    this.set('promise2', deferred2.promise);

    await render(hbs`
      {{#select-box as |sb|}}
        {{sb.option value=promise1 label="Foo"}}
        {{sb.option value=promise2}}
      {{/select-box}}
    `);

    deferred1.reject('Foo*');
    deferred2.reject('Failed to resolve');

    return settled().then(() => {
      assert.equal(this.$('.select-box-option:eq(0)').text(), 'Foo',
        'uses label that is present');

      assert.equal(this.$('.select-box-option:eq(1)').text(), 'Failed to resolve',
        'no label present, and failed to resolve value, so display result of ' +
        'failure in place of label');
    });
  });

  test('weird failure', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('show', () => {
      deferred.promise.then(() => this.set('showSelect', true));
    });

    await render(hbs`
      {{#if showSelect}}
        {{#select-box on-select=(action (mut selectedValue)) as |sb|}}
          {{sb.option value="foo"}}
          {{sb.option value="bar"}}
          {{sb.option value="baz"}}
        {{/select-box}}
      {{/if}}
      <button onclick={{action show}}></button>
    `);

    this.$('button').trigger('click');

    deferred.resolve();

    return settled()
      .then(() => {
        this.$('.select-box-option:contains("baz")').trigger('click');
        return settled();
      }).then(() => {
        assert.equal(this.get('selectedValue'), 'baz');
        assert.equal(this.$('.select-box-option.is-selected').text(), 'baz');
      });
  });
});
