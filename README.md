# ember-cli-select-box

<a href="http://emberobserver.com/addons/ember-cli-select-box"><img src="http://emberobserver.com/badges/ember-cli-select-box.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-cli-select-box#badge-embed"><img src="https://david-dm.org/amk221/ember-cli-select-box.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-cli-select-box#dev-badge-embed"><img src="https://david-dm.org/amk221/ember-cli-select-box/dev-status.svg"></a> &nbsp; <a href="https://codeclimate.com/github/amk221/ember-cli-select-box"><img src="https://codeclimate.com/github/amk221/ember-cli-select-box/badges/gpa.svg" /></a> &nbsp; <a href="http://travis-ci.org/amk221/ember-cli-select-box"><img src="https://travis-ci.org/amk221/ember-cli-select-box.svg?branch=master"></a> &nbsp; <a href="http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components"><img src="http://embadge.io/v1/badge.svg?label=ember&range=%3E=2.3.0"></a>

This Ember CLI addon provides you with a native HTML select component. But, it also comes with a faux-select box made from divs.

Select box solutions are rarely perfect for what you want. Rather than having a myriad of options to configure for every possible situation, `ember-cli-select-box` is designed so you can easily _compose your own_.

##### Things to note
* With just a few lines of code you can create an autocompleter using the [input](#input) component.
* Thanks to contextual components there is not a truth helper in sight.
* This project will never come with built-in styles.
* The select box's primitives are available to you via the yielded [API](#api) and as an argument to action handlers, so you should never feel held-back when creating your select box

##### Examples
* <a href="http://andrewkirwin.me/ember-cli-select-box/native-single-select" target="_blank">Demo of flexibility</a>
* <a href="https://github.com/amk221/ember-cli-select-box/tree/master/tests/dummy/app/components">Code for example scenarios</a>

##### FAQ
Q: Why aren't the native and faux select boxes two addons.<br>
A: Less effort maintaining 1 addon. Splitting out would be trivial though.



### Installation

```
ember install ember-cli-select-box
```

#### Native select box

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

Attributes:

* `value` used to determine which option is selected
* `multiple` if true, `value` should be an array
* `disabled` if true adds an `is-disabled` class
* `is-open` controls the open/closed state
* `on-select` will be fired when an option is clicked, or enter is pressed.
* `on-update` fired when the selected value is updated
* `on-search` fired when the select box decides to run a search
* `on-searched` fired after the last succesful search attempt
* `search-min-chars` prevents the on-search action from firing until there are enough chars (default 1)
* `search-delay-time` milliseconds to debounce the on-search action from firing (default 100)
* `search-slow-time` milliseconds considered for a search to be taking too long (default 500)
* `class-prefix` adds a prefix to the class name of all child select-box components
* `on-click-outside` useful for closing the select box
* `on-press-backspace`
* `on-press-tab`
* `on-press-enter`
* `on-press-escape`
* `on-press-left`
* `on-press-up`
* `on-press-right`
* `on-press-down`

Yielded API:

* `sb.isSearching` whether the promise returned from the `on-search` action is running
* `sb.isSlowSearch` true if the promised search results are taking a while
* `sb.open` opens the select box, adding `is-open` class name
* `sb.close` closes the select box removing the `is-open` class name
* `sb.toggle` opens or closes the select box
* `sb.select` selects an arbitrary value and fires the `on-select` action
* `sb.update` updates the selected value, but does not fire the `on-select` action
* `sb.selectActiveOption` selects the value of whichever option is currently active
* `sb.search` runs an arbitrary search using the search function provided by `on-search`
* `sb.stopSearching` 'cancels' searches currently in progress
* `sb.setInputValue` lets you update the input value, useful for when a selection has been made
* `sb.focusInput` focuses the input
* `sb.activateOptionAtIndex` adds an `is-active` class to the option at the index
* `sb.activateNextOption` activates the next option (pass in true to scroll if necessary too)
* `sb.activatePreviousOption` as above but reverse
* `sb.deactivateOptions` makes no option be active
* `sb.activateSelectedOptionAtIndex` activates the selected option at the index
* `sb.activateNextSelectedOption` activates the next selected option
* `sb.activatePreviousSelectedOption` as above but reverse
* `sb.deactivateSelectedOptions` makes no selected option be active

##### Option

```handlebars
{{sb.option value=1 label='One'}}
{{#sb.option value=2 label='Two' as |o|}}
  {{o.label}}
{{/sb.option}}
```

Attributes:

* `title`
* `style`
* `on-select` useful for firing one-off actions when an option is selected
* `on-activate`
* `value` can be anything
* `label` used as the display text by default
* `component` optional name of a component to use for the option's display text

Yielded API:

* `o.value` the value of the option
* `o.label` the label of the option
* `o.index` the index of the option amongst the options

##### Group

Self explanitory, just wraps the options in extra markup.

```handlebars
{{#sb.group label='Things'}}
  {{sb.option value=thing label=thing.name}}
{{/sb.group}}
```

##### Options

You only need to wrap the options up in with `sb.options` if you require extra markup for styling, or you want the options to be navigatable.

```handlebars
{{#sb.options}}
  {{sb.option value=1 label='One'}}
  {{sb.option value=2 label='Two'}}
{{/sb.options}}
```

Attributes:

* `style`


##### Input

Allows you to input text into the select box, usually for running searches/filtering

```handlebars
{{sb.input}}
```

Attributes:

* `type`
* `value`
* `size`
* `autofocus`
* `placeholder`
* `readonly`
* `disabled`
* `on-input` fired when text is input
* `on-delete` fired when there is no text, but backspace is pressed
* `on-clear` fired when text is cleared


##### Selected option

Does _not_ render the user's selected option automatically, but rather just provides a way for you to render the option(s) that have been selected.

```handlebars
{{sb.selected-option value=1 label='One'}}
{{#sb.selected-option value=2 label='Two' as |so|}}
  {{so.label}}
{{/sb.selected-option}}
```

Attributes:

* `title`
* `style`
* `on-activate`


##### Selected options

```handlebars
{{#sb.selected-options}}
  {{#sb.selected-option}}You chose this{{/sb.selected-option}}
  {{#sb.selected-option}}And this{{/sb.selected-option}}
{{/sb.selected-options}}
```

Attributes:

* `style`

Provides a container for options that the user selected. Does not do anything by default, but it is possible to activate selected options using the API, thereby allowing you to create your own navigatable select box.

### API

The select boxes that come with this addon expose an API to you as an argument to action handlers like so:

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


### Customising

There are 3 ways to get what you want

1. [compose](#compose) a new one
2. OR [extend](#extend) an existing one
3. OR create a new one from the [mixins](#mixins)

#### Compose
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

#### Extend
If you need even more flexibility, you can extend the select box:

```javascript
let MySelectBox = SelectBox.extend({
  click() {
    this.send('toggle');
  }
})
```

#### Mixins
if you need _even more_ flexibility you can create your own select box using the mixins

```javascript
let MySelectBox = Component.extend(BaseSelectBox, Toggleable, Searchable);
```

### Wormhole

ember-cli-select-box works well with <a href="https://github.com/yapplabs/ember-wormhole">ember-wormhole</a>. In most cases, this isn't needed - but it can be useful to render your `<options>`'s elsewhere in the DOM if you find yourself with `overflow:hidden` style issues for example.

```handlebars
{{#select-box class-prefix='worm-select' as |sb|}}
  {{#ember-wormhole to='destination'}}
    {{#sb.options}}
	   {{yield sb}}
    {{/sb.options}}
  {{/ember-wormhole}}
{{/select-box}}
```