import Ember from 'ember';
// import layout from '../templates/components/tag-select2';
const {computed, get, set} = Ember;

export default Ember.Component.extend({
  classNames: ['tag-select2'],
  classNameBindings: ['focused:tag-select2--focused'],

  hideDropdownIndicator: false,

  placeholder: 'Type to search',

  didReceiveAttrs() {
    this.set('selected', Ember.A(this.get('selected')));
    this.set('options', Ember.A(this.get('options')));
  },

  _options: computed('options', 'options.[]',
                     'selected', 'selected.[]', 'query', function() {
    const selected = this.get('selected');
    let opts = this.get('options').reject(o => selected.includes(o));
    const q = this.get('query');
    if (q) {
      opts = opts.filter(o => get(o, 'label').toLowerCase().indexOf(q) !== -1);
    }
    return opts;
  }),

  onSearch(q) {
    this.set('query', q);
  },

  _tags: computed('selected', 'selected.[]', 'highlightedTag', function() {
    return this.get('selected').map(o => {
      let tagClassName;
      if (o === this.get('highlightedTag')) {
        tagClassName = 'tag-select2__value tag-select2__value--highlighted';
      } else {
        tagClassName = 'tag-select2__value';
      }
      set(o, 'className', tagClassName);
      return o;
    });
  }),

  deselectTag(tag) {
    const selected = this.get('selected').removeObject(tag);
    this.sendAction('onRemove', tag);
    this.sendAction('onChange', selected);
  },

  actions: {
    pressedUp(e, esb) {
      if (!e.shiftKey) {
        e.preventDefault();
        esb.activatePreviousOption(true);
        esb.open();
      }
    },
    pressedDown(e, esb) {
      if (!e.shiftKey) {
        e.preventDefault();
        esb.activateNextOption(true);
        esb.open();
      }
    },
    focusedComponent(e, esb) {
      this.set('focused', true);
      esb.open();
      if (document.activeElement !== this.$('.tag-select2__input')[0]) {
        esb.focusInput();
      }
    },
    blurredComponent(e, esb) {
      this.set('focused', false);
      esb.close();
    },
    pressedEscape(e, esb) {
      esb.close();
      this.set('highlightedTag', null);
    },
    pressedBackspace(e) {
      if (e.target.selectionStart === 0 && e.target.selectionEnd === 0) {
        if (this.get('highlightedTag')) {
          this.deselectTag(this.get('highlightedTag'));
          this.set('highlightedTag', null);
        } else {
          this.set('highlightedTag', this.get('selected.lastObject'));
        }
      }
    },
    pressedLeft(e) {
      const {selectionStart, selectionEnd} = e.target;
      if (e.shiftKey || selectionStart !== 0 || selectionEnd !== 0) {
        return;
      }
      // move selection left, or select right-most option
      let index;
      const highlightedTag = this.get('highlightedTag');
      if (highlightedTag) {
        index = this.get('selected').indexOf(highlightedTag) - 1;
        if (index === -1) {
          index = this.get('selected.length') - 1;
        }
      } else {
        index = this.get('selected.length') - 1;
      }
      this.set('highlightedTag', this.get('selected').objectAt(index));
    },
    pressedRight(e) {
      const finalOffset = e.target.value.length;
      const {selectionStart: start, selectionEnd: end} = e.target;
      if (e.shiftKey || start !== finalOffset || end !== finalOffset) {
        return;
      }
      let index;
      const highlightedTag = this.get('highlightedTag');
      // move selection right, or select left-most option
      if (highlightedTag) {
        index = this.get('selected').indexOf(highlightedTag) + 1;
        if (index > this.get('selected.length') - 1) {
          index = 0;
        }
      } else {
        index = 0;
      }
      this.set('highlightedTag', this.get('selected').objectAt(index));
    },
    didInput() {
      this.set('highlightedTag', undefined);
    },
    search(query) {
      return this.get('onSearch').call(this, query);
    },
    searched(results) {
      if (results) {
        this.set('options', Ember.A(results));
      }
    },
    selected(tag, esb) {
      const selected = this.get('selected').addObject(tag);
      this.sendAction('onAdd', tag);
      this.sendAction('onChange', selected);
      esb.focusInput();
      esb.setInputValue('');
    },
    deselected(tag, esb) {
      this.deselectTag(tag);
      esb.focusInput();
    }
  }
});
