import SelectBox from '@zestia/ember-select-box/components/select-box';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @action
  buildSelection(newValue, oldValue) {
    const value = [...oldValue];

    if (!value.includes(newValue)) {
      value.push(newValue);
    }

    return value;
  }

  <template>
    <SelectBox
      class="example5"
      @value={{@value}}
      @options={{@options}}
      @multiple={{true}}
      @onSearch={{@onFilter}}
      @onBuildSelection={{this.buildSelection}}
      @onChange={{@onChange}}
      ...attributes
      as |sb|
    >
      <sb.Input type="search" aria-expanded="true" />
      <sb.Options>
        {{#each sb.options as |value|}}
          <sb.Option @value={{value}}>
            {{value}}
          </sb.Option>
        {{/each}}
      </sb.Options>
    </SelectBox>
  </template>
}
