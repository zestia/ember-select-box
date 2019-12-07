import Component from '@ember/component';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';
import layout from '../../templates/components/select-box/options';
import className from '../../utils/select-box/options/class-name';
import { action } from '@ember/object';

export default class SelectBoxOptions extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';

  // Computed state

  @className() className;

  init() {
    super.init(...arguments);
    _initComponent(this);
  }

  // Internal actions

  @action
  handleDestroyElement() {
    _destroyComponent(this);
  }
}
