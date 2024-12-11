import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

<template>
  {{! template-lint-disable no-positive-tabindex }}
  <div
    class="dropdown__content"
    tabindex={{@tabindex}}
    {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
    ...attributes
  >
    {{yield}}
  </div>
</template>
