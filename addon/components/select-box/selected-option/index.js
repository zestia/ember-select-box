import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import { action } from '@ember/object';
import buildID from '../../../utils/shared/id';

export default class SelectBoxSelectedOption extends Component {
  get id() {
    return buildID(this);
  }

  @action
  handleInsertElement(element) {
    _insertComponent(this);
  }

  @action
  handleDestroyElement() {
    _destroyComponent(this);
  }
}
