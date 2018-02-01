import Mixin from '@ember/object/mixin';
import { bind, scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  init() {
    this.set('api', this._apiActions());
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_updateApi');
  },

  _apiActions() {
    return [
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
      'blurInput',
      'activateOptionAtIndex',
      'activateNextOption',
      'activatePreviousOption',
      'deactivateOptions',
      'activateSelectedOptionAtIndex',
      'activateNextSelectedOption',
      'activatePreviousSelectedOption',
      'deactivateSelectedOptions'
    ].reduce((actions, name) => {
      actions[name] = bind(this, this.get(`actions.${name}`));
      return actions;
    }, {});
  },

  _updateApi() {
    this.set('api.element', this.get('element'));
  }
});
