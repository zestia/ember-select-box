import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class SelectBoxGroup extends Component {
  labelId = guidFor(this);
}
