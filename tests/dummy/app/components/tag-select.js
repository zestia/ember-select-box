import Component from '@ember/component';
import layout from '../templates/components/tag-select';
import { set, action } from '@ember/object';

export default class TagSelect extends Component {
  layout = layout;
  tagName = '';

  @action
  handlePressUp(e, sb) {
    e.preventDefault();
    sb.activatePreviousOption();
  }

  @action
  handlePressDown(e, sb) {
    e.preventDefault();
    sb.activateNextOption();
    sb.open();
  }

  @action
  close(e, sb) {
    sb.close();
  }

  @action
  updateAvailableTags(search, query) {
    return search(query).then(tags => {
      set(this, 'availableTags', tags);
      set(this, 'newTag', query);
    });
  }

  @action
  reveal(sb, search) {
    this.send('updateAvailableTags', search, '');
    sb.open();
  }

  @action
  addTag(tag, sb) {
    this.onTag(tag);
    sb.setInputValue('');
    sb.close();
  }

  @action
  removeTag(tag) {
    this.onDeTag(tag);
  }
}
