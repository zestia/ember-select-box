/* https://github.com/ember-cli/eslint-plugin-ember/issues/2035 */
/* eslint-disable no-unused-expressions */

import { uniqueId } from '@ember/helper';

<template>
  {{#let (uniqueId) as |labelId|}}
    <div
      aria-labelledby={{labelId}}
      class="select-box__group"
      role="group"
      ...attributes
    >
      <div class="select-box__group-label" id={{labelId}}>
        {{~@label~}}
      </div>
      <div class="select-box__group-options">
        {{~yield~}}
      </div>
    </div>
  {{/let}}
</template>
