import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';
import { on } from '@ember/modifier';

<template>
  <div
    class="dropdown__content"
    {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
    ...attributes
  >
    {{yield}}
  </div>
</template>
