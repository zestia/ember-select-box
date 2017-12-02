import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { A as emberA } from '@ember/array';
import wait from 'ember-test-helpers/wait';


moduleForComponent('', 'select-box (speed)', {
  integration: true,

  beforeEach() {
    this.set('items', emberA());

    for (let i = 0; i <= 1000; i++) {
      this.get('items').pushObject(`Item ${i}`);
    }
  }
});



test('non-component options', function(assert) {
  assert.expect(1);

  const start1 = Date.now();
  let start2;
  let end1, end2;

  this.render(hbs`
    {{#select-box as |sb|}}
      {{#each items as |item|}}
        <option value={{item}}>{{item}}</option>
      {{/each}}
    {{/select-box}}
  `);

  return wait().then(() => {
    end1 = Date.now() - start1;
    start2 = Date.now();

    this.render(hbs`
      {{#select-box as |sb|}}
        {{#each items as |item|}}
          {{#sb.option value=item}}{{item}}{{/sb.option}}
        {{/each}}
      {{/select-box}}
    `);

    return wait();
  }).then(() => {
    end2 = Date.now() - start2;
  }).then(() => {
    assert.ok(end1 < end2,
      'renders faster with non-component options');
  });
});
