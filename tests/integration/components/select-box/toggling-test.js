import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (toggling)', {
  integration: true
});


test('opening an closing', function(assert) {
  assert.expect(8);

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

  this.render(hbs `
    {{#select-box as |sb|}}
      <span>Open: {{sb.isOpen}}</span>
      <button onclick={{action sb.open}}></button>
    {{/select-box}}
  `);

  assert.ok(this.$('span').text().match(/Open: false/),
    'yields the open state when closed');

  this.$('button').trigger('click');

  assert.ok(this.$('span').text().match(/Open: true/),
    'yields the open state when open');
});


test('open action', function(assert) {
  assert.expect(1);

  let opened;
  this.on('opened', () => opened = true);

  this.render(hbs `
    {{#select-box on-open=(action "opened") as |sb|}}
      <button onclick={{action sb.open}}>open</button>
    {{/select-box}}
  `);

  this.$('button:contains("open")').trigger('click');

  assert.strictEqual(opened, true,
    'sends an action when the select box is opened');
});


test('close action', function(assert) {
  assert.expect(1);

  let closed;
  this.on('closed', () => closed = true);

  this.render(hbs `
    {{#select-box on-close=(action "closed") as |sb|}}
      <button onclick={{action sb.close}}>close</button>
    {{/select-box}}
  `);

  this.$('button:contains("close")').trigger('click');

  assert.strictEqual(closed, true,
    'sends an action when the select box is opened');
});
