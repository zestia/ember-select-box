import SelectBox from '@zestia/ember-select-box/components/select-box';

<template>
  <SelectBox
    class="example1"
    @value={{@value}}
    @onChange={{@onChange}}
    ...attributes
    as |sb|
  >
    <sb.Options>
      {{#each @options as |value|}}
        <sb.Option @value={{value}}>
          {{value.name}}
        </sb.Option>
      {{/each}}
    </sb.Options>
  </SelectBox>
</template>
