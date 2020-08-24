import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagSelect extends Component {
  @tracked availableTags;
  @tracked newTag;

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
  search(query) {
    return this.args.onSearch(query).then((tags) => {
      this.availableTags = tags;
      this.newTag = query;
    });
  }

  @action
  reveal(sb) {
    sb.search('');
    sb.open();
  }

  @action
  select(tag, sb) {
    this.args.onTag(tag);
    sb.setInputValue('');
    sb.close();
  }

  @action
  deselect(tag) {
    this.args.onDeTag(tag);
  }

  @action
  deselectLast(sb) {
    const lastTag = sb.value[sb.value.length - 1];

    if (lastTag) {
      this.deselect(lastTag);
    }
  }
}
