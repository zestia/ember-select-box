/* https://github.com/ember-cli/eslint-plugin-ember/issues/2035 */
/* eslint-disable no-unused-expressions */

import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

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
    {{didInsert @onInsert}}
    {{willDestroy @onDestroy}}
    {{on "mousedown" @onMouseDown}}
    {{on "keydown" @onKeyDown}}
    ...attributes
  >
    {{~yield~}}
  </div>
</template>
