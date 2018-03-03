import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { bind, debounce } from '@ember/runloop';
import { resolve } from 'rsvp';

export default Mixin.create({
  isSearchable: computed(function() {
    return typeof this.get('on-search') === 'function';
  }),

  searchDelayTime: computed(function() {
    return this.getWithDefault('search-delay-time', 100);
  }),

  searchSlowTime: computed(function() {
    return this.getWithDefault('search-slow-time', 500);
  }),

  searchMinChars: computed(function() {
    return this.getWithDefault('search-min-chars', 1);
  }),

  queryOK(query) {
    return query.length >= this.get('searchMinChars');
  },

  _maybeSearch(text) {
    if (this.get('isSearchable')) {
      this._runDebouncedSearch(text);
    }
  },

  _runDebouncedSearch(query) {
    const delay = this.get('searchDelayTime');
    const immediate = !delay;
    debounce(this, '_runSearch', query, delay, immediate);
  },

  _runSearch(query) {
    query = `${query}`.trim();

    if (!this.queryOK(query) || this.get('isDestroyed')) {
      return;
    }

    this._search(query);
  },

  _search(query = '') {
    this.set('isSearching', true);
    this.incrementProperty('searchID');

    debounce(this, '_checkSlowSearch', this.get('searchSlowTime'));

    return resolve(this.get('on-search')(query, this.get('api')))
      .then(bind(this, '_searchCompleted', this.get('searchID'), query))
      .catch(bind(this, '_searchFailed', query));
  },

  _searchCompleted(id, query, result) {
    const superseded = id < this.get('searchID');

    if (superseded || this.get('isDestroyed')) {
      return;
    }

    this.getWithDefault('on-searched', () => {})(result, query, this.get('api'));

    this._searchFinished();
  },

  _searchFailed(query, error) {
    if (this.get('isDestroyed')) {
      return;
    }

    this.getWithDefault('on-search-error', () => {})(error, query, this.get('api'));

    this._searchFinished();
  },

  _searchFinished() {
    this.set('isSearching', false);
    this.set('isSlowSearch', false);
  },

  _checkSlowSearch() {
    if (this.get('isDestroyed')) {
      return;
    }

    this.set('isSlowSearch', this.get('isSearching'));
  },

  actions: {
    search(query) {
      return this._search(query);
    },

    stopSearching() {
      this.incrementProperty('searchID');
      this._searchFinished();
    },

    setInputValue(value) {
      this.set('input.element.value', value);
    },

    focusInput() {
      this.get('input.element').focus();
    },

    blurInput() {
      this.get('input.element').blur();
    },

    _inputText(text) {
      this._super(...arguments);
      this._maybeSearch(text);
    }
  }
});
