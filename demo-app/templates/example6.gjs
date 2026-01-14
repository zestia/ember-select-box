import Route from 'ember-route-template';
import Example6 from '../components/example6';
import * as data from '../utils/data';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { filter } from '@zestia/ember-select-box/utils';

const search = (query) => filter(data.breads).by('name').query(query).run();

class Example6Route extends Component {
  @tracked selected = [];

  handleSelect = (value) => (this.selected = value);

  <template>
    <p>
      A variation of combobox with an input for synchronous filtering
    </p>

    <p>
      Selected:
      {{this.selected.name}}
    </p>

    <Example6
      @value={{this.selected}}
      @onSearch={{search}}
      @onChange={{this.handleSelect}}
    >
      <:trigger as |value|>
        {{if value value.name "None"}}
      </:trigger>
      <:option as |option|>
        {{option.name}}
      </:option>
      <:noOptions as |query|>
        No pies match "{{query}}"
      </:noOptions>
    </Example6>
  </template>
}

export default Route(Example6Route);
