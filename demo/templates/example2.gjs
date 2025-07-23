import Route from 'ember-route-template';
import Example2 from '../components/example2';
import * as data from '../utils/data';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

class Example2Route extends Component {
  @tracked selected = [];

  get selectedString() {
    return this.selected.map((item) => item.name).join(', ');
  }

  handleSelect = (value) => (this.selected = value);

  <template>
    <p>
      A listbox that mimics a native multiple select box with option groups
    </p>

    <p>
      Selected:
      {{this.selectedString}}
    </p>

    <Example2 @value={{this.selected}} @onChange={{this.handleSelect}} as |sb|>
      <sb.Group @label="Cakes">
        {{#each data.cakes as |cake|}}
          <sb.Option @value={{cake}}>
            {{cake.name}}
          </sb.Option>
        {{/each}}
      </sb.Group>
      <sb.Group @label="Biscuits">
        {{#each data.biscuits as |biscuit|}}
          <sb.Option @value={{biscuit}}>
            {{biscuit.name}}
          </sb.Option>
        {{/each}}
      </sb.Group>
    </Example2>
  </template>
}

export default Route(Example2Route);
