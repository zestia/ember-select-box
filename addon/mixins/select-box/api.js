import Mixin from '@ember/object/mixin';
import { bind } from '@ember/runloop';
import { assign } from '@ember/polyfills';
import { set } from '@ember/object';
const { seal } = Object;

export default Mixin.create({
  init() {
    set(this, 'api', this._buildApi());
    this._super(...arguments);
  },

  _buildApi() {
    return seal(
      assign(
        {
          value: undefined,
          element: undefined,
          isOpen: undefined
        },
        this._apiActions()
      )
    );
  },

  _updateApi(key, value) {
    if (this.isDestroyed) {
      return;
    }

    set(this, `api.${key}`, value);
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
      'activateOptionForKeyCode',
      'deactivateOptions',
      'activateSelectedOptionAtIndex',
      'activateNextSelectedOption',
      'activatePreviousSelectedOption',
      'deactivateSelectedOptions'
    ].reduce((actions, name) => {
      actions[name] = bind(this, this.actions[name]);
      return actions;
    }, {});
  },

  actions: {
    _registerDomElement() {
      this._super(...arguments);
      this._updateApi('element', this.domElement);
    },

    _updated() {
      this._super(...arguments);
      this._updateApi('value', this.internalValue);
    },

    open() {
      this._super(...arguments);
      this._updateApi('isOpen', true);
    },

    close() {
      this._super(...arguments);
      this._updateApi('isOpen', false);
    }
  }
});
