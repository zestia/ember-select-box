import { module, skip } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';

module('select-box', function (hooks) {
  setupRenderingTest(hooks);

  // Regression test for issue
  // https://github.com/ember-modifier/ember-modifier/issues/851

  const position = modifier(
    (dropdown, [container]) => (dropdown.dataset.positioned = 'true'),
    { eager: false }
  );

  skip('it does not blow up', async function (assert) {
    assert.expect(0);

    const state = new (class {
      @tracked value;
    })();

    const handleChange = (value) => {
      state.value = value;
    };

    await render(<template>
      <SelectBox @value={{state.value}} @onChange={{handleChange}} as |sb|>
        <sb.Trigger />
        <sb.Options {{(if sb.isOpen (modifier position sb.element))}}>
          <sb.Option @value="foo" />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger'); // Open
    await click('.select-box__option'); // Close
  });
});
