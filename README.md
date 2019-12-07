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

## Example

To create _your own_ select box, make a new component that renders a select box:

```handlebars
{{! foo-select.hbs }}
<SelectBox
  @value={{@value}}
  @onSelect={{@onSelect}}
  @classNamePrefix="foo-select" as |sb|
>
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
{{! application.hbs }}
<FooSelect
  @value={{foo}}
  @onSelect={{this.selectFoo}} as |sb|
>
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

## Docs

- [List of components](docs/components.md)
- [Frequently asked questions](docs/faq.md)
- [High level overview of how it works](docs/how-it-works.md)
- [Test helpers](docs/test-helpers.md)
- [Troubleshooting](troubleshooting.md)
