import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import { action } from '@ember/object';
import buildId from '../../../utils/shared/id';

export default class SelectBoxSelectedOptions extends Component {
  get id() {
    return buildId(this);
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
