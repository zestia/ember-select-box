import { uniqueId } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

var SelectBoxGroup = setComponentTemplate(precompileTemplate("{{#let (uniqueId) as |labelId|}}\n  <div aria-labelledby={{labelId}} class=\"select-box__group\" role=\"group\" ...attributes>\n    <div class=\"select-box__group-label\" id={{labelId}}>\n      {{~@label~}}\n    </div>\n    <div class=\"select-box__group-options\">\n      {{~yield~}}\n    </div>\n  </div>\n{{/let}}", {
  strictMode: true,
  scope: () => ({
    uniqueId
  })
}), templateOnly());

export { SelectBoxGroup as default };
//# sourceMappingURL=group.js.map
