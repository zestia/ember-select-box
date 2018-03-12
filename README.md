# @zestia/ember-select-box

<a href="http://emberobserver.com/addons/ember-select-box"><img src="http://emberobserver.com/badges/ember-select-box.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-select-box#badge-embed"><img src="https://david-dm.org/zestia/ember-select-box.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-select-box#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-select-box/dev-status.svg"></a> &nbsp; <a href="http://travis-ci.org/zestia/ember-select-box"><img src="https://travis-ci.org/zestia/ember-select-box.svg?branch=master"></a> &nbsp; <a href="http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components"><img src="http://embadge.io/v1/badge.svg?label=ember&range=%3E=2.3.0"></a>


Select box solutions are rarely perfect for what you want.

They come with a myriad of options to configure every possible situation, and they make too many assumptions about how your select-box should behave.

This addon does less, and gives you the primitives to easily _compose your own_.

## Features / info

* [Easily customisable](#customising)
* <a href="https://zestia.github.io/ember-select-box" target="_blank">Demo scenarios</a> / <a href="https://github.com/zestia/ember-select-box/tree/master/tests/dummy/app/components" target="_blank">Code</a>
* [FAQ](#faq)
* [Troubleshooting](#troubleshooting)
* Native select box _(that supports complex values)_ ✔︎
* Faux select box _(mimics a native select box, but easily stylable)_ ✔︎
* Navigatable options and groups ✔︎
* Supports promises ✔︎
* Any HTML you want ✔︎
* Fully themeable using namespaced classes ✔︎
* Will never come with built-in styles ✔︎
* Ember Data friendly ✔︎
* Does not use jQuery ✔︎
* Easily create an autocompleter ✔︎
* Works well with [Ember Wormhole](https://github.com/yapplabs/ember-wormhole) ✔︎
* Full control at all times with the [API](#api) ✔︎

## Installation

```
ember install @zestia/ember-select-box
```

<hr>

#### Native select box example

```handlebars
{{#select-box/native as |sb|}}
  {{#sb.option value=1}} One {{/sb.option}}
  {{#sb.option value=2}} Two {{/sb.option}}
  {{#sb.option value=3}} Three {{/sb.option}}
{{/select-box/native}}
```

#### Faux Select box example

```handlebars
{{#select-box as |sb|}}
  {{#sb.option value=1}} One {{/sb.option}}
  {{#sb.option value=2}} Two {{/sb.option}}
  {{#sb.option value=3}} Three {{/sb.option}}
{{/select-box}}
```

<table>
  <caption>Attributes</caption>
  <tr>
    <td width="200">value</td>
    <td>Used to determine which option is selected, can be a promise</td>
  </tr>
  <tr>
    <td>multiple</td>
    <td>If true, <code>value</code> should be an array. Also adds an <code>is-multiple</code> class</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>If true adds an <code>is-disabled</code> class</td>
  </tr>
  <tr>
    <td>style</td>
    <td></td>
  </tr>
  <tr>
    <td>class-prefix</td>
    <td>Adds a prefix to the class name of all child select-box components</td>
  </tr>
  <tr>
    <td>is-open</td>
    <td>Controls the open/closed state</td>
  </tr>
  <tr>
    <td>search-min-chars</td>
    <td>Prevents the on-search action from firing until there are enough chars (default 1)</td>
  </tr>
  <tr>
    <td>search-delay-time</td>
    <td>Milliseconds to debounce the on-search action from firing (default 100)</td>
  </tr>
  <tr>
    <td>search-slow-time</td>
    <td>Milliseconds considered for a search to be taking too long (default 500)</td>
  </tr>
</table>

<table>
  <caption>Actions</caption>
  <tr>
    <td width="200">on-open</td>
    <td>
      Fired when the select box is opened
    </td>
  </tr>
  <tr>
    <td>on-close</td>
    <td>
      Fired when the select box is closed
    </td>
  </tr>
  <tr>
    <td>on-init</td>
    <td>Fired when the select box initialises. Useful opportunity to get
    access to the select box's API which is passed as a parameter.</td>
  </tr>
  <tr>
    <td>on-select</td>
    <td>
      Fired when an option is clicked, or enter is pressed regardless as
      to whether the value changed or not. Subsequently fired by use of the <code>select</code> API.
    </td>
  </tr>
  <tr>
    <td>on-update</td>
    <td>
      Fired after the initial value has been resolved and the component has rendered.<br>
      Subsequently fired by use of the <code>update</code> API or if the value attribute changes.
    </td>
  </tr>
  <tr>
    <td>on-build-selection</td>
    <td>
      Fired whenever a selection is made. This function receives the value most recently
      selected, and the currently selected values. The return value is used as the final selection.
      This is primarily used to customise the default behaviour of a multiple select box, but in
      most cases will not need to be used.
    </td>
  </tr>
  <tr>
    <td>on-search</td>
    <td>Fired when the select box decides to run a search</td>
  </tr>
  <tr>
    <td>on-searched</td>
    <td>Fired after the last succesful search attempt</td>
  </tr>
  <tr>
    <td>on-click-outside</td>
    <td>Useful for closing the select box</td>
  </tr>
  <tr>
    <td>on-focus-in</td>
    <td>Fired when focus enters the select box, normalised if it contains an input</td>
  </tr>
  <tr>
    <td>on-focus-out</td>
    <td>Fired when focus leaves the select box</td>
  </tr>
  <tr>
    <td>on-press-backspace</td>
    <td></td>
  </tr>
  <tr>
    <td>on-press-tab</td>
    <td></td>
  </tr>
  <tr>
    <td>on-press-enter</td>
    <td>Useful for preventing default action of event</td>
  </tr>
  <tr>
    <td>on-press-escape</td>
    <td>Useful for closing and/or resetting a select box</td>
  </tr>
  <tr>
    <td>on-press-left</td>
    <td>Useful for navigating selected-options</td>
  </tr>
  <tr>
    <td>on-press-up</td>
    <td>Useful for navigating up</td>
  </tr>
  <tr>
    <td>on-press-right</td>
    <td>Useful for navigating selected-options</td>
  </tr>
  <tr>
    <td>on-press-down</td>
    <td>Useful for navigating down</td>
  </tr>
</table>

<table>
  <caption>Yielded API actions</caption>
  <tr>
    <td width="200">sb.open</td>
    <td>Opens the select box, adding <code>is-open</code> class name</td>
  </tr>
  <tr>
    <td>sb.close</td>
    <td>Closes the select box removing the <code>is-open</code> class name</td>
  </tr>
  <tr>
    <td>sb.toggle</td>
    <td>Opens or closes the select box</td>
  </tr>
  <tr>
    <td>sb.select</td>
    <td>Selects an arbitrary value(s) and fires the <code>on-select</code> action</td>
  </tr>
  <tr>
    <td>sb.update</td>
    <td>Updates the selected value(s), but does not fire the <code>on-select</code> action</td>
  </tr>
  <tr>
    <td>sb.selectActiveOption</td>
    <td>Selects the value of whichever option is currently active</td>
  </tr>
  <tr>
    <td>sb.search</td>
    <td>Runs an arbitrary search using the search function provided by <code>on-search</code></td>
  </tr>
  <tr>
    <td>sb.stopSearching</td>
    <td>'Cancels' searches currently in progress (even though promises are not cancelable)</td>
  </tr>
  <tr>
    <td>sb.setInputValue</td>
    <td>Lets you update the input value, useful for when a selection has been made</td>
  </tr>
  <tr>
    <td>sb.focusInput</td>
    <td>Focuses the input associated with the select box</td>
  </tr>
  <tr>
    <td>sb.blurInput</td>
    <td>Unfocuses the input associated with the select box</td>
  </tr>
  <tr>
    <td>sb.activateOptionAtIndex</td>
    <td>Adds an <code>is-active</code> class to the option at the index</td>
  </tr>
  <tr>
    <td>sb.activateNextOption</td>
    <td>Activates the next option (pass in true to scroll if necessary too)</td>
  </tr>
  <tr>
    <td>sb.activatePreviousOption</td>
    <td>As above but reverse</td>
  </tr>
  <tr>
    <td>sb.deactivateOptions</td>
    <td>Makes no option be active</td>
  </tr>
  <tr>
    <td>sb.activateSelectedOptionAtIndex</td>
    <td>Activates the selected option at the index</td>
  </tr>
  <tr>
    <td>sb.activateNextSelectedOption</td>
    <td>Activates the next selected option</td>
  </tr>
  <tr>
    <td>sb.activatePreviousSelectedOption</td>
    <td>As above but reverse</td>
  </tr>
  <tr>
    <td>sb.deactivateSelectedOptions</td>
    <td>Makes no selected option be active</td>
  </tr>
</table>

<table>
  <caption>Yielded API properties</caption>
  <tr>
    <td width="200">sb.element</td>
    <td>The DOM element of the select box</td>
  </tr>
  <tr>
    <td>sb.value</td>
    <td>The selected value(s) of the select box</td>
  </tr>
</table>

<table>
  <caption>Yielded API propertes (template only)</caption>
  <tr width="200">
    <td>sb.isPending</td>
    <td>True whilst <code>value</code> is being resovled</td>
  </tr>
  <tr>
    <td>sb.isRejected</td>
    <td>True if <code>value</code> failed to resolve</td>
  </tr>
  <tr>
    <td>sb.isFulfilled</td>
    <td>True if <code>value</code> resolved</td>
  </tr>
  <tr>
    <td>sb.isSettled</td>
    <td>True once <code>value</code> has resolved or rejected</td>
  </tr>
  <tr>
    <td>sb.isSearching</td>
    <td>True if the promise returned from the <code>on-search</code> action is running</td>
  </tr>
  <tr>
    <td>sb.isSlowSearch</td>
    <td>True if the promised search results are taking a while</td>
  </tr>
  <tr>
    <td>sb.isOpen</td>
    <td>True if the select box is open</td>
  </tr>
</table>

<hr>

### Option

```handlebars
{{#sb.option value=model as |o|}}
  {{o.value.name}}
{{/sb.option}}
```

<table>
  <caption>Attributes</caption>
  <tr>
    <td width="200">selected</td>
    <td>Used for manually selecting an option. (Most of the time you won't need to use this because the options automatically know whether or not they are selected based on the value attrbute set on the select box component itself)</td>
  </tr>
  <tr>
    <td>name</td>
    <td></td>
  </tr>
  <tr>
    <td>title</td>
    <td></td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td></td>
  </tr>
  <tr>
    <td>disabled</td>
    <td></td>
  </tr>
  <tr>
    <td>size</td>
    <td></td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td></td>
  </tr>
  <tr>
    <td>aria-label</td>
    <td></td>
  </tr>
  <tr>
    <td>style</td>
    <td></td>
  </tr>
  <tr>
    <td>value</td>
    <td>Can be anything, including a promise</td>
  </tr>
  <tr>
    <td>label</td>
    <td>Used as the display text by default</td>
  </tr>
</table>

<table>
  <caption>Actions</caption>
  <tr>
    <td width="200">on-select</td>
    <td>Useful for firing one-off actions when an option is selected</td>
  </tr>
  <tr>
    <td>on-activate</td>
    <td>Fired when an individual option is activated</td>
  </tr>
</table>

<table>
  <caption>Yielded API properties (template only)</caption>
  <tr>
    <td>o.value</td>
    <td>The value of the option</td>
  </tr>
  <tr>
    <td>sb.isPending</td>
    <td>True whilst <code>value</code> is being resovled</td>
  </tr>
  <tr>
    <td>sb.isRejected</td>
    <td>True if <code>value</code> failed to resolve</td>
  </tr>
  <tr>
    <td>sb.isFulfilled</td>
    <td>True if <code>value</code> resolved</td>
  </tr>
  <tr>
    <td>sb.isSettled</td>
    <td>True once <code>value</code> has resolved or rejected</td>
  </tr>
  <tr>
    <td width="200">o.isSelected</td>
    <td>Whether or not the option is currently selected</td>
  </tr>
  <tr>
    <td>o.isDisabled</td>
    <td>Whether or not the option is currently disabled</td>
  </tr>
  <tr>
    <td>o.index</td>
    <td>The index of the option amongst the options</td>
  </tr>
</table>

<hr>

### Group

Self explanitory, just wraps the options in extra markup.<br>
(You can still navigate groups using the arrow keys / the API)

```handlebars
{{#sb.group label="Things"}}

{{/sb.group}}
```

<hr>

### Options

You only need to wrap the options up in with `sb.options` if you require extra markup for styling.

```handlebars
{{#sb.options}}
  {{#sb.option value=1}} One {{/sb.option}}
  {{#sb.option value=2}} Two {{/sb.option}}
{{/sb.options}}
```

<table>
  <caption>Attributes</caption§>
  <tr>
    <td width="200">style</td>
    <td>Useful for customising the style of the options container</td>
  </tr>
</table>

<hr>

### Input

Allows you to input text into the select box, usually for running searches/filtering

```handlebars
{{sb.input}}
```

<table>
  <caption>Actions</caption>
  <tr>
    <td width="200">on-input</td>
    <td>Fired when text is input</td>
  </tr>
  <tr>
    <td>on-delete</td>
    <td>Fired when there is no text present, but backspace is pressed</td>
  </tr>
  <tr>
    <td>on-clear</td>
    <td>Fired when text is cleared completely</td>
  </tr>
</table>

<table>
  <caption>Attributes</caption>
  <tr>
    <td width="200">type</td>
    <td>Sets the type of input text/search etc...</td>
  </tr>
  <tr>
    <td>value</td>
    <td></td>
  </tr>
  <tr>
    <td>size</td>
    <td></td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td></td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td></td>
  </tr>
  <tr>
    <td>readonly</td>
    <td></td>
  </tr>
  <tr>
    <td>disabled</td>
    <td></td>
  </tr>
</table>

<hr>

### Selected option

Does _not_ render the user's selected option automatically, but rather just provides a way for you to render the option(s) that have been selected.

```handlebars
{{#sb.selected-option value=model as |so|}}
  {{so.value.name}}
{{/sb.selected-option}}
```

<table>
  <caption>Actions</caption>
  <tr>
    <td width="200">on-activate</td>
    <td>Fired when a selected option is activated</td>
  </tr>
</table>

<table>
  <caption>Attributes</caption>
  <tr>
    <td width="200">title</td>
    <td></td>
  </tr>
  <tr>
    <td>style</td>
    <td></td>
  </tr>
</table>

<hr>

### Selected options

```handlebars
{{#sb.selected-options}}
  {{#each sb.value as |value|}}
    {{#sb.selected-option}}You chose this{{/sb.selected-option}}
  {{/each}}
{{/sb.selected-options}}
```

Provides a container for options that the user selected. Does not do anything by default, but it is possible to activate selected options using the API, thereby allowing you to create your own navigatable select box.

<table>
  <caption>Attributes</caption>
  <tr>
    <td width="200">style</td>
    <td>Useful for one-off styling of selected options</td>
  </tr>
</table>

<hr>

## API

This addon exposes the select box's API to you as an argument to action handlers like so:

```handlebars
{{select-box on-select=(action "selectedAnOption")}}
```

```javascript
actions: {
  selectedAnOption(value, api) {
    api.close(); // for example.
  }
}
```

<hr>

## Customising

There are 3 ways to get what you want

1. [compose](#compose) a new one
2. OR [extend](#extend) an existing one
3. <strike>OR create a new one from the mixins</strike>

Option 1 is recommended. Define your component like so...

```handlebars
{{#select-box value=value on-select=on-select class-prefix="my-select-box" as |sb|}}}
  {{#sb.selected-option click=sb.toggle}}
    {{sb.value.name}}
  {{/sb.selected-option}}
  {{yield sb}}
{{/select-box}}
```

...and then use it like this:

```handlebars
{{#my-select value=thing on-select=(action "selectedAThing") as |sb|}}
  {{#each things as |thing|}}
    {{#sb.option value=thing}}{{thing.name}}{{/sb.option}}
  {{/each}}
{{/my-select}}
```

...which will render...

```html
<div class="my-select">
  <div class="my-select-box">
    <div class="my-select-box-selected-option">Foo</div>
    <div class="my-select-box-option is-selected">Foo</div>
    <div class="my-select-box-option">Bar</div>
    <div class="my-select-box-option">Baz</div>
  </div>
</div>
```

<hr>

#### FAQ

* Question: Why aren't the native and faux select boxes two addons.<br>
* Answer: Less effort maintaining 1 addon!

* Question: Why would I not just use [Ember Power Select](https://github.com/cibernox/ember-power-select)?
* Answer: `ember-power-select` is powerful in that it is feature-full, whereas `ember-select-box` is flexible in that it is minimal.

#### Troubleshooting

* Problem: When I navigate using the arrow keys, the wrong option becomes active
* Solution: This may happen when you change the options that are displayed, because Ember will try to
re-use components. You can fix this by adding `key="@index"` to your `#each`.

* Problem: Rendering lots of options is slow.
* Solution: If your select box only uses _primitive_ values, you do not need to use `{{sb.option}}`, instead you can
use a plain old `<option>` element [[Example](tests/dummy/app/templates/fast-native-single-select.hbs)]. Which will be faster, because constructing components is expensive in Ember.
