import Mixin from '@ember/object/mixin';
import computed from 'ember-improved-cp/read-only';
import { bind } from '@ember/runloop';

export default Mixin.create({
  api: computed(function() {
    const expose = {};
    [
      'open',
      'close',
      'toggle',
      'select',
      'update',
      'selectActiveOption',
      'search',
      'stopSearching',
      'setInputValue',
      'focusInput',
      'activateOptionAtIndex',
      'activateNextOption',
      'activatePreviousOption',
      'deactivateOptions',
      'activateSelectedOptionAtIndex',
      'activateNextSelectedOption',
      'activatePreviousSelectedOption',
      'deactivateSelectedOptions'
    ].forEach(actionName => {
      expose[actionName] = bind(this, this.get(`actions.${actionName}`));
    });
    return expose;
  })
});
