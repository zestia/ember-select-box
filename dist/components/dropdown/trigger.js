import { on } from '@ember/modifier';
import lifecycle from '../../modifiers/lifecycle.js';
import { concat } from '@ember/helper';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class DropdownTrigger extends Component {
  handleInsert = element => {
    this.args.onInsert?.(element);
    this.args.onInsertClosure?.(element);
  };
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-positive-tabindex require-aria-activedescendant-tabindex no-pointer-down-event-binding --}}\n<div class={{concat \"dropdown__trigger\" (if @class (concat \" \" @class))}} aria-haspopup=\"{{@aria-haspopup}}\" aria-activedescendant=\"{{@aria-activedescendant}}\" aria-busy=\"{{@aria-busy}}\" aria-controls=\"{{@aria-controls}}\" aria-disabled=\"{{@aria-disabled}}\" aria-expanded=\"{{@aria-expanded}}\" role=\"{{@role}}\" style={{@style}} tabindex=\"{{@tabindex}}\" {{on \"mousedown\" @onMouseDown}} {{on \"keydown\" @onKeyDown}} {{lifecycle onInsert=this.handleInsert onDestroy=@onDestroy}} ...attributes>\n  {{~yield~}}\n</div>", {
      strictMode: true,
      scope: () => ({
        concat,
        on,
        lifecycle
      })
    }), this);
  }
}

export { DropdownTrigger as default };
//# sourceMappingURL=trigger.js.map
