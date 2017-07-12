import Mixin from '@ember/object/mixin';
import className from '../../../utils/select-box/class-name';

export default Mixin.create({
  init() {
    this._super(...arguments);
    const prefix = this.get('class-prefix') || this.get('classNamePrefix');
    const suffix = this.get('classNameSuffix');
    const name   = className(prefix, suffix);
    const names  = this.get('classNames').slice();

    names.push(name);

    this.set('classNames', names);
  }
});
