import { helper } from '@ember/component/helper';
import registerComponents from '../utils/registration/components';

export default helper(function ([component], components) {
  registerComponents(component, components);
});
