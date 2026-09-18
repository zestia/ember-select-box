import { on } from '@ember/modifier';
import { uniqueId } from '@ember/helper';
import lifecycle from '../../modifiers/lifecycle.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

var SelectBoxOptions = setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-positive-tabindex require-aria-activedescendant-tabindex --}}\n{{#let (uniqueId) as |id|}}\n  <div aria-activedescendant=\"{{@aria-activedescendant}}\" aria-multiselectable=\"{{@aria-multiselectable}}\" class=\"select-box__options\" id={{id}} role=\"listbox\" tabindex={{@tabindex}} {{on \"keydown\" @onKeyDown}} {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}} ...attributes>\n    {{~yield~}}\n  </div>\n{{/let}}", {
  strictMode: true,
  scope: () => ({
    uniqueId,
    on,
    lifecycle
  })
}), templateOnly());

export { SelectBoxOptions as default };
//# sourceMappingURL=options.js.map
