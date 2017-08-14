import { test, moduleForComponent } from 'ember-qunit';


moduleForComponent('select-box/input', 'select-box (input)', {
  unit: true
});


test('input attribute bindings', function(assert) {
  assert.expect(1);

  const input = this.subject();

  assert.deepEqual([...input.get('attributeBindings')].sort(), [
    'accept',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'autosave',
    'dir',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'inputmode',
    'lang',
    'list',
    'max',
    'maxlength',
    'min',
    'minlength',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'selectionDirection',
    'size',
    'spellcheck',
    'step',
    'tabindex',
    'title',
    'type',
    'value',
    'width'
  ], 'has same attribute bindings as Ember.TextField');
});
