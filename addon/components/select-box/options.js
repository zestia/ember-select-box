import Component from '@ember/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../utils/component/lifecycle';
import layout from '../../templates/components/select-box/options';
import className from '../../utils/select-box/options/class-name';
import { action } from '@ember/object';

export default class SelectBoxOptions extends Component {
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
