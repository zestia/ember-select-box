# Test helpers

## Faux select box

No custom test helpers are needed - you can just use Ember's `click` or `triggerEvent` test helpers.

## Native select box

- `getNativeMultipleSelectBoxValue`
- `selectNativeOptionsByValue`
- `selectNativeOptionsByLabel`

<details>
  <summary>Examples</summary>

Here is an example of selecting some options, and asserting that they have been selected:

```javascript
import {
  getNativeMultipleSelectBoxValue,
  selectNativeOptionsByValue,
  selectNativeOptionsByLabel
} from '@zestia/ember-select-box/test-support/helpers/selecting';

test('selecting things', async function (assert) {
  assert.expect(1);

  await render(hbs`
    <NativeSelectBox @multiple={{true}} as |sb|>
      <sb.Option @value={{1}}>One</sb.Option>
      <sb.Option @value={{2}}>Two</sb.Option>
      <sb.Option @value={{3}}>Three</sb.Option>
    </NativeSelectBox>
  `);

  // These do the same
  await selectNativeOptionsByValue('.select-box', [1, 2]);
  await selectNativeOptionsByLabel('.select-box', ['One', 'Two']);

  assert.deepEqual(getNativeMultipleSelectBoxValue('.select-box'), [
    'One',
    'Two'
  ]);
});
```

</details>
