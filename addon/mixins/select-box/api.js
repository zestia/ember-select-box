import Mixin from '@ember/object/mixin';
import { bind, scheduleOnce } from '@ember/runloop';
import { assign } from '@ember/polyfills';
const { seal } = Object;

export default Mixin.create({
  init() {
    this.set('api', this._buildApi());
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_updateApiElement');
  },

  _buildApi() {
    return seal(assign({
      value: undefined,
      element: undefined
    }, this._apiActions()));
  },

  _updateApiElement() {
    if (this.get('isDestroyed')) {
      return;
    }
    this.set('api.element', this.get('element'));
  },

  _updateApiValue() {
    if (this.get('isDestroyed')) {
      return;
    }
    this.set('api.value', this.get('internalValue'));
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

  actions: {
    _updated() {
      this._updateApiValue();
      this._super(...arguments);
    }
  }
});
