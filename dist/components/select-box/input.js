import { on } from '@ember/modifier';
import lifecycle from '../../modifiers/lifecycle.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

var SelectBoxInput = setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-positive-tabindex require-aria-activedescendant-tabindex no-redundant-role --}}\n<input aria-activedescendant=\"{{@aria-activedescendant}}\" aria-busy=\"{{@aria-busy}}\" aria-controls=\"{{@aria-controls}}\" aria-expanded=\"{{@aria-expanded}}\" class=\"select-box__input\" disabled={{@disabled}} role=\"combobox\" tabindex={{@tabindex}} {{on \"input\" @onInput}} {{on \"keydown\" @onKeyDown}} {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}} ...attributes />", {
  strictMode: true,
  scope: () => ({
    on,
    lifecycle
  })
}), templateOnly());

export { SelectBoxInput as default };
//# sourceMappingURL=input.js.map
