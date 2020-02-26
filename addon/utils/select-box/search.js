import invokeAction from '../component/invoke-action';
import { debounce } from '@ember/runloop';
import { set } from '@ember/object';
import { resolve } from 'rsvp';
import { getAPI } from '../component/api';

export function maybeSearch(selectBox, query) {
  if (isSearchable(selectBox)) {
    debouncedSearchAttempt(selectBox, query);
  }
}

export function cancelSearch(selectBox) {
  ++selectBox.searchID;
  searchFinished(selectBox);
}

export function search(selectBox, query) {
  const delay = selectBox.searchSlowTime;

  set(selectBox, 'isSearching', true);

  const searchID = ++selectBox.searchID;

  setTimeout(() => checkSlowSearch(selectBox), delay);

  const action = invokeAction(selectBox, 'onSearch', query, getAPI(selectBox));

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
  const delay = selectBox.searchDelayTime;
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
  return typeof selectBox.args.onSearch === 'function';
}

function queryOK(selectBox, query) {
  return query.length >= selectBox.searchMinChars;
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

  invokeAction(selectBox, 'onSearched', result, query, getAPI(selectBox));
}

function searchFailed(selectBox, query, error) {
  if (selectBox.isDestroyed) {
    return;
  }

  invokeAction(selectBox, 'onSearchError', error, query, getAPI(selectBox));
}

function searchFinished(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'isSearching', false);
  set(selectBox, 'isSlowSearch', false);
}
