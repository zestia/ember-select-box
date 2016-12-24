# ember-select-box

<a href="http://emberobserver.com/addons/ember-select-box"><img src="http://emberobserver.com/badges/ember-select-box.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-select-box#badge-embed"><img src="https://david-dm.org/amk221/ember-select-box.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-select-box#dev-badge-embed"><img src="https://david-dm.org/amk221/ember-select-box/dev-status.svg"></a> &nbsp; <a href="https://codeclimate.com/github/amk221/ember-select-box"><img src="https://codeclimate.com/github/amk221/ember-select-box/badges/gpa.svg" /></a> &nbsp; <a href="http://travis-ci.org/amk221/ember-select-box"><img src="https://travis-ci.org/amk221/ember-select-box.svg?branch=master"></a> &nbsp; <a href="http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components"><img src="http://embadge.io/v1/badge.svg?label=ember&range=%3E=2.3.0"></a>


Select box solutions are rarely perfect for what you want.

They come with a myriad of options to configure every possible situation, and they make too many assumptions about how your select-box behaves.

This addon does less, and gives you the primitives to easily _compose your own_.



* **[Ways to achieve what you want](#customising)**
* <a href="http://andrewkirwin.co.uk/ember-select-box/native-single-select" target="_blank">Example scenarios</a>
* <a href="https://github.com/amk221/ember-select-box/tree/master/tests/dummy/app/components" target="_blank">Code for example scenarios</a>
* [Things to note](#things-to-note)
* [FAQ](#faq)


### Installation

```
ember install ember-select-box
```

<hr>

#### Native select box
[Read more](#native-select-box-info)

```handlebars
{{#select-box/native as |sb|}}
  {{sb.option value=1 label='One'}}
  {{sb.option value=2 label='Two'}}
  {{sb.option value=3 label='Three'}}
{{/select-box/native}}
```

#### Faux Select box

```handlebars
{{#select-box as |sb|}}
  {{sb.option value=1 label='One'}}
  {{sb.option value=2 label='Two'}}
  {{sb.option value=3 label='Three'}}
{{/select-box}}
```

<details>
  <summary>View attributes</summary>
  <table>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>value</td>
      <td>Used to determine which option is selected, can be a promise</td>
    </tr>
    <tr>
      <td>multiple</td>
      <td>If true, `value` should be an array</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>If true adds an `is-disabled` class</td>
    </tr>
    <tr>
      <td>is-open</td>
      <td>Controls the open/closed state</td>
    </tr>
    <tr>
      <td>on-select</td>
      <td>
        Fired when an option is clicked, or enter is pressed regardless as
        to whether the value changed or not.<br>
        Subsequently fired by use of the `select` API.
      </td>
    </tr>
    <tr>
      <td>on-update</td>
      <td>
        Fired once upon initialisation of the select box (as its initial value is set).<br>
        Subsequently fired by use of the `update` API or if the value attribute changes.
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
    <tr>
      <td>class-prefix</td>
      <td>Adds a prefix to the class name of all child select-box components</td>
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
      <td>Useful for navigating multi-select boxes</td>
    </tr>
    <tr>
      <td>on-press-up</td>
      <td>Useful for navigating up</td>
    </tr>
    <tr>
      <td>on-press-right</td>
      <td>Useful for navigating multi-select boxes</td>
    </tr>
    <tr>
      <td>on-press-down</td>
      <td>Useful for navigating down</td>
    </tr>
  </table>
</details>

<details>
  <summary>View yielded API</summary>
  <table>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>sb.isSearching</td>
      <td>Whether the promise returned from the `on-search` action is running</td>
    </tr>
    <tr>
      <td>sb.isSlowSearch</td>
      <td>True if the promised search results are taking a while</td>
    </tr>
    <tr>
      <td>sb.open</td>
      <td>Opens the select box, adding `is-open` class name</td>
    </tr>
    <tr>
      <td>sb.close</td>
      <td>Closes the select box removing the `is-open` class name</td>
    </tr>
    <tr>
      <td>sb.toggle</td>
      <td>Opens or closes the select box</td>
    </tr>
    <tr>
      <td>sb.select</td>
      <td>Selects an arbitrary value and fires the `on-select` action</td>
    </tr>
    <tr>
      <td>sb.update</td>
      <td>Updates the selected value, but does not fire the `on-select` action</td>
    </tr>
    <tr>
      <td>sb.selectActiveOption</td>
      <td>Selects the value of whichever option is currently active</td>
    </tr>
    <tr>
      <td>sb.search</td>
      <td>Runs an arbitrary search using the search function provided by `on-search`</td>
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
      <td>sb.activateOptionAtIndex</td>
      <td>Adds an `is-active` class to the option at the index</td>
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
</details>

<hr>

#### Option

```handlebars
{{sb.option value=1 label='One'}}

{{#sb.option value=2 label='Two' as |o|}}
  {{o.label}}
{{/sb.option}}
```

<details>
  <summary>View attributes</summary>
  <table>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>selected</td>
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
      <td>multiple</td>
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
    <tr>
      <td>on-select</td>
      <td>Useful for firing one-off actions when an option is selected</td>
    </tr>
    <tr>
      <td>on-activate</td>
      <td>Fired when an individual option is activated</td>
    </tr>
  </table>
</details>

<details>
  <summary>View yielded API</summary>
  <table>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>o.selected</td>
      <td>Whether or not the option is currently selected</td>
    </tr>
    <tr>
      <td>o.value</td>
      <td>The value of the option</td>
    </tr>
    <tr>
      <td>o.label</td>
      <td>The label of the option</td>
    </tr>
    <tr>
      <td>o.index</td>
      <td>The index of the option amongst the options</td>
    </tr>
  </table>
</details>

<hr>

#### Group

Self explanitory, just wraps the options in extra markup.

```handlebars
{{#sb.group label='Things'}}
  {{sb.option value=thing label=thing.name}}
{{/sb.group}}
```

<hr>

#### Options

You only need to wrap the options up in with `sb.options` if you require extra markup for styling, or you want the options to be navigatable.

```handlebars
{{#sb.options}}
  {{sb.option value=1 label='One'}}
  {{sb.option value=2 label='Two'}}
{{/sb.options}}
```

<details>
  <summary>View attributes</summary>
  <table>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>style</td>
      <td>Useful for customising the style of the options container</td>
    </tr>
  </table>
</details>

<hr>

#### Input

Allows you to input text into the select box, usually for running searches/filtering

```handlebars
{{sb.input}}
```

<details>
  <summary>View attributes</summary>
  <table>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>type</td>
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
    <tr>
      <td>on-input</td>
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
</details>

<hr>

#### Selected option

Does _not_ render the user's selected option automatically, but rather just provides a way for you to render the option(s) that have been selected.

```handlebars
{{sb.selected-option value=1 label='One'}}

{{#sb.selected-option value=2 label='Two' as |so|}}
  {{so.label}}
{{/sb.selected-option}}
```

<details>
  <summary>View attributes</summary>
  <table>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>title</td>
      <td></td>
    </tr>
    <tr>
      <td>style</td>
      <td></td>
    </tr>
    <tr>
      <td>on-activate</td>
      <td>Fired when a selected option is activated</td>
    </tr>
  </table>
</details>

<hr>

#### Selected options

```handlebars
{{#sb.selected-options}}
  {{#sb.selected-option}}You chose this{{/sb.selected-option}}
  {{#sb.selected-option}}And this{{/sb.selected-option}}
{{/sb.selected-options}}
```

Provides a container for options that the user selected. Does not do anything by default, but it is possible to activate selected options using the API, thereby allowing you to create your own navigatable select box.

<details>
  <summary>View attributes</summary>
  <table>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>style</td>
      <td>Useful for one-off styling of selected options</td>
    </tr>
  </table>
</details>

<hr>

### API

The select boxes that come with this addon exposes an API to you as an argument to action handlers like so:

```handlebars
{{select-box on-select=(action 'selectedAnOption')}}
```

```javascript
actions: {
  selectedAnOption(value, api) {
    api.close(); // for example.
  }
}
```

<hr>

### Customising

There are 3 ways to get what you want

1. [compose](#compose) a new one
2. OR [extend](#extend) an existing one
3. OR create a new one from the [mixins](#mixins)

##### Compose
It's recommended that you compose your own select box like so :

```handlebars
{{#select-box value=attrs.value on-select=attrs.on-select class-prefix='my-select-box' as |sb|}}}
  {{sb.selected-option label=sb.value.name}}
  <button onclick={{action sb.toggle}}>Toggle</button>
  {{yield sb}}
{{/select-box}}
```

...and then use it like this:

```handlebars
{{#my-select value=thing on-select=(action 'selectedAThing') as |sb|}}
  {{#each things as |thing|}}
    {{sb.option value=thing label=thing.name}}
  {{/each}}
{{/my-select}}
```

...will render...

```html
<div class="my-select">
  <div class="my-select-box">
    <div class="my-select-box-selected-option">Foo</div>
    <button>Toggle</button>
    <div class="my-select-box-option is-selected">Foo</div>
    <div class="my-select-box-option">Bar</div>
    <div class="my-select-box-option">Baz</div>
  </div>
</div>
```

##### Extend
If you need even more flexibility, you can extend the select box:

```javascript
const MySelectBox = SelectBox.extend({
  click() {
    this.send('toggle');
  }
})
```

##### Mixins
if you need _even more_ flexibility you can create your own select box using the mixins

```javascript
const MySelectBox = Component.extend(BaseSelectBox, Toggleable, Searchable);
```

<hr>

### Wormhole

ember-select-box works well with <a href="https://github.com/yapplabs/ember-wormhole">ember-wormhole</a>. In most cases, this isn't needed - but it can be useful to render your `<options>`'s elsewhere in the DOM if you find yourself with `overflow:hidden` style issues for example.

```handlebars
{{#select-box class-prefix='worm-select' as |sb|}}
  {{#ember-wormhole to='destination'}}
    {{#sb.options}}
	   {{yield sb}}
    {{/sb.options}}
  {{/ember-wormhole}}
{{/select-box}}
```

### Native Select Box info

Rendering lots of components in Ember can be slow. If your select box only
uses primitive values, you do not need to use `{{sb.option}}`, instead you can
use a plain old `<option>` element [[Example](tests/dummy/app/templates/fast-native-single-select.hbs)].

<hr>

##### Things to note
* With just a few lines of code you can create an autocompleter using the [input](#input) component.
* Thanks to contextual components there is not a truth helper in sight.
* This project will never come with built-in styles.
* The select box's primitives are available to you via the yielded [API](#api) and as an argument to action handlers, so you should never feel held-back when creating your select box

<hr>

##### FAQ
Q: Why aren't the native and faux select boxes two addons.<br>
A: Less effort maintaining 1 addon. Splitting out would be trivial though.
