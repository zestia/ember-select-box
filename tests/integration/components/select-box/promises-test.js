import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import RSVP from 'rsvp';
import wait from 'ember-test-helpers/wait';
import jQuery from 'jquery';
import { later } from 'ember-runloop';


moduleForComponent('', 'select-box (promises)', {
  integration: true
});


test('promise values (single)', function(assert) {
  assert.expect(2);

  this.set('promise', new RSVP.Promise(resolve => {
    later(() => {
      resolve('bar');
    }, 200);
  }));

  this.render(hbs`
    {{#select-box value=promise as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
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


test('promise values (multiple)', function(assert) {
  assert.expect(1);

  this.set('promises', [
    RSVP.resolve('foo'),
    RSVP.resolve('bar')
  ]);

  this.render(hbs`
    {{#select-box value=promises multiple=true as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
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


test('promise order', function(assert) {
  assert.expect(1);

  const slowPromise = new RSVP.Promise(resolve => {
    later(() => {
      resolve('baz');
    }, 500);
  });

  const fastPromise = new RSVP.Promise(resolve => {
    later(() => {
      resolve('bar');
    }, 250);
  });

  this.render(hbs`
    {{#select-box value=value as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box}}
  `);

  this.set('value', slowPromise);
  this.set('value', fastPromise);

  return wait().then(() => {
    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      'earlier promises are ignored');
  });
});


test('weird failure', function(assert) {
  assert.expect(2);

  let selectedValue;

  this.on('show', () => {
    new RSVP.Promise(resolve => {
      later(resolve, 100);
    }).then(() => this.set('showSelect', true));
  });

  this.on('select', value => {
    selectedValue = value;
  });

  this.render(hbs`
    {{#if showSelect}}
      {{#select-box on-select=(action 'select') as |sb|}}
        {{sb.option value='foo'}}
        {{sb.option value='bar'}}
        {{sb.option value='baz'}}
      {{/select-box}}
    {{/if}}
    <button onclick={{action 'show'}}></button>
  `);

  this.$('button').trigger('click');

  return wait()
    .then(() => {
      this.$('.select-box-option:contains("baz")').trigger('click');
      return wait();
    }).then(() => {
      assert.equal(selectedValue, 'baz');
      assert.equal(this.$('.select-box-option.is-selected').text(), 'baz');
    });
});
