import Mixin from '@ember/object/mixin';
import { bind, scheduleOnce } from '@ember/runloop';
import { assign } from '@ember/polyfills';
const { freeze } = Object;

export default Mixin.create({
  init() {
    this._rebuildApi();
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_rebuildApi');
  },

  _buildApi() {
    let api = {};
    api = assign(api, this._apiActions());
    api.element = this.get('element');
    api.value = this.get('pristineValue');
    return freeze(api);
  },

  _rebuildApi() {
    if (this.get('isDestroyed')) {
      return;
    }
    this.set('api', this._buildApi());
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
      this._rebuildApi();
      this._super(...arguments);
    }
  }
});
