import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

<template>
  <div
    class="dropdown__content"
    {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
    ...attributes
  >
    {{yield}}
  </div>
</template>
