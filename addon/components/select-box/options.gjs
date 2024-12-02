import { on } from '@ember/modifier';
import { uniqueId } from '@ember/helper';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

<template>
  {{! template-lint-disable no-positive-tabindex no-pointer-down-event-binding }}
  {{#let (uniqueId) as |id|}}
    <div
      aria-multiselectable="{{@aria-multiselectable}}"
      class="select-box__options"
      id={{id}}
      role="listbox"
      tabindex={{@tabindex}}
      {{on "keydown" @onKeyDown}}
      {{on "mousedown" @onMouseDown}}
      {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
      ...attributes
    >
      {{~yield~}}
    </div>
  {{/let}}
</template>
