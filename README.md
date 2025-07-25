# @zestia/ember-select-box

<!-- [![Ember Observer][ember-observer-badge]][ember-observer-url] -->
<!-- [![GitHub Actions][github-actions-badge]][github-actions-url] -->

[npm-badge]: https://img.shields.io/npm/v/@zestia/ember-select-box.svg
[npm-badge-url]: https://www.npmjs.com/package/@zestia/ember-select-box
[github-actions-badge]: https://github.com/zestia/ember-select-box/workflows/CI/badge.svg
[github-actions-url]: https://github.com/zestia/ember-select-box/actions
[ember-observer-badge]: https://emberobserver.com/badges/-zestia-ember-select-box.svg
[ember-observer-url]: https://emberobserver.com/addons/@zestia/ember-select-box

This addon mimics a native select box. It is lightweight and highly flexible.

## Installation

```
ember install @zestia/ember-select-box
```

Add the following to `~/.npmrc` to pull @zestia scoped packages from Github instead of NPM.

```
@zestia:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_GH_TOKEN>
```

## Demo

https://zestia.github.io/ember-select-box

## Features

- Mimics a native select box, but easily stylable ✔︎
- Navigatable options and groups ✔︎
- Valid Combobox / Listbox ✔︎
- Any HTML you want ✔︎
- Full control at all times with the API ✔︎
- No configuration options ✔︎
- Very few issues over many years of Ember! ✔︎
- Dropdown primitive ✔︎
- Customisable filtering built in ✔︎

## Notes

- Does not come with any styles
- Does not concern itself with dropdown positioning<br>
  (this can be achieved using positioning libraries, or in future, using CSS anchor positioning)
- The Dropdown component will be swapped for a Popover when browsers have better support for it.

## Example

```handlebars
<SelectBox @value='Foo' @onChange={{this.handleChange}} as |sb|>
  <sb.Dropdown>
    <sb.Trigger>
      {{sb.value}}
    </sb.Trigger>
    <sb.Content>
      <sb.Options>
        <sb.Option @value='Foo'>
          Foo
        </sb.Option>
      </sb.Options>
    </sb.Content>
  </sb.Dropdown>
</SelectBox>
```

## How it works

This addon will automatically render a [Combobox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role) or a [Listbox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role), depending on the components you use.

<details>
  <summary>View more details</summary>

### Differences to Ember Power Select

#### Rendering

- **Ember Power Select**: Requires a data structure to describe the UI
- **This addon**: Uses markup, like you would with a native select box.

### Differences to Native Select Boxes

#### Multiple choice

- **Native**: Selects only 1 option (requires keyboard shortcut)
- **This addon** Automatically adds or removes
- **Reason**: Multiple selection can be customised by using `@onBuildSelection`

#### Right clicking

- **Native**: Selects the option
- **This addon**: Does not select the option
- **Reason**: Allows for further customisation

#### Mousing out

- **Native**: Forgets current option<br>
- **This addon**: Remembers current option
- **Reason**: This is because, the select box still has focus and as such, it is still receptive to user input - like pressing Enter to select that option. It also makes styling the different states easier with CSS and can prevent the active option from jumping around when mousing in and out.

</details>

## `SelectBox`

### Arguments

#### `@onReady`

Optional. Fired when the select box is ready. A useful opportunity to get access to the select box's API which is passed as a parameter.

#### `@value`

Required. Used to determine which option(s) are selected. This value is compared to the `@value`'s of the option components.

#### `@options`

