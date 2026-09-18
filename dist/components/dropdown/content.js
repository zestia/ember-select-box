import lifecycle from '../../modifiers/lifecycle.js';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const popover = modifier((element, _, {
  enabled,
  source,
  isOpen
}) => {
  if (isOpen && enabled) {
    element.showPopover({
      source
    });
  }
  return () => enabled && element.hidePopover();
});
const Destination = setComponentTemplate(precompileTemplate("{{#if @destination}}\n  {{#in-element @destination insertBefore=null}}\n    {{yield}}\n  {{/in-element}}\n{{else}}\n  {{yield}}\n{{/if}}", {
  strictMode: true
}), templateOnly());
var DropdownContent = setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-positive-tabindex --}}\n<Destination @destination={{@destination}}>\n  <div class=\"dropdown__content\" style={{@style}} tabindex={{@tabindex}} popover={{if @usePopover \"manual\"}} {{lifecycle onInsert=@onInsert onDestroy=@onDestroy}} {{popover enabled=@usePopover source=@popoverTarget isOpen=@isOpen}} ...attributes>\n    {{yield}}\n  </div>\n</Destination>", {
  strictMode: true,
  scope: () => ({
    Destination,
    lifecycle,
    popover
  })
}), templateOnly());

export { DropdownContent as default };
//# sourceMappingURL=content.js.map
