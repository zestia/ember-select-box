import lifecycle from '../../modifiers/lifecycle.js';
import { modifier } from 'ember-modifier';

const popover = modifier((element, _, { source, isOpen }) => {
  if (isOpen) {
    element.showPopover({ source });
  }
  return () => element.hidePopover();
});

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
      style={{@style}}
      tabindex={{@tabindex}}
      popover="manual"
      {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}}
      {{popover source=@popoverTarget isOpen=@isOpen}}
      ...attributes
    >
      {{yield}}
    </div>
  </Destination>
</template>
