import { module, test } from 'qunit';
import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('performance', function (hooks) {
  setupRenderingTest(hooks);

  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Option ${i}`
  }));

  hooks.beforeEach(function () {
    this.startTimer = () => (this.startTime = performance.now());
    this.stopTimer = () => (this.stopTime = performance.now());
    this.timeTaken = () => this.stopTime - this.startTime;
  });

  test('rendering options', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Trigger>
              {{if sb.value sb.value.name "None"}}
            </sb.Trigger>
            {{#if dd.isOpen}}
              <sb.Content>
                <sb.Options>
                  {{#each data as |value|}}
                    <sb.Option @value={{value}}>
                      {{value.name}}
                    </sb.Option>
                  {{/each}}
                </sb.Options>
              </sb.Content>
            {{/if}}
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').doesNotExist();

    this.startTimer();

    await click('.select-box .dropdown__trigger');

    this.stopTimer();

    assert.dom('.select-box__option').exists({ count: 10000 });

    assert.ok(
      this.timeTaken() < 1500,
      `Expected < 1500ms, got ${this.timeTaken().toFixed(0)}ms`
    );
  });
});
