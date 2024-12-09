import SelectBox from '@zestia/ember-select-box/components/select-box';
import { fn } from '@ember/helper';

<template>
  <SelectBox
    class="example6"
    @value={{@value}}
    @onChange={{@onChange}}
    @onSearch={{@onSearch}}
    ...attributes
    as |sb|
  >
    <sb.Dropdown @onOpen={{fn sb.search ""}} as |dd|>
      <sb.Trigger>
        {{yield sb.value to="trigger"}}
      </sb.Trigger>

      {{#if dd.isOpen}}
        <dd.Content>
          <sb.Input />
          <sb.Options>
            {{#each sb.options as |value|}}
              <sb.Option @value={{value}}>
                {{yield value to="option"}}
              </sb.Option>
            {{else}}
              <sb.Option @disabled={{true}}>
                {{yield sb.query to="noOptions"}}
              </sb.Option>
            {{/each}}
          </sb.Options>
        </dd.Content>
      {{/if}}
    </sb.Dropdown>
  </SelectBox>
</template>
