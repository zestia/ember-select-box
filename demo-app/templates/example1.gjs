import Route from 'ember-route-template';
import Example1 from '../components/example1';
import * as data from '../utils/data';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

class Example1Route extends Component {
  @tracked selected;

  handleSelect = (value) => (this.selected = value);

  <template>
    <p>
      A listbox that mimics a native single select box with a
      <code>size</code>
      greater than zero.
    </p>

    <p>
      Selected:
      {{this.selected.name}}
    </p>

    <Example1
      @value={{this.selected}}
      @options={{data.biscuits}}
      @onChange={{this.handleSelect}}
    >
      <:option as |option|>
        {{option.name}}
      </:option>
    </Example1>
  </template>
}

export default Route(Example1Route);
