import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A as emberA } from '@ember/array';

export default class TagSelect extends Component {
  @tracked availableTags;
  @tracked lastQuery;

  close = (e, sb) => {
    sb.close();
  };

  handleSearched = (tags, query) => {
    this.availableTags = tags;
    this.lastQuery = query;
  };

  reveal = (sb) => {
    sb.search('');
    sb.open();
  };

  select = (value, sb) => {
    this.args.onSelect(value);
    sb.setInputValue('');
    sb.close();
  };

  deselect = (tag, sb) => {
    const value = this.removeValue(tag, sb.value);
    this.args.onSelect(value);
  };

  addValue = (value, current) => {
    return emberA([...current]).addObject(value);
  };

  removeValue = (value, current) => {
    return emberA([...current]).removeObject(value);
  };

  deselectLast = (sb) => {
    const lastTag = sb.value[sb.value.length - 1];

    if (lastTag) {
      this.deselect(lastTag, sb);
    }
  };
}
