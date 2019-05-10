import Mixin from '@ember/object/mixin';
import { set, get } from '@ember/object';
import { bind, debounce } from '@ember/runloop';
import { resolve } from 'rsvp';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create({
  searchMinChars: 1,
  searchDelayTime: 100,
  searchSlowTime: 500,

  _isSearchable() {
    return typeof this.onSearch === 'function';
  },

  _queryOK(query) {
    return query.length >= get(this, 'searchMinChars');
  },

  _maybeSearch(text) {
    if (this._isSearchable()) {
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

    if (this.isDestroyed || !this._queryOK(query)) {
      return;
    }

    this._search(query);
  },

  _search(query = '') {
    set(this, 'isSearching', true);

    this.incrementProperty('searchID');

    debounce(this, '_checkSlowSearch', get(this, 'searchSlowTime'));

    const search = invokeAction(this, 'onSearch', query, this.api);

    return resolve(search)
      .then(bind(this, '_searchCompleted', this.searchID, query))
      .catch(bind(this, '_searchFailed', query))
      .finally(bind(this, '_searchFinished'));
  },

  _searchCompleted(id, query, result) {
    if (this.isDestroyed || id < this.searchID) {
      return;
    }

    invokeAction(this, 'onSearched', result, query, this.api);
  },

  _searchFailed(query, error) {
    if (this.isDestroyed) {
      return;
    }

    invokeAction(this, 'onSearchError', error, query, this.api);
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
