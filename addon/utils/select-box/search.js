import invokeAction from '../shared/invoke-action';
import { debounce } from '@ember/runloop';
import { get, set } from '@ember/object';
import { resolve } from 'rsvp';

export function maybeSearch(selectBox, query) {
  if (isSearchable(selectBox)) {
    debouncedSearchAttempt(selectBox, query);
  }
}

export function cancelSearch(selectBox) {
  selectBox.incrementProperty('searchID');
  searchFinished(selectBox);
}

export function search(selectBox, query) {
  const delay = get(selectBox, 'searchSlowTime');

  set(selectBox, 'isSearching', true);

  const searchID = selectBox.incrementProperty('searchID');

  debounce(selectBox, checkSlowSearch, selectBox, delay);

  const action = invokeAction(selectBox, 'onSearch', query, selectBox.api);

  return resolve(action)
    .then(result => {
      searchCompleted(selectBox, searchID, query, result);
      return result;
    })
    .catch(error => {
      searchFailed(selectBox, query, error);
      return error;
    })
    .finally(() => {
      searchFinished(selectBox);
    });
}

function debouncedSearchAttempt(selectBox, query) {
  const delay = get(selectBox, 'searchDelayTime');
  const immediate = !delay;

  debounce(attemptSearch, selectBox, query, delay, immediate);
}

function attemptSearch(selectBox, query) {
  query = `${query}`.trim();

  if (selectBox.isDestroyed || !queryOK(selectBox, query)) {
    return;
  }

  search(selectBox, query);
}

function isSearchable(selectBox) {
  return typeof selectBox.onSearch === 'function';
}

function queryOK(selectBox, query) {
  return query.length >= get(selectBox, 'searchMinChars');
}

function checkSlowSearch(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'isSlowSearch', selectBox.isSearching);
}

function searchCompleted(selectBox, searchID, query, result) {
  if (selectBox.isDestroyed || searchID < selectBox.searchID) {
    return;
  }

  invokeAction(selectBox, 'onSearched', result, query, selectBox.api);
}

function searchFailed(selectBox, query, error) {
  if (selectBox.isDestroyed) {
    return;
  }

  invokeAction(selectBox, 'onSearchError', error, query, selectBox.api);
}

function searchFinished(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'isSearching', false);
  set(selectBox, 'isSlowSearch', false);
}