import Mixin from '@ember/object/mixin';
import className from '../../utils/select-box/class-name';
const { from } = Array;

export default Mixin.create({
  init() {
    this._super(...arguments);
    const prefix = this.get('class-prefix') || this.get('classNamePrefix');
    const suffix = this.get('classNameSuffix');
    const name   = className(prefix, suffix);
    const names  = from(this.get('classNames'));

    names.push(name);

    this.set('classNames', names);
  }
});
