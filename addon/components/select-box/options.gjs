/* https://github.com/ember-cli/eslint-plugin-ember/issues/2035 */
/* eslint-disable no-unused-expressions */

import { on } from '@ember/modifier';
import { uniqueId } from '@ember/helper';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

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
      {{didInsert @onInsert}}
      {{willDestroy @onDestroy}}
      {{on "keydown" @onKeyDown}}
    >
      {{~yield~}}
    </div>
  {{/let}}
</template>
