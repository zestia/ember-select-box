import Component from 'ember-component';
import layout from '../templates/components/simple-select';
import get from 'ember-metal/get';

export default Component.extend({
  layout: layout,
  classNames: ['simple-select'],
  isOpen: false,

  actions: {
    pressedUp(e, sb) {
      sb.activatePreviousOption(true);
    },
    pressedDown(e, sb) {
      if (this.get('isOpen')) {
        sb.activateNextOption(true);
      } else {
        this.set('isOpen', true);
      }
    },
    close() {
      this.set('isOpen', false);
    },
    selected(select, value) {
      select(value);
      this.send('close');
    },
    updateDisplayLabel(value) {
      this.set('displayLabel', get(value, this.getAttr('label-key')));
    }
  }
});
