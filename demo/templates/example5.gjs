import Route from 'ember-route-template';
import Example5 from '../components/example5';
import * as data from '../utils/data';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

class Example5Route extends Component {
  @tracked selected = [];

  get pies() {
    return data.breads.map((bread) => bread.name);
  }

  handleSelect = (items) => {
    this.selected = items;
  };

  handleUnSelect = (item) => {
    this.selected = this.selected.filter((i) => i !== item);
  };

  <template>
    <p>
      A combobox that mimics a multiple native select box, but which allows
      searching.
    </p>

    <p>
      Selected:
      {{#each this.selected as |selected|}}
        {{selected}}
        <button type="button" {{on "click" (fn this.handleUnSelect selected)}}>
          ×
        </button>
      {{/each}}
    </p>

    <Example5
      @value={{this.selected}}
      @options={{this.pies}}
      @onChange={{this.handleSelect}}
    />
  </template>
}

export default Route(Example5Route);
