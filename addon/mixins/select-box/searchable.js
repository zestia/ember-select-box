import Mixin from '@ember/object/mixin';
import { computed, getWithDefault, get } from '@ember/object';
import { bind, debounce } from '@ember/runloop';
import { resolve } from 'rsvp';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create({
  isSearchable: computed(function() {
    return typeof this['on-search'] === 'function';
  }),

  searchDelayTime: computed(function() {
    return getWithDefault(this, 'search-delay-time', 100);
  }),

  searchSlowTime: computed(function() {
    return getWithDefault(this, 'search-slow-time', 500);
  }),

  searchMinChars: computed(function() {
    return getWithDefault(this, 'search-min-chars', 1);
  }),

  queryOK(query) {
    return query.length >= get(this, 'searchMinChars');
  },

  _maybeSearch(text) {
    if (get(this, 'isSearchable')) {
      this._runDebouncedSearch(text);
    }
  },

  _runDebouncedSearch(query) {
    const delay = get(this, 'searchDelayTime');
    const immediate = !delay;
    debounce(this, '_runSearch', query, delay, immediate);
  },

  _runSearch(query) {
    query = `${query}`.trim();

    if (!this.queryOK(query) || this.isDestroyed) {
      return;
    }

    this._search(query);
  },

  _search(query = '') {
    this.set('isSearching', true);
    this.incrementProperty('searchID');

    debounce(this, '_checkSlowSearch', get(this, 'searchSlowTime'));

    const search = invokeAction(this, 'on-search', query, this.api);

    return resolve(search)
      .then(bind(this, '_searchCompleted', this.searchID, query))
      .catch(bind(this, '_searchFailed', query))
      .finally(bind(this, '_searchFinished'));
  },

  _searchCompleted(id, query, result) {
    if (id < this.searchID || this.isDestroyed) {
      return;
    }

    invokeAction(this, 'on-searched', result, query, this.api);
  },

  _searchFailed(query, error) {
    if (this.isDestroyed) {
      return;
    }

    invokeAction(this, 'on-search-error', error, query, this.api);
  },

  _searchFinished() {
    if (this.isDestroyed) {
      return;
    }

    this.set('isSearching', false);
    this.set('isSlowSearch', false);
  },

  _checkSlowSearch() {
    if (this.isDestroyed) {
      return;
    }

    this.set('isSlowSearch', this.isSearching);
  },

  actions: {
    search(query) {
      return this._search(query);
    },

    stopSearching() {
      this.incrementProperty('searchID');
      this._searchFinished();
    },

    _inputText(text) {
      this._super(...arguments);
      this._maybeSearch(text);
    }
  }
});
