import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import buildId from '../../../utils/shared/id';
import { action } from '@ember/object';

export default class SelectBoxSelectedOptions extends Component {
  get id() {
    return buildId(this);
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
