import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tag-select2', 'Integration | Component | tag select2', {
  integration: true
});

const DEFAULT_OPTIONS = [{
  label: 'foo',
}, {
  label: 'bar',
}, {
  label: 'baz',
}];

test('de-selected options return to the right place', function(assert) {
  // const cursorUp = Ember.$.Event('keydown', {keyCode: 38, which: 38});
  const cursorDown = Ember.$.Event('keydown', {keyCode: 40, which: 40});
  const mouseEnter = Ember.$.Event('mouseenter');

  this.set('options', DEFAULT_OPTIONS);
  this.render(hbs`{{tag-select2 options=options}}`);

  this.$('.tag-select2').click();
  assert.equal(this.$('.tag-select2__option').length, 3, `
    the dropdown is opened and all options are displayed
  `);

  this.$('.tag-select2__option:first-child').click();
  assert.equal(this.$('.tag-select2__option').length, 2, `
    the last option is added as a selected tag
    and is removed from the options dropdown
  `);

  this.$('.tag-select2__close').click();
  assert.equal(this.$('.tag-select2__option').length, 3, `
    the selected tag was deselected and returns to the options list
  `);

  this.$('.tag-select2__option:first-child').trigger(mouseEnter);
  assert.ok(this.$('.tag-select2__option.is-active').text(), 'foo', `
    the first option becomes active when we hover over it
  `);

  this.$('.tag-select2__esb').trigger(cursorDown);
  assert.equal(this.$('.tag-select2__option.is-active').text(), 'baz', `
    pressing down activates the second option
  `);

  this.$('.tag-select2__esb').trigger(cursorDown);
  assert.equal(this.$('.tag-select2__option.is-active').text(), 'baz', `
    pressing down again activates the last option
  `);

  this.$('.tag-select2__esb').trigger(cursorDown);
  assert.equal(this.$('.tag-select2__option.is-active').text(), 'baz', `
    pressing down when the last option is active
    does not change which option is active
  `);

  // this.$('.tag-select2__esb').trigger(cursorUp);
});