Optional. Use this provide an initial set of options. See yielded [`options`](#options-1)

#### `@onChange`

Required. Fired when a selection is made (that is, an option is clicked, or enter/space is pressed) and the new value is different to the old value.

#### `@onSelect`

Optional. Similar to `@onChange` but fires regardless as to whether the value changed or not.

#### `@onSearch`

Optional. The default search behaviour filters down the `@options`. Use this action to perform a custom search or
see [Filtering](#filtering).

#### `@disabled`

Optional. If `true`, the component will be unfocusable and all child components (`Trigger`, `Input` and `Option`s) will also be disabled.

#### `@multiple`

Optional. If `true`, `@value` is expected to be an array. If an option's value is included in that array, it will be considered 'selected'.

#### `@onBuildSelection`

Optional. Fired whenever a selection is made. This function receives the values most recently selected, and the previously selected values. The return value is then used as the final selection. This is primarily used to customise select boxes where `@multiple` is `true` - because the behaviour for a selection is undefined and totally depends on your use-case.

#### `@onActivate`

Optional. Fired when an option is moused over or focused via the keyboard controls

### API

#### `select`

Mimics the user making a selection, and so `@onChange` may fire.

#### `update`

Updates the select box with a new value(s). `@onChange` will not fire.

#### `search`

Runs a search for a given query

#### `element`

The element of the select box

#### `value`

The selected value(s) of the select box

#### `isBusy`

True if the select box is waiting for a search to finish

#### `query`

The query used to produce the latest search results. (This may be different to the current value in the text input).

#### `options`

These are the same options as given to the component via `@options`, yielded back to you.
Unless a search has run, in which case they will be the return value from `@onSearch`

#### `dropdown`

The API of the dropdown associated with the select box

## `Option`

### Arguments

#### `@value`

Required. The value of the option.

#### `@disabled`

Optional. Prevents the option from being activated or selected.

### API

#### `id`

The unique id of the option element

#### `value`

The value of the option

#### `index`

The index of the option amongst the options

#### `isActive`

True if the option is active

#### `isDisabled`

Whether or not the option is currently disabled

#### `isSelected`

Whether or not the option is currently selected

## `Options`

A listbox container element to house each option

## `Group`

### Arguments

#### `@label`

Required. The group label (similar to the native `optgroup`)

## `Input`

A combobox, which by default filters down the available `@options`. Customise this behaviour by providing `@onSearch`.

## `Trigger`

A combobox, which toggles the select box's dropdown open/closed.

## `Content`

An element to house the content that displays when the select box's dropdown is opened

#### `@destination`

Optional. Wormhole/Portal element

## `Dropdown`

### Arguments

#### `@open`

Optional. Whether or not the select box's dropdown should be in an open state initially.

#### `@onOpen`

Optional. Fired when the select box's dropdown is opened

#### `@onClose`

Optional. Fired when the select box's dropdown is closed

### API

#### `isOpen`

Whether the select box's dropdown is open

#### `open`

Opens the select box's dropdown

#### `toggle`

Opens or closes the select box's dropdown

#### `close`

Closes the select box's dropdown

#### `element`

The element of the select box's dropdown

# Filtering

Since filtering options down (and accounting for diacritics) is a common requirement, this addon comes with a utility to help.

<details>
  <summary>View example</summary>

```javascript
import { filter } from '@zestia/ember-select-box/utils';

/**
 * [{
 *   groupLabel: 'Group 1',
 *   items: [{
 *     id: 1,
 *     name: 'Foo'
 *   }, {
 *     id: 2,
 *     name: 'Bar'
 *   }]
 *  }, {
 *   groupLabel: 'Group 2',
 *   items: [{
 *     id: 3,
 *     name: 'Baz'
 *   }, {
 *     id: 4,
 *     name: 'Qux'
 *   }]
 * }]
 */

handleSearch = (query) => {
  return filter(this.args.options)
    .by('name')
    .groups('items')
    .dropEmptyGroups()
    .query(query)
    .run();
};
```

</details>

### `filter(<array>)`

Accepts an array of options to filter down.

#### `query(<string>)`

Required. The query string used to filter each option

#### `by(<string|array|function(option)>)`

Optional. By default the value of each option will be used for filtering. Provide a string to pick a specific key from an option. Provide an array to filter by multiple properties. Or provide a function to pluck your own value.

#### `groups(<string>)`

Optional. Calling this tells the filter function that your data structure contains groups of options, and the key to where those options can be found.

#### `dropEmptyGroups()`

Optional. Tells the filter to exclude groups with no options

#### `using(<function(string, query)>)`

Optional. By default each option will be included in the results if it contains the query string. Use this function to provide your own logic to compute whether or not an option should be included.

#### `run()`

Kicks off the filter you've configured
