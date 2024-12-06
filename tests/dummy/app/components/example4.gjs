import SelectBox from '@zestia/ember-select-box/components/select-box';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @action
  preventDefault(event) {
    event.preventDefault();
  }

  <template>
    <SelectBox
      class="example4"
      @value={{@value}}
      @multiple={{true}}
      @onChange={{@onChange}}
      ...attributes
      as |sb|
    >
      <sb.Dropdown as |dd|>
        <sb.Trigger>
          {{yield sb.value to="trigger"}}
        </sb.Trigger>
        <dd.Content>
          <sb.Options>
            {{#each @options as |value|}}
              <sb.Option @value={{value}} as |option|>
                <input
                  aria-hidden="true"
                  aria-labelledby={{option.id}}
                  checked={{option.isSelected}}
                  tabindex="-1"
                  type="checkbox"
                  {{on "click" this.preventDefault}}
                />
                {{yield value to="option"}}
              </sb.Option>
            {{/each}}
          </sb.Options>
        </dd.Content>
      </sb.Dropdown>
    </SelectBox>
  </template>
}
