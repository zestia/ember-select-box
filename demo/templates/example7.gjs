import Route from 'ember-route-template';
import Example7 from '../components/example7';
import * as data from '../utils/data';
import wait from '../utils/wait';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { filter } from '@zestia/ember-select-box/utils';

const search = async (query) => {
  await wait(300);

  return filter(data.pastries).by('name').query(query).run();
};

class Example7Route extends Component {
  @tracked selected = [];

  handleSelect = (value) => (this.selected = value);

  <template>
    <p>
      A variation of combobox with an input for asynchronous searching
    </p>

    <p>
      Selected:
      {{this.selected.name}}
    </p>

    <Example7
      @onSearch={{search}}
      @onChange={{this.handleSelect}}
      @placeholder="Search..."
    >
      <:busy>
        Please wait...
      </:busy>
      <:option as |option|>
        {{option.name}}
      </:option>
      <:noOptions as |query|>
        No pies match "{{query}}"
      </:noOptions>
    </Example7>
  </template>
}

export default Route(Example7Route);
