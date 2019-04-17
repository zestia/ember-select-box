import Mixin from '@ember/object/mixin';
import { computed, getWithDefault, set } from '@ember/object';
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

  _queryOK(query) {
    return query.length >= this.searchMinChars;
  },

  _maybeSearch(text) {
    if (this.isSearchable) {
      this._runDebouncedSearch(text);
    }
  },

  _runDebouncedSearch(query) {
    const delay = this.searchDelayTime;
    const immediate = !delay;
    debounce(this, '_runSearch', query, delay, immediate);
  },

  _runSearch(query) {
    if (this.isDestroyed) {
      return;
    }

    query = `${query}`.trim();

    if (!this._queryOK(query)) {
      return;
    }

    this._search(query);
  },

  _search(query = '') {
    set(this, 'isSearching', true);

    this.incrementProperty('searchID');

    debounce(this, '_checkSlowSearch', this.searchSlowTime);

    const search = invokeAction(this, 'on-search', query, this.api);

    return resolve(search)
      .then(bind(this, '_searchCompleted', this.searchID, query))
      .catch(bind(this, '_searchFailed', query))
      .finally(bind(this, '_searchFinished'));
  },

  _searchCompleted(id, query, result) {
    if (id < this.searchID) {
      return;
    }

    if (this.isDestroyed) {
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

    set(this, 'isSearching', false);
    set(this, 'isSlowSearch', false);
  },

  _checkSlowSearch() {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'isSlowSearch', this.isSearching);
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
