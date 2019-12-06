import Component from '@ember/component';
import layout from '../templates/components/colour-select';
import { colours } from '../utils/dummy-data';
import { action } from '@ember/object';

export default class ColourSelect extends Component {
  layout = layout;
  tagName = '';
  colours = colours;

  @action
  close(e, sb) {
    sb.close();
  }
}
