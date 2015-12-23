import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (toggling)', {
  integration: true
});


test('is-open class name', function(assert) {
  assert.expect(3);

  this.render(hbs `{{select-box}}`);

  let $selectBox = this.$('.select-box');

  assert.ok(!$selectBox.hasClass('is-open'),
    'a select box is closed by default');

  this.set('isOpen', true);

  this.render(hbs `{{select-box is-open=isOpen}}`);

  $selectBox = this.$('.select-box');

  assert.ok($selectBox.hasClass('is-open'),
    'the initial open state can be set');

  this.set('isOpen', false);

  assert.ok(!$selectBox.hasClass('is-open'),
    'the open state can be changed via an is-open attribute');
});

