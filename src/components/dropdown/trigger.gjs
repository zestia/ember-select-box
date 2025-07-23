import { on } from '@ember/modifier';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';
import { concat } from '@ember/helper';
import Component from '@glimmer/component';

export default class DropdownTrigger extends Component {
  handleInsert = (element) => {
    this.args.onInsert?.(element);
    this.args.onInsertClosure?.(element);
  };

  <template>
    {{! template-lint-disable no-positive-tabindex require-aria-activedescendant-tabindex no-pointer-down-event-binding }}
    <div
      class={{concat "dropdown__trigger" (if @class (concat " " @class))}}
      aria-haspopup="{{@aria-haspopup}}"
      aria-activedescendant="{{@aria-activedescendant}}"
      aria-busy="{{@aria-busy}}"
      aria-controls="{{@aria-controls}}"
      aria-disabled="{{@aria-disabled}}"
      aria-expanded="{{@aria-expanded}}"
      role="{{@role}}"
      tabindex="{{@tabindex}}"
      {{on "mousedown" @onMouseDown}}
      {{on "keydown" @onKeyDown}}
      {{lifecycle onInsert=this.handleInsert onDestroy=@onDestroy}}
      ...attributes
    >
      {{~yield~}}
    </div>
  </template>
}
