/* https://github.com/ember-cli/eslint-plugin-ember/issues/2035 */
/* eslint-disable no-unused-expressions */

import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

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
    {{didInsert @onInsert}}
    {{willDestroy @onDestroy}}
    {{on "input" @onInput}}
    {{on "keydown" @onKeyDown}}
    ...attributes
  />
</template>
