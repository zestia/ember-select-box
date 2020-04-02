import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import { buildClassName } from '../../../utils/shared/class-name';
import { action } from '@ember/object';

export default class SelectBoxOptions extends Component {
  get className() {
    return buildClassName(this.args.selectBox, 'options');
  }

  @action
  handleInsertElement() {
    _insertComponent(this);
  }

  @action
  handleDestroyElement() {
    _destroyComponent(this);
  }
}
