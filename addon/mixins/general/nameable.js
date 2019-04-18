import Mixin from '@ember/object/mixin';
import className from '../../utils/select-box/class-name';
import { set } from '@ember/object';
const { from } = Array;

export default Mixin.create({
  init() {
    this._super(...arguments);
    const prefix = this.classNamePrefix;
    const suffix = this.classNameSuffix;
    const name = className(prefix, suffix);
    const names = from(this.classNames);

    names.push(name);

    set(this, 'classNames', names);
  }
});
