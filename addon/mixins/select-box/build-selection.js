import Mixin from '@ember/object/mixin';
import { A as emberA } from '@ember/array';
import { get } from '@ember/object';
import { bind } from '@ember/runloop';
const { isArray, from } = Array;

export default Mixin.create({
  _buildSelectedValue(value1, value2) {
    let build = this.onBuildSelection;

    if (typeof build !== 'function') {
      build = bind(this, '_buildSelectedValueDefault');
    }

    return build(value1, value2);
  },

  _buildSelectedValueDefault(value1, value2) {
    let value = value1;

    if (get(this, 'isMultiple') && !isArray(value1)) {
      const temp = emberA(from(value2));

      if (temp.includes(value1)) {
        temp.removeObject(value1);
      } else {
        temp.addObject(value1);
      }

      value = temp.toArray();
    }

    return value;
  },

  actions: {
    _select(value) {
      value = this._buildSelectedValue(value, this.internalValue);
      this._super(value);
    }
  }
});
