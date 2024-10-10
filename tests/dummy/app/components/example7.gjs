import SelectBox from '@zestia/ember-select-box/components/select-box';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked inputValue = '';

  @action
  handleOpen(sb) {
    sb.search(sb.query);
  }

  @action
  handleSelect(sb) {
    this.inputValue = '';
    sb.search('');
  }

  <template>
    <SelectBox
      class="example7"
      @value={{@value}}
      @onChange={{@onChange}}
      @onSelect={{this.handleSelect}}
      @onOpen={{this.handleOpen}}
      @onSearch={{@onSearch}}
      ...attributes
      as |sb|
    >
      <div class="example7__wrapper">
        <sb.Input
          value={{this.inputValue}}
          placeholder={{@placeholder}}
          {{on "input" sb.open}}
        />

        <sb.Trigger>
          {{if sb.isOpen "↑" "↓"}}
        </sb.Trigger>
      </div>

      {{#if sb.isOpen}}
        <sb.Options>
          {{#if sb.isBusy}}
            <sb.Option @disabled={{true}}>
              {{yield to="busy"}}
            </sb.Option>
          {{else if sb.options}}
            {{#each sb.options as |value|}}
              <sb.Option @value={{value}}>
                {{yield value to="option"}}
              </sb.Option>
            {{/each}}
          {{else}}
            <sb.Option @disabled={{true}}>
              {{yield sb.query to="noOptions"}}
            </sb.Option>
          {{/if}}
        </sb.Options>
      {{/if}}
    </SelectBox>
  </template>
}
