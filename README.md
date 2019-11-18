# @zestia/ember-select-box

<a href="https://badge.fury.io/js/%40zestia%2Fember-select-box"><img src="https://badge.fury.io/js/%40zestia%2Fember-select-box.svg" alt="npm version" height="18"></a> &nbsp; <a href="http://travis-ci.org/zestia/ember-select-box"><img src="https://travis-ci.org/zestia/ember-select-box.svg?branch=master"></a> &nbsp;<a href="https://david-dm.org/zestia/ember-select-box#badge-embed"><img src="https://david-dm.org/zestia/ember-select-box.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-select-box#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-select-box/dev-status.svg"></a> &nbsp; <a href="https://emberobserver.com/addons/@zestia/ember-select-box"><img src="https://emberobserver.com/badges/-zestia-ember-select-box.svg"></a>

Select box solutions are rarely perfect for what you want.

They come with a myriad of options to configure every possible situation, and they make too many assumptions about how your select-box should behave.

This addon does less, and gives you the primitives to easily _compose your own_.

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
- Fully themeable using namespaced classes ✔︎
- Will never come with built-in styles ✔︎
- Ember Data friendly ✔︎
- Does not use jQuery ✔︎
- Easily create an autocompleter ✔︎
- Easily create a dropdown menu ✔︎
- Full control at all times with the [API](#api) ✔︎
- 'Jump-to option' behaviour based on keyboard input ✔︎
- Very few issues over many years of Ember! ✔︎

## Examples

#### Native select box

```handlebars
<NativeSelectBox as |sb|>
  <sb.Option @value="1"> One </sb.Option>
  <sb.Option @value="2"> Two </sb.Option>
  <sb.Option @value="3"> Three </sb.Option>
</NativeSelectBox>
```

#### Faux Select box

```handlebars
<SelectBox as |sb|>
  <sb.Option @value="1"> One </sb.Option>
  <sb.Option @value="2"> Two </sb.Option>
  <sb.Option @value="3"> Three </sb.Option>
</SelectBox>
```

<details>
  <summary>Arguments</summary>
  <table>
    <tr width="200">
      <td>@classNamePrefix</td>
      <td>Adds a prefix to the class name of the select box and its child components</td>
    </tr>
    <tr>
      <td>@disabled</td>
      <td>If true adds a disabled class and makes it unfocusable</td>
    </tr>
    <tr>
      <td>@multiple</td>
      <td>If true, <code>@value</code> should be an array. Also adds an <code>multiple</code> class</td>
    </tr>
    <tr>
      <td>@searchDelayTime</td>
      <td>Milliseconds to debounce the <code>@onSearch</code> action from firing (default 100)</td>
    </tr>
    <tr>
      <td>@searchMinChars</td>
      <td>Prevents the <code>@onSearch</code> action from firing until there are enough chars (default 1)</td>
    </tr>
    <tr>
      <td>@searchSlowTime</td>
      <td>Milliseconds considered for a search to be taking too long (default 500)</td>
    </tr>
    <tr>
      <td>@value</td>
      <td>Used to determine which option(s) are selected, can be a promise</td>
    </tr>
  </table>
</details>

<details>
  <summary>Actions</summary>
  <table>
    <tr>
      <td width="200">@onBuildSelection</td>
      <td>
        Fired whenever a selection is made. This function receives the value most recently
        selected, and the currently selected values. The return value is used as the final selection.
        This is primarily used to customise the default behaviour of a multiple select box, but in
        most cases will not need to be used.
      </td>
    </tr>
    <tr>
      <td>@onClickOutside</td>
      <td>Useful for closing the select box</td>
    </tr>
    <tr>
      <td>@onClose</td>
      <td>
        Fired when the select box is closed
      </td>
    </tr>
    <tr>
      <td>@onFocusIn</td>
      <td>Fired when focus enters the select box</td>
    </tr>
    <tr>
      <td>@onFocusOut</td>
      <td>Fired when focus leaves the select box</td>
    </tr>
    <tr>
      <td>@onReady</td>
      <td>Fired when the select box is ready. A useful opportunity to get
      access to the select box's API which is passed as a parameter.</td>
    </tr>
    <tr>
      <td>@onInsertElement</td>
      <td>Fired when the select box's element is inserted into the DOM. Useful opportunity to
      get access to the element, which is a property on the select box's API</td>
    </tr>
    <tr>
      <td>@onOpen</td>
      <td>
        Fired when the select box is opened
      </td>
    </tr>
    <tr>
      <td>@onPressBackspace</td>
      <td></td>
    </tr>
    <tr>
      <td>@onPressDown</td>
      <td>Useful for navigating down</td>
    </tr>
    <tr>
      <td>@onPressEnter</td>
      <td>Useful for preventing default action of event</td>
    </tr>
    <tr>
      <td>@onPressEscape</td>
      <td>Useful for closing and/or resetting a select box</td>
    </tr>
    <tr>
      <td>@onPressKey</td>
      <td>A useful place to call <code>sb.activateOptionForKeyCode(e.keyCode)</code>, which
      can be used to activate an option based on the characters recently typed. This mimics the jump-to option behaviour found in native select boxes</td>
    </tr>
    <tr>
      <td>@onPressLeft</td>
      <td>Useful for navigating selected options</td>
    </tr>
    <tr>
      <td>@onPressRight</td>
      <td>Useful for navigating selected options</td>
    </tr>
    <tr>
      <td>@onPressTab</td>
      <td></td>
    </tr>
    <tr>
      <td>@onPressUp</td>
      <td>Useful for navigating up</td>
    </tr>
    <tr>
      <td>@onSearch</td>
      <td>Fired when the select box decides to run a search</td>
    </tr>
    <tr>
      <td>@onSearched</td>
      <td>Fired after the last succesful search attempt</td>
    </tr>
    <tr>
      <td>@onSearchError</td>
      <td>Fired if a search attempt failed</td>
    </tr>
    <tr>
      <td>@onSelect</td>
      <td>
        Fired when an option is clicked, or enter is pressed regardless as
        to whether the value changed or not (because a selection was made).
      </td>
    </tr>
    <tr>
      <td>@onUpdate</td>
      <td>
        Fired whenever the value changes, either by a new <code>@value</code> argument being passed in, or a selection is made that results in the value changing.
      </td>
    </tr>
  </table>
</details>

<details>
  <summary>API</summary>
  <table>
    <caption>Actions</caption>
    <tr>
      <td width="200">sb.activateNextOption</td>
      <td>
        Activates the next option<br>
        <code>({ scrollIntoView: true })</code><br>
        • Whether to scroll to the option
      </td>
    </tr>
    <tr>
      <td>sb.activateNextSelectedOption</td>
      <td>
        Activates the next selected option<br>
        <code>({ scrollIntoView: true })</code><br>
        • Whether to scroll to the selected option
      </td>
    </tr>
    <tr>
      <td>sb.activateOptionForValue</td>
      <td>
        Activates the first option (there may be more than one) that matches
        the given value.<br>
        <code>(value, { scrollIntoView: true })</code><br>
        • The value of the option to activate<br>
        • Whether to scroll to the option
      </td>
    </tr>
    <tr>
      <td>sb.activateOptionAtIndex</td>
      <td>
        Adds an <code>active</code> class to the option at the index<br>
        <code>(index, { scrollIntoView: false })</code><br>
        • The index of the option to activate<br>
        • Whether to scroll to the option
      </td>
    </tr>
    <tr>
      <td>sb.activateOptionForKeyCode</td>
      <td>
        Mimics native select box behaviour by jumping to an appopriate option based on the <code>textContent</code> of the options. <a href="https://zestia.github.io/ember-select-box/#/simple-select">Demo</a><br>
        <code>(keyCode, { scrollIntoView: true })</code><br>
        • Keycode of character to match in the option's text<br>
        • Whether to scroll to the option
      </td>
    </tr>
    <tr>
      <td>sb.activatePreviousOption</td>
      <td>
        Activates the previous option<br>
        <code>({ scrollIntoView: true })</code><br>
        • Whether to scroll to the option
      </td>
    </tr>
    <tr>
      <td>sb.activatePreviousSelectedOption</td>
      <td>
        Activates the previous selected option<br>
        <code>({ scrollIntoView: true })</code><br>
        • Whether to scroll to the selected option
      </td>
    </tr>
    <tr>
      <td>sb.activateSelectedOptionAtIndex</td>
      <td>
        Activates the selected option at the index<br>
        <code>(index, { scrollIntoView: false })</code><br>
        • The index of the selected option to activate<br>
        • Whether to scroll to the option
      </td>
    </tr>
    <tr>
      <td>sb.blurInput</td>
      <td>Unfocuses the input associated with the select box</td>
    </tr>
    <tr>
      <td>sb.cancelSearch</td>
      <td>
        'Cancels' searches currently in progress (even though promises are not cancelable).
      </td>
    </tr>
    <tr>
      <td>sb.close</td>
      <td>Closes the select box removing the <code>is-open</code> class name</td>
    </tr>
    <tr>
      <td>sb.deactivateOptions</td>
      <td>Makes no option be active</td>
    </tr>
    <tr>
      <td>sb.deactivateSelectedOptions</td>
      <td>Makes no selected option be active</td>
    </tr>
    <tr>
      <td>sb.focusInput</td>
      <td>Focuses the input associated with the select box</td>
    </tr>
    <tr>
      <td>sb.open</td>
      <td>Opens the select box, adding <code>is-open</code> class name</td>
    </tr>
    <tr>
      <td>sb.search</td>
      <td>Runs an arbitrary search using the search function provided by <code>@onSearch</code></td>
    </tr>
    <tr>
      <td>sb.select</td>
      <td>
        Selects arbitrary value(s).
        <code>@onSelect</code> will fire.
      </td>
    </tr>
    <tr>
      <td>sb.selectActiveOption</td>
      <td>Selects the value of whichever option is currently active</td>
    </tr>
    <tr>
      <td>sb.setInputValue</td>
      <td>
        Lets you update the input value.
        Useful for prefilling the input with the active option text for example.
      </td>
    </tr>
    <tr>
      <td>sb.toggle</td>
      <td>Opens or closes the select box</td>
    </tr>
    <tr>
      <td>sb.update</td>
      <td>
        Updates the selectbox with a new value(s).
        <code>@onUpdate</code> will fire.
      </td>
    </tr>
  </table>

  <table>
    <caption>Properties</caption>
    <tr>
      <td width="200">sb.element</td>
      <td>The DOM element of the select box</td>
    </tr>
    <tr>
      <td>sb.isBusy</td>
      <td>True if the select box is waiting for the <code>@value</code> argument, or it is waiting for a search to finish</td>
    </tr>
    <tr>
      <td>sb.isDisabled</td>
      <td>Whether or not the select box is currently disabled</td>
    </tr>
    <tr>
      <td>sb.isFocused</td>
      <td>Whether or not the select box is currently has focus</td>
    </tr>
    <tr>
      <td>sb.isFulfilled</td>
      <td>True if <code>@value</code> resolved</td>
    </tr>
    <tr>
      <td>sb.isMultiple</td>
      <td>True if the select box is allows selectiong multiple values</td>
    </tr>
    <tr>
      <td>sb.isOpen</td>
      <td>True if the select box is open</td>
    </tr>
    <tr>
      <td>sb.isPending</td>
      <td>True whilst <code>@value</code> is being resovled</td>
    </tr>
    <tr>
      <td>sb.isRejected</td>
      <td>True if <code>@value</code> failed to resolve</td>
    </tr>
    <tr>
      <td>sb.isSettled</td>
      <td>True once <code>@value</code> has resolved or rejected</td>
    </tr>
    <tr>
      <td>sb.isSlowSearch</td>
      <td>True if the promised search results are taking a while</td>
    </tr>
    <tr>
      <td>sb.value</td>
      <td>The selected value(s) of the select box</td>
    </tr>
  </table>
</details>

## Option

```handlebars
<sb.Option @value={{model}} as |o|>
  {{o.value.name}}
</sb.Option>
```

<details>
  <summary>Arguments</summary>
  <table>
    <tr>
      <td>@disabled</td>
      <td>Prevents the option from being selected</td>
    </tr>
    <tr>
      <td>@selected</td>
      <td>
        For manually specifying that this option is selected.
        Preferably, allow selection to be automatically computed by just setting the <code>@values</code>
      </td>
    </tr>
    <tr>
      <td>@value</td>
      <td>Can be anything, including a promise</td>
    </tr>
  </table>
</details>

<details>
  <summary>Actions</summary>
  <table>
    <tr width="200">
      <td>@onActivate</td>
      <td>Fired when an individual option is activated</td>
    </tr>
    <tr>
      <td>@onSelect</td>
      <td>Useful for firing one-off actions when an option is selected</td>
    </tr>
  </table>
</details>

<details>
  <summary>API</summary>
  <table>
    <caption>Template only properties</caption>
    <tr width="200">
      <td>o.element</td>
      <td>The DOM element of the option component</td>
    </tr>
    <tr>
      <td>o.index</td>
      <td>The index of the option amongst the options</td>
    </tr>
    <tr>
      <td>o.isActive</td>
      <td>True if the option is active</td>
    </tr>
    <tr>
      <td>o.isDisabled</td>
      <td>Whether or not the option is currently disabled</td>
    </tr>
    <tr>
      <td>o.isFulfilled</td>
      <td>True if <code>@value</code> resolved</td>
    </tr>
    <tr>
      <td>o.isPending</td>
      <td>True whilst <code>@value</code> is being resovled</td>
    </tr>
    <tr>
      <td>o.isRejected</td>
      <td>True if <code>@value</code> failed to resolve</td>
    </tr>
    <tr>
      <td>o.isSelected</td>
      <td>Whether or not the option is currently selected</td>
    </tr>
    <tr>
      <td>o.isSettled</td>
      <td>True once <code>@value</code> has resolved or rejected</td>
    </tr>
    <tr>
      <td>o.value</td>
      <td>The value of the option</td>
    </tr>
  </table>
</details>

## Group

Wraps the options in extra markup.<br>
You can still navigate options using the arrow keys (or the API) even if they are inside groups.

```handlebars
<sb.Group @label="Things">

</sb.Group>
```

## Options

You only need to wrap the options up in with `sb.Options` if you require extra markup for styling.
It's useful to use as the drop-down part of a select box, which can be opened or closed.

```handlebars
<sb.Options>
  <sb.Option @value="1"> One </sb.Option>
  <sb.Option @value="2"> Two </sb.Option>
</sb.Options>
```

## Input

Allows you to input text into the select box, usually for running searches/filtering

```handlebars
<sb.Input />
```

<details>
  <summary>Actions</summary>
  <table>
    <tr width="200">
      <td>@onClear</td>
      <td>Fired when text is cleared completely</td>
    </tr>
    <tr>
      <td>@onDelete</td>
      <td>Fired when there is no text present, but backspace is pressed</td>
    </tr>
    <tr>
      <td>@onInput</td>
      <td>Fired when text is input</td>
    </tr>
  </table>
</details>

## Selected option

Does _not_ render the user's selected option automatically, but rather just provides a way for you to render the option(s) that have been selected.

```handlebars
<sb.SelectedOption @value={{model}} as |so|>
  {{so.value.name}}
</sb.SelectedOption>
```

This component has a similar API to a normal `<sb.Option />`, except that it can't be selected.

## API

This addon exposes the select box's API to you as an argument to action handlers like so:

```handlebars
<SelectBox @onSelect={{this.selectedSomething}} />
```

```javascript
@action
selectedSomething(value, api) {
  this.selectedThing = value;
  api.close();
}
```

## Test helpers

- For the native select box, this addon provides test helpers for selecting options
- For the faux select box, no custom test helpers are needed - you can just use Ember's `click` or `triggerEvent` test helpers.

Here is an example of selecting some options, and asserting that they have been selected:

<details>
  <summary>View code snippet</summary>

```javascript
import {
  getNativeMultipleSelectBoxValue,
  selectNativeOptionsByValue,
  selectNativeOptionsByLabel
} from '@zestia/ember-select-box/test-support/helpers/selecting';

// ...

test('selecting things', async function(assert) {
  assert.expect(1);

  await render(hbs`
    <NativeSelectBox @multiple={{true}} as |sb|>
      <sb.Option @value={{1}}>One</sb.Option>
      <sb.Option @value={{2}}>Two</sb.Option>
      <sb.Option @value={{3}}>Three</sb.Option>
    </NativeSelectBox>
  `);

  await selectNativeOptionsByValue('.select-box', [1, 2]);
  // or: await selectNativeOptionsByLabel('.select-box', ['One', 'Two']);

  assert.deepEqual(getNativeMultipleSelectBoxValue('.select-box'), [
    'One',
    'Two'
  ]);
});
```

</details>

## Customising

To create your own select box, make a new component that renders a select box:

```handlebars
<SelectBox @value={{@value}} @onSelect={{@onSelect}} @classNamePrefix="foo-select" as |sb|>
  <sb.SelectedOption {{on "click" sb.toggle}}>
    {{sb.value.name}}
  </sb.SelectedOption>
  <sb.Options>
    {{yield sb}}
  </sb.Options>
</SelectBox>
```

...and then use it like this:

```handlebars
<FooSelect @value={{foo}} @onSelect={{this.selectedFoo}} as |sb|>
  {{#each this.foos as |foo|}}
    <sb.Option @value={{foo}}>{{foo.name}}</sb.Option>
  {{/each}}
</FooSelect>
```

...which will render...

```html
<div class="foo-select">
  <div class="foo-select__selected-option">Foo</div>
  <div class="foo-select__options">
    <div class="foo-select__option">Foo</div>
    <div class="foo-select__option foo-select__option--selected">Bar</div>
    <div class="foo-select__option">Baz</div>
  </div>
</div>
```

## FAQ

- Question: Why aren't the native and faux select boxes two addons.<br>
- Answer: Less effort maintaining 1 addon

- Question: Why would I not just use [Ember Power Select](https://github.com/cibernox/ember-power-select)?
- Answer: `ember-power-select` is powerful in that it is feature-full, whereas `ember-select-box` is flexible in that it is minimal.

## Troubleshooting

- Problem: When I navigate using the arrow keys, the wrong option becomes active
- Solution: This may happen when you change the options that are displayed, because Ember will try to
  re-use components. You can fix this by adding `key="@index"` to your `#each`.

- Problem: Rendering lots of options is slow.
- Solution: If your select box only uses _primitive_ values, you do not need to use `<sb.Option>`, instead you can
  use a plain old `<option>` element [[Example](tests/dummy/app/templates/fast-native-single-select.hbs)]. Which will be faster, because constructing components is expensive in Ember.
