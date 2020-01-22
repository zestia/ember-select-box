import Component from '@ember/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../utils/component/lifecycle';
import layout from '../../templates/components/select-box/selected-options';
import className from '../../utils/select-box/selected-options/class-name';
import { action } from '@ember/object';

export default class SelectBoxSelectedOptions extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';

  // Actions

  _onInsert = null;
  _onDestroy = null;

  // Computed state

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
