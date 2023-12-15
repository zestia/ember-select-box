import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, find, triggerEvent } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (in-element)', function (hooks) {
  setupRenderingTest(hooks);

  const destination = () => find('.destination');

  test('a common scenario of rendering a dropdown in an external element works', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger>
          {{sb.value}}
        </sb.Trigger>
        {{#if sb.isOpen}}
          {{#in-element (destination) insertBefore=null}}
            <sb.Options>
              <sb.Option @value="foo" />
              <sb.Option @value="bar" />
            </sb.Options>
          {{/in-element}}
        {{/if}}
      </SelectBox>

      <div class="destination"></div>

      <button class="outside" type="button"></button>
    </template>);

    await triggerEvent('.select-box__trigger', 'mousedown');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box .select-box__options').doesNotExist();
    assert.dom('.destination .select-box__options').exists();

    // Implied that the mouse will leave the select box,
    // because we used in-element so the options are _outside_.
    await triggerEvent('.select-box', 'mouseleave');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseup');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasText('bar');

    await click('.outside');

    assert.dom('.outside').isFocused();
  });
});
