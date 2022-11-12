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

Select box solutions are rarely perfect for what you want.

They come with a myriad of options to configure every possible situation, and they make too many assumptions about how your select-box should behave.

This addon does less, and gives you the tools to build your own.

## Installation

```
ember install @zestia/ember-select-box
```

## Demo

https://zestia.github.io/ember-select-box

## Features

- Native select box _(that supports complex values)_ ✔︎
- Faux select box _(mimics a native select box, but easily stylable)_ ✔︎
- Navigatable options and groups ✔︎
- ARIA Attributes ✔︎
- Supports promises ✔︎
- Any HTML you want ✔︎
- Ember Data friendly ✔︎
- Full control at all times with the API ✔︎
- Native-like typeahead behaviour ✔︎
- Very few issues over many years of Ember! ✔︎
- Easily create an autocompleter ✔︎
- Easily create a dropdown menu ✔︎

## Notes

- This addon intentionally does not come with any styles.

## Example

The select box component isn't designed to be used on its own, but rather used to compose a new select box component... in this example it's called "foo-select"

```handlebars
{{! foo-select.hbs }}
<SelectBox class='foo' @value={{@value}} @onSelect={{@onSelect}} as |sb|>
  <sb.SelectedOption {{on 'click' sb.toggle}}>
    {{sb.value.name}}
  </sb.SelectedOption>
  <sb.Options>
    {{yield sb}}
  </sb.Options>
</SelectBox>
```

...and then use it like this:

```handlebars
{{! application.hbs }}
<FooSelect @value={{this.foo1}} @onSelect={{this.handleSelectFoo}} as |sb|>
  {{#each this.foos as |foo|}}
    <sb.Option @value={{foo}}>{{foo.name}}</sb.Option>
  {{/each}}
</FooSelect>
```

<br>

> ### As you can see, apart from being able to select a value - this addon does very little out of the box! It's up to _you_ to add the layer of behaviour that you require using the API.

<br>

## Docs

- [High level overview of how it works](docs/how-it-works.md)
- [Test helpers](docs/test-helpers.md)
- [Troubleshooting](docs/troubleshooting.md)

## `SelectBox`

### Arguments

#### `@onReady`

Optional. Fired when the select box is ready. A useful opportunity to get access to the select box's API which is passed as a parameter.

#### `@value`

Required. Used to determine which option(s) are selected, can be a promise.

#### `@onSelect`

Required. Fired when a selection is made (that is, an option is clicked, or enter is pressed) regardless as to whether the value changed or not.

#### `@onUpdate`

Optional. Similar to `@onSelect` But only fired when the value changes. Either because a new `@value` argument was received, or a selection was made by the user that resulted in the value changing.

#### `@disabled`

Optional. If true, the component will be unfocusable, and if it contained an `Input`, then that too will be disabled.

#### `@multiple`

Optional. If true, `@value` is expected to be an array. If an option's value is included in that array, it will be considered 'selected'.

#### `@onBuildSelection`

Optional. Fired whenever a selection is made. This function receives the values most recently selected, and the previously selected values. The return value is then used as the final selection. This is primarily used to customise the select boxes where `@multiple` is true - because the behaviour for a selection is undefined and totally depends on your use-case.

#### `@onSearch`

Optional. Fired when the select box decides to run a search because the criteria have been met (like enough characters present for example)

#### `@onSearched`

Optional Fired after the _last successful_ search attempt.

#### `@onSearchError`

Optional. Fired if a search attempt failed

#### `@searchDelayTime`

Optional. Milliseconds to debounce the `@onSearch` action from firing. Default `100` ms.

#### `@searchMinChars`

Optional. Prevents the `@onSearch` action from firing until there are enough characters typed in the `Input` component. Default `1` char.

#### `@searchSlowTime`

Optional. Milliseconds before a search is considered to be taking too long. Default `500` ms.

#### `@onFocusLeave`

Optional. Fired when the select box is no longer being interacted with. For example, the user clicks outside it, _or tabs away_. In most cases this is better than 'on click outside' and more akin to how native select boxes behave.

