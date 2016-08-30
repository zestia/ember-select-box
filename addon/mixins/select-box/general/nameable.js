import Mixin from 'ember-metal/mixin';
import className from '../../../utils/select-box/class-name';

export default Mixin.create({
  init() {
    this._super(...arguments);
    let prefix = this.getAttr('class-prefix') || this.get('classNamePrefix');
    let suffix = this.get('classNameSuffix');
    let name   = className(prefix, suffix);

    this.get('classNames').push(name);
  }
});
