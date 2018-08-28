import Mixin from '@ember/object/mixin';
import className from '../../utils/select-box/class-name';
const { from } = Array;

export default Mixin.create({
  init() {
    this._super(...arguments);
    const prefix = this['class-prefix'] || this.classNamePrefix;
    const suffix = this.classNameSuffix;
    const name   = className(prefix, suffix);
    const names  = from(this.classNames);

    names.push(name);

    this.set('classNames', names);
  }
});
