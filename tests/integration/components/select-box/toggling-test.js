import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (toggling)', {
  integration: true
});


test('opening an closing', function(assert) {
  assert.expect(6);

  this.render(hbs `{{select-box}}`);

  let $selectBox = this.$('.select-box');

  assert.ok(!$selectBox.hasClass('is-open'),
    'a select box is closed by default');

  assert.ok(!$selectBox.get(0).hasAttribute('aria-expanded'),
    'not expanded by default');

  this.set('isOpen', true);

  this.render(hbs `{{select-box is-open=isOpen}}`);

  $selectBox = this.$('.select-box');

  assert.ok($selectBox.hasClass('is-open'),
    'the initial open state can be set');

  assert.ok($selectBox.get(0).hasAttribute('aria-expanded'),
    'receives an aria-expanded attribute when open');

  this.set('isOpen', false);

  assert.ok(!$selectBox.hasClass('is-open'),
    'the open state can be changed via an is-open attribute');

  assert.ok(!$selectBox.get(0).hasAttribute('aria-expanded'),
    'open state is reflected as aria expanded attribute');
});

