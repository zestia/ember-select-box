import Route from 'ember-route-template';
import Example4 from '../components/example4';
import * as data from '../utils/data';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

class Example4Route extends Component {
  @tracked selected = [];

  get selectedString() {
    return this.selected.map((item) => item.name).join(', ');
  }

  handleSelect = (value) => (this.selected = value);

  <template>
    <p>
      A combobox that mimics a native select box, but which allows multiple
      selection. (There is no analogous control)
    </p>

    <p>
      Selected:
      {{this.selectedString}}
    </p>

    <Example4
      @value={{this.selected}}
      @options={{data.pies}}
      @onChange={{this.handleSelect}}
    >
      <:trigger>
        Pies
      </:trigger>
      <:option as |option|>
        {{option.name}}
      </:option>
    </Example4>
  </template>
}

export default Route(Example4Route);
