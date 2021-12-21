import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A as emberA } from '@ember/array';
import { action } from '@ember/object';

export default class TagSelect extends Component {
  @tracked availableTags;
  @tracked lastQuery;

  @action
  close(e, sb) {
    sb.close();
  }

  @action
  handleSearched(tags, query) {
    this.availableTags = tags;
    this.lastQuery = query;
  }

  @action
  reveal(sb) {
    sb.search('');
    sb.open();
  }

  @action
  select(value, sb) {
    this.args.onSelect(value);
    sb.setInputValue('');
    sb.close();
  }

  @action
  deselect(tag, sb) {
    const value = this.removeValue(tag, sb.value);
    this.args.onSelect(value);
  }

  @action
  addValue(value, current) {
    return emberA([...current]).addObject(value);
  }

  @action
  removeValue(value, current) {
    return emberA([...current]).removeObject(value);
  }

  @action
  deselectLast(sb) {
    const lastTag = sb.value[sb.value.length - 1];

    if (lastTag) {
      this.deselect(lastTag, sb);
    }
  }
}
