import { on } from '@ember/modifier';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

<template>
  {{! template-lint-disable no-positive-tabindex require-aria-activedescendant-tabindex no-redundant-role }}
  <input
    aria-activedescendant="{{@aria-activedescendant}}"
    aria-busy="{{@aria-busy}}"
    aria-controls="{{@aria-controls}}"
    aria-expanded="{{@aria-expanded}}"
    class="select-box__input"
    disabled={{@disabled}}
    role="combobox"
    tabindex={{@tabindex}}
    {{on "input" @onInput}}
    {{on "keydown" @onKeyDown}}
    {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
    ...attributes
  />
</template>
