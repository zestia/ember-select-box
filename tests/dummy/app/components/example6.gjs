import SelectBox from '@zestia/ember-select-box/components/select-box';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @action
  handleOpen(sb) {
    sb.search('');
  }

  <template>
    <SelectBox
      class="example6"
      @value={{@value}}
      @onChange={{@onChange}}
      @onOpen={{this.handleOpen}}
      @onSearch={{@onSearch}}
      ...attributes
      as |sb|
    >
      <sb.Trigger>
        {{yield sb.value to="trigger"}}
      </sb.Trigger>

      {{#if sb.isOpen}}
        <div class="example6__dropdown">
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
        </div>
      {{/if}}
    </SelectBox>
  </template>
}
