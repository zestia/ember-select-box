import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (clicking outside)', {
  integration: true
});


test('clicking outside', function(assert) {
  assert.expect(3);

  let count = 0;

  this.on('clickedOutside', () => {
    count++;
  });

  this.render(hbs `
    <div class='outside'></div>
    {{#select-box on-click-outside=(action 'clickedOutside')}}
      <div class='inside'></div>
    {{/select-box}}
  `);

  this.$('.select-box').trigger('click');

  assert.equal(count, 0,
    'clicking the select box is not outside');

  this.$('.inside').trigger('click');

  assert.equal(count, 0,
    'clicking inside the select box is not outside');

  this.$('.outside').trigger('click');

  assert.equal(count, 1,
    'clicking outside the select box is outside');
});