#### `@onOpen`

Optional. Fired when the select box is opened

#### `@onClose`

Optional. Fired when the select box is closed

#### `@onPressBackspace`

Optional. Fired when Backspace is pressed.

#### `@onPressDown`

Optional. Fired when the Down Arrow key is pressed.

#### `@onPressEnter`

Optional. Fired when the Enter key is pressed.

#### `@onPressEscape`

Optional. Fired when the Escape key is pressed

#### `@onPressKey`

Optional. Fired when any key is pressed.

#### `@onPressLeft`

Optional. Fired when the Left Arrow key is pressed.

#### `@onPressRight`

Optional. Fired when the Right Arrow key is pressed.

#### `@onPressTab`

Optional. Fired when the Tab key is pressed.

#### `@onPressUp`

Optional. Fired when the Up Arrow key is pressed.

### API

#### `select`

Selects arbitrary value(s). This mimics making a selection, and so `@onSelect` will fire. `@onUpdate` will also fire if the value is different.

#### `update`

Updates the select box with a new value(s). This is different from `select. It will update the select box's internal state. @onSelect will not fire. It is useful for resetting the select box after a selection is made.

#### `selectActiveOption`

Selects the value of whichever option is currently active

#### `activateNextOption`

Activates the next option.

#### `activatePreviousOption`

Activates the previous option.

#### `activateOptionForValue`

Activates the first option that matches the given value.

#### `activateOptionAtIndex`

Activates the option at the given index.

#### `activateOptionForKeyCode`

Mimics native select box behaviour by jumping to an appropriate option based on the `textContent` of the options. <a href="https://zestia.github.io/ember-select-box/#/simple-select">Demo</a>.

#### `deactivateOptions`

Makes no option be active.

#### `search`

Runs an arbitrary search using the search function provided by `@onSearch`. Useful to kick off a default search, or reset search results after a selection has been made for example.

#### `cancelSearch`

Cancels searches currently in progress.

#### `setInputValue`

Update the input value. Useful for pre-filling the `Input` with the active option's value for example.

#### focusInput

Focuses the `Input` associated with the select box.

#### `blurInput`

Unfocuses the `Input` associated with the select box.

#### `open`

Opens the select box

#### `toggle`

Opens or closes the select box

#### `close`

Closes the select box

#### `element`

The element of the select box

#### `value`

The selected value(s) of the select box

#### `isFulfilled`

True if `@value` resolved

#### `isPending`

True whilst `@value` is being resolved

#### `isRejected`

True if `@value` failed to resolve

#### `isSettled`

True once `@value` has resolved or rejected

#### `isBusy`

True if the select box is resolving the `@value` argument, or it is waiting for a search to finish

#### `isDisabled`

Whether or not the select box is currently disabled

#### `isMultiple`

Whether the select box allows selecting multiple values

#### `isOpen`

Whether the select box is open

#### `isSlowSearch`

Whether the promised search results are taking longer than expected

## `Option`

### Arguments

#### `@value`

Required. The value of the option. Can be anything, including a promise

#### `@disabled`

Optional. Prevents the option from being selected.

#### `@selected`

Optional. For manually specifying that this option is selected. Preferably, allow selection to be automatically computed by just setting `@value`

#### `@onActivate`

Optional. Fired when an option is activated (by mousing over, or via keyboard control, or the api)

#### `@onSelect`

Optional. Fired when an individual option is selected (by clicking, or pressing Enter, or the api)

### API

#### `element`

The DOM element of the option component

#### `value`

The value of the option

#### `isFulfilled`

True if `@value` resolved

#### `isPending`

True whilst `@value is being resolved

#### `isRejected`

True if `@value` failed to resolve

#### `isSettled`

True once `@value` has resolved or rejected

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

A container element to house each option

## `Input`

An input, which when present defines whether the select box is a combo box or a list box, and can be used to run searches from.

### Arguments

#### `@onClear`

Optional. Fired when text is cleared completely

#### `@onDelete`

Optional. Fired when there is no text present, but backspace is pressed.

## `SelectedOption`

An element to house the option that has been selected
