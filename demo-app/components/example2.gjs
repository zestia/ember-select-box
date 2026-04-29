import SelectBox from '#src/components/select-box';

<template>
  <SelectBox
    class="example2"
    @value={{@value}}
    @multiple={{true}}
    @onChange={{@onChange}}
    ...attributes
    as |sb|
  >
    <sb.Options>
      {{yield sb}}
    </sb.Options>
  </SelectBox>
</template>
