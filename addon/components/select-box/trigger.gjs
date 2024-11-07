import { on } from '@ember/modifier';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

<template>
  {{! template-lint-disable no-positive-tabindex require-aria-activedescendant-tabindex no-pointer-down-event-binding }}
  <div
    aria-activedescendant="{{@aria-activedescendant}}"
    aria-busy="{{@aria-busy}}"
    aria-controls="{{@aria-controls}}"
    aria-disabled="{{@aria-disabled}}"
    aria-expanded="{{@aria-expanded}}"
    class="select-box__trigger"
    role="{{@role}}"
    tabindex={{@tabindex}}
    {{on "mousedown" @onMouseDown}}
    {{on "keydown" @onKeyDown}}
    {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
    ...attributes
  >
    {{~yield~}}
  </div>
</template>
