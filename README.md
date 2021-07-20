# @zestia/ember-select-box

<p>
  <!--
  <a href="https://github.com/zestia/ember-select-box/actions/workflows/ci.yml">
    <img src="https://github.com/zestia/ember-select-box/actions/workflows/ci.yml/badge.svg">
  </a>
  -->

  <a href="https://david-dm.org/zestia/ember-select-box#badge-embed">
    <img src="https://david-dm.org/zestia/ember-select-box.svg">
  </a>

  <a href="https://david-dm.org/zestia/ember-select-box#dev-badge-embed">
    <img src="https://david-dm.org/zestia/ember-select-box/dev-status.svg">
  </a>

  <a href="https://emberobserver.com/addons/@zestia/ember-select-box">
    <img src="https://emberobserver.com/badges/-zestia-ember-select-box.svg">
  </a>

  <img src="https://img.shields.io/badge/Ember-%3E%3D%203.20.5-brightgreen">
</p>

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
- Will never come with built-in styles ✔︎
- Ember Data friendly ✔︎
- Full control at all times with the API ✔︎
- Native-like typeahead behaviour ✔︎
- Very few issues over many years of Ember! ✔︎
- Easily create an autocompleter ✔︎
- Easily create a dropdown menu ✔︎

## Example

To create _your own_ select box, make a new component that renders a select box:

```handlebars
{{! foo-select.hbs }}
<SelectBox
  class="foo"
  @value={{@value}}
  @onSelect={{@onSelect}} as |sb|
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
  @value={{this.foo1}}
  @onSelect={{this.handleSelectFoo}} as |sb|
>
  {{#each this.foos as |foo|}}
    <sb.Option @value={{foo}}>{{foo.name}}</sb.Option>
  {{/each}}
</FooSelect>
```

...which will render...

```html
<div class="select-box foo">
  <div class="select-box__selected-option">Foo 1</div>
  <div class="select-box__options">
    <div class="select-box__option">Foo 1</div>
    <div class="select-box__option">Foo 2</div>
    <div class="select-box__option">Foo 3</div>
  </div>
</div>
```

...as you can see, apart from being able to select a value - this addon does very little out of the box! It's up to _you_ to add the layer of behaviour that you require using the [API](docs/components.md).

## Docs

- [List of components and their arguments](docs/components.md)
- [High level overview of how it works](docs/how-it-works.md)
- [Test helpers](docs/test-helpers.md)
- [Troubleshooting](docs/troubleshooting.md)
