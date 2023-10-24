# @zestia/ember-select-box

[![Latest npm release][npm-badge]][npm-badge-url]
[![Ember Observer][ember-observer-badge]][ember-observer-url]

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
- Customisable filtering built in ✔︎

## Notes

This addon intentionally...

- Does not come with any styles
- Does not concern itself with dropdown positioning

## Example

```handlebars
<SelectBox @value='Foo' @onChange={{this.handleChange}} as |sb|>
  <sb.Trigger>
    {{sb.value}}
  </sb.Trigger>
  <sb.Options>
    <sb.Option @value='Foo'>
      Foo
    </sb.Option>
  </sb.Options>
</SelectBox>
```

## How it works

This addon will render a [Combobox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role) if you utilise the `Trigger` or `Input` component.
<br>Otherwise it will render a [Listbox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role).

<details>
  <summary>View more details</summary>

### The general gist

- There is one interactive element at any one time. If you render a `Trigger`, then it is the Trigger that the user interacts with. It has a role of combobox. And so, by definition, it is _combined_ with a listbox. Whilst the Trigger has focus, it accepts user input and will allow control of its associated listbox.
- Similarly, if you utilise the `Input` instead, then _it_ is the interactive element. The Input does not automatically open or close the select box like the Trigger, since that behaviour is up to the developer to hook up.
- Because each option is rendered similar to a native `<option>`, this allows the addon to provide the typeahead behaviour like native select boxes (e.g. pressing F would jump to an option containing the text 'Foo').

### Differences to Native Select Boxes

1. When using the arrow keys on a native select box, it will stop dead when you reach the end or the beginning. Whereas, with this addon it will cycle through the options. This is following advice from [w3.org](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).
2. When mousing-out of a native single select box, the current option is forgotten. Whereas, with this addon the option stays current. This is because, the select box still has focus and as such, is still receptive to user input - like pressing Enter to select that option.
3. When using a multiple native select box, selecting an option only selects that 1 option. Whereas, with this addon, the item is added if it isn't already in the collection and removed if it is (although this can be customised with `@onBuildSelection`)
4. Right clicking an option in a native select box will select it. Whereas, with this addon, only left clicking will.

### Differences to Ember Power Select

1. With EPS you have to provide it a data structure which the addon uses to draw your UI. Whereas, with this addon _the markup provides the structure_ - the same way you do with a native select box in HTML.
2. You tell EPS which component to render for each option. Whereas with this addon you just render an `Option`, and fill its contents by using Named Blocks.
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

Optional. Similar to `@onChange` but fires regardless as to whether the value changed or not. The return value controls whether or not the select box will close after the selection.

#### `@onSearch`

Optional. The default search behaviour filters down the `@options`. Use this action to perform a custom search or
see [Filtering](#filtering).

#### `@disabled`

Optional. If `true`, the component will be unfocusable and all child components (`Trigger`, `Input` and `Option`s) will also be disabled.

#### `@multiple`

Optional. If `true`, `@value` is expected to be an array. If an option's value is included in that array, it will be considered 'selected'.

#### `@onBuildSelection`

Optional. Fired whenever a selection is made. This function receives the values most recently selected, and the previously selected values. The return value is then used as the final selection. This is primarily used to customise select boxes where `@multiple` is `true` - because the behaviour for a selection is undefined and totally depends on your use-case.

#### `@open`

Optional. Whether or not the select box should be in an open state initially.

#### `@onOpen`

Optional. Fired when the select box is opened

#### `@onClose`

Optional. Fired when the select box is closed

#### `@onActivate`

Optional. Fired when an option is moused over or focused via the keyboard controls

### API

#### `select`

Mimics the user making a selection, and so `@onChange` may fire.

#### `update`

Updates the select box with a new value(s). `@onChange` will not fire.

#### `open`

Opens the select box.

#### `toggle`

Opens or closes the select box

#### `close`

Closes the select box

#### `element`

The element of the select box

#### `value`

The selected value(s) of the select box

#### `isBusy`

True if the select box is waiting for a search to finish

#### `isOpen`

Whether the select box is open

#### `query`

The query used to produce the latest search results. (This may be different to the current value in the text input).

#### `options`

These are the same options as given to the component via `@options`, yielded back to you.
Unless a search has run, in which case they will be the return value from `@onSearch`

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

## `Group`

### Arguments

#### `@label`

Required. The group label (similar to the native `optgroup`)

## `Options`

A container element to house each option. If no `Trigger` or `Input` is rendered, then this will be a Listbox.

## `Input`

A combobox, which by default filters down the available `@options`. Customise this behaviour by providing `@onSearch`.

## `Trigger`

A combobox, which toggles the select box open/closed.

# Filtering

Since filtering options down (and accounting for diacritics) is a common requirement, this addon comes with a utility to help.

<details>
  <summary>View example</summary>

```javascript
import { filter } from '@zestia/ember-select-box';

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

@action
handleSearch(query) {
  return filter(this.args.options)
    .by('name')
    .groups('items')
    .dropEmptyGroups()
    .query(query)
    .run();
}
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
