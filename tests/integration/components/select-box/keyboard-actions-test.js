import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import events from '../../../helpers/keyboard-events';
import jQuery from 'jquery';
const { keys } = Object;

moduleForComponent('', 'select-box (keyboard actions)', {
  integration: true
});


const templates = {
  backspace: hbs`{{select-box on-press-backspace=(action "ranAction")}}`,
  tab: hbs`{{select-box on-press-tab=(action "ranAction")}}`,
  enter: hbs`{{select-box on-press-enter=(action "ranAction")}}`,
  escape: hbs`{{select-box on-press-escape=(action "ranAction")}}`,
  left: hbs`{{select-box on-press-left=(action "ranAction")}}`,
  up: hbs`{{select-box on-press-up=(action "ranAction")}}`,
  right: hbs`{{select-box on-press-right=(action "ranAction")}}`,
  down: hbs`{{select-box on-press-down=(action "ranAction")}}`
};


keys(templates).forEach(key => {

  const template = templates[key];
  const actionName = `on-press-${key}`;

  test(`${actionName} action`, function(assert) {
    assert.expect(2);

    this.on('ranAction', (e, sb) => {
      assert.ok(e instanceof jQuery.Event,
        'sends the event');

      assert.ok(typeof sb === 'object',
        'sends the api');
    });

    this.render(template);

    this.$('.select-box').trigger(events[key]());
  });

});
