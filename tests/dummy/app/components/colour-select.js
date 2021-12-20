import Component from '@glimmer/component';
import { colours } from '../utils/dummy-data';

export default class ColourSelect extends Component {
  colours = colours;

  close = (e, sb) => {
    sb.close();
  };

  handlePressLeft = (e, sb) => {
    e.preventDefault();
    sb.activatePreviousOption();
  };

  handlePressRight = (e, sb) => {
    e.preventDefault();
    sb.activateNextOption();
  };
}
