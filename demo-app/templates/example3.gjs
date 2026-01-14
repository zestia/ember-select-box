import Route from 'ember-route-template';
import Example3 from '../components/example3';
import * as data from '../utils/data';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

class Example3Route extends Component {
  @tracked selected = [];

  handleSelect = (value) => (this.selected = value);

  <template>
    <p>
      A combobox that mimics a native single select box
    </p>

    <p>
      Selected:
      {{this.selected.name}}
    </p>

    <Example3
      @value={{this.selected}}
      @options={{data.pies}}
      @onChange={{this.handleSelect}}
    >
      <:trigger as |value|>
        {{if value value.name "None"}}
      </:trigger>
      <:option as |option|>
        {{option.name}}
      </:option>
    </Example3>
  </template>
}

export default Route(Example3Route);
