import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import className from '../../../utils/select-box/options/class-name';
import { action } from '@ember/object';

export default class SelectBoxOptions extends Component {
  @className() className;

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
