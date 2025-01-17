import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

const Destination = <template>
  {{#if @destination}}
    {{#in-element @destination insertBefore=null}}
      {{yield}}
    {{/in-element}}
  {{else}}
    {{yield}}
  {{/if}}
</template>;

<template>
  {{! template-lint-disable no-positive-tabindex }}
  <Destination @destination={{@destination}}>
    <div
      class="dropdown__content"
      tabindex={{@tabindex}}
      {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
      ...attributes
    >
      {{yield}}
    </div>
  </Destination>
</template>
