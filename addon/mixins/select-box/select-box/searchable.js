import jQuery from 'jquery';
import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';
import { bind, debounce } from 'ember-runloop';
const { trim } = jQuery;

export default Mixin.create({
  didInitAttrs() {
    this._super(...arguments);
    this.set('isSearchable', !!this.getAttr('on-search'));
  },

  searchDelayTime: computed(function() {
    let ms = this.getAttr('search-delay-time');
    return ms === undefined ? 100 : ms;
  }),

  searchSlowTime: computed(function() {
    let ms = this.getAttr('search-slow-time');
    return ms === undefined ? 500 : ms;
  }),

  searchMinChars: computed(function() {
    let min = this.getAttr('search-min-chars');
    return min === undefined ? 1 : min;
  }),

  queryOK(query) {
    return query.length >= this.get('searchMinChars');
  },

  _inputText(text) {
    if (this.get('isSearchable')) {
      this._runDebouncedSearch(text);
    }
  },

  _runDebouncedSearch(query) {
    let delay = this.get('searchDelayTime');
    let immediate = !delay;
    debounce(this, '_runSearch', query, delay, immediate);
  },

  _runSearch(query) {
    query = trim(query);
    if (this.queryOK(query)) {
      this._search(query);
    }
  },

  _search(query = '') {
    let search = this.getAttr('on-search');
    this.set('isSearching', true);
    this.incrementProperty('searchID');
    debounce(this, '_checkSlowSearch', this.get('searchSlowTime'));

    return search(query, this.get('api'))
      .then(bind(this, '_searchCompleted', this.get('searchID'), query))
      .catch(bind(this, '_searchFailed', query))
      .finally(bind(this, '_searchFinished', query));
  },

  _searchCompleted(id, query, result) {
    if (this.get('isDestroyed')) { return; }

    let superseded = id < this.get('searchID');
    if (superseded) { return; }

    this.sendAction('on-searched', result, query, this.get('api'));
  },

  _searchFailed(query, error) {
    if (this.get('isDestroyed')) { return; }
    this.sendAction('on-search-error', error, query, this.get('api'));
  },

  _searchFinished() {
    if (this.get('isDestroyed')) { return; }
    this.set('isSearching', false);
    this.set('isSlowSearch', false);
  },

  _checkSlowSearch() {
    if (this.get('isDestroyed')) { return; }
    this.set('isSlowSearch', this.get('isSearching'));
  },

  actions: {
    search(query) {
      return this._search(query);
    },

    setInputValue(value) {
      this.get('input').$().val(value).trigger('input');
    },

    focusInput() {
      this.get('input').$().focus();
    },

    inputText(text) {
      this._super(...arguments);
      this._inputText(text);
    }
  }
});
