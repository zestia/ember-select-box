import Component from '@glimmer/component';
import { colours } from '../utils/dummy-data';
import { action } from '@ember/object';

export default class ColourSelect extends Component {
  colours = colours;

  @action
  close(e, sb) {
    sb.close();
  }
}
