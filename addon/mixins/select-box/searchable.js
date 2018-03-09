import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { bind, debounce } from '@ember/runloop';
import { resolve } from 'rsvp';
import invokeAction from '../../utils/invoke-action';

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

    const search = invokeAction(this, 'on-search', query, this.get('api'));

    return resolve(search)
      .then(bind(this, '_searchCompleted', this.get('searchID'), query))
      .catch(bind(this, '_searchFailed', query))
      .finally(bind(this, '_searchFinished'));
  },

  _searchCompleted(id, query, result) {
    if (id < this.get('searchID') || this.get('isDestroyed')) {
      return;
    }

    invokeAction(this, 'on-searched', result, query, this.get('api'));
  },

  _searchFailed(query, error) {
    if (this.get('isDestroyed')) {
      return;
    }

    invokeAction(this, 'on-search-error', error, query, this.get('api'));
  },

  _searchFinished() {
    if (this.get('isDestroyed')) {
      return;
    }

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

    _inputText(text) {
      this._super(...arguments);
      this._maybeSearch(text);
    }
  }
});
