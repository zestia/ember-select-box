import { on } from '@ember/modifier';
import { uniqueId } from '@ember/helper';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

<template>
  {{! template-lint-disable no-positive-tabindex }}
  {{#let (uniqueId) as |id|}}
    <div
      aria-multiselectable="{{@aria-multiselectable}}"
      class="select-box__options"
      id={{id}}
      role="listbox"
      tabindex={{@tabindex}}
      ...attributes
      {{on "keydown" @onKeyDown}}
      {{on "focus" @onFocus}}
      {{lifecycle @onInsert @onDestroy}}
    >
      {{~yield~}}
    </div>
  {{/let}}
</template>
