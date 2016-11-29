import jQuery from 'jquery';
import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';
import { bind, debounce } from 'ember-runloop';
import { isNone } from 'ember-utils';
import Ember from 'ember';
const { RSVP } = Ember;
const { trim } = jQuery;


export default Mixin.create({
  isSearchable: computed(function() {
    return typeof this.getAttr('on-search') === 'function';
  }),

  searchDelayTime: computed(function() {
    const ms = this.getAttr('search-delay-time');
    return isNone(ms) ? 100 : ms;
  }),

  searchSlowTime: computed(function() {
    const ms = this.getAttr('search-slow-time');
    return isNone(ms) ? 500 : ms;
  }),

  searchMinChars: computed(function() {
    const min = this.getAttr('search-min-chars');
    return isNone(min) ? 1 : min;
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
    const delay = this.get('searchDelayTime');
    const immediate = !delay;
    debounce(this, '_runSearch', query, delay, immediate);
  },

  _runSearch(query) {
    query = trim(query);
    if (this.queryOK(query) && !this.get('isDestroyed')) {
      this._search(query);
    }
  },

  _search(query = '') {
    this.set('isSearching', true);
    this.incrementProperty('searchID');
    debounce(this, '_checkSlowSearch', this.get('searchSlowTime'));

    const search = this.getAttr('on-search');
    return RSVP.resolve(search(query, this.get('api')))
      .then(bind(this, '_searchCompleted', this.get('searchID'), query))
      .catch(bind(this, '_searchFailed', query));
  },

  _searchCompleted(id, query, result) {
    if (this.get('isDestroyed')) {
      return;
    }

    const superseded = id < this.get('searchID');
    if (superseded) {
      return;
    }

    this.sendAction('on-searched', result, query, this.get('api'));
    this._searchFinished();
  },

  _searchFailed(query, error) {
    if (this.get('isDestroyed')) {
      return;
    }
    this.sendAction('on-search-error', error, query, this.get('api'));
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
      this.get('input').$().val(value);
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
