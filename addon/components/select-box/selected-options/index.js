import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import { buildClassName } from '../../../utils/shared/class-name';
import { action } from '@ember/object';

export default class SelectBoxSelectedOptions extends Component {
  get className() {
    return buildClassName(this.args.selectBox, 'selected-options');
  }

  // Internal actions

  @action
  handleInsertElement() {
    _insertComponent(this);
  }

  @action
  handleDestroyElement() {
    _destroyComponent(this);
  }
}
