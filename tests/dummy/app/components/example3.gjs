import SelectBox from '@zestia/ember-select-box/components/select-box';

<template>
  <SelectBox
    class="example3"
    @value={{@value}}
    @onChange={{@onChange}}
    ...attributes
    as |sb|
  >
    <sb.Dropdown>
      <sb.Trigger>
        {{yield sb.value to="trigger"}}
      </sb.Trigger>
      <sb.Content>
        <sb.Options>
          {{#each @options as |value|}}
            <sb.Option @value={{value}}>
              {{yield value to="option"}}
            </sb.Option>
          {{/each}}
        </sb.Options>
      </sb.Content>
    </sb.Dropdown>
  </SelectBox>
</template>
