import invokeAction from '../component/invoke-action';
import { debounce } from '@ember/runloop';
import { resolve } from 'rsvp';

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

  selectBox.isSearching = true;

  const searchID = ++selectBox.searchID;

  setTimeout(() => checkSlowSearch(selectBox), delay);

  const action = invokeAction(selectBox, 'onSearch', query, selectBox.api);

  return resolve(action)
    .then((result) => {
      searchCompleted(selectBox, searchID, query, result);
      return result;
    })
    .catch((error) => {
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

  if (!queryOK(selectBox, query)) {
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
  selectBox.isSlowSearch = selectBox.isSearching;
}

function searchCompleted(selectBox, searchID, query, result) {
  if (searchID < selectBox.searchID) {
    return;
  }

  invokeAction(selectBox, 'onSearched', result, query, selectBox.api);
}

function searchFailed(selectBox, query, error) {
  invokeAction(selectBox, 'onSearchError', error, query, selectBox.api);
}

function searchFinished(selectBox) {
  selectBox.isSearching = false;
  selectBox.isSlowSearch = false;
}
