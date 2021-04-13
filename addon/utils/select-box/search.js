import { debounce } from '@ember/runloop';
import { resolve } from 'rsvp';

export function maybeSearch(selectBox, query) {
  if (!isSearchable(selectBox)) {
    return;
  }

  if (selectBox.searchDelayTime === 0) {
    attemptSearch(selectBox, query);
  } else {
    debouncedSearchAttempt(selectBox, query);
  }
}

export function search(selectBox, query) {
  const searchId = startSearch(selectBox);

  setTimeout(() => checkSlowSearch(selectBox), selectBox.searchSlowTime);

  return resolve(runSearch(selectBox, query))
    .then((result) => {
      handleSearch(selectBox, searchId, query, result, false);
    })
    .catch((error) => {
      handleSearch(selectBox, searchId, query, error, true);
    })
    .finally(() => {
      finishSearch(selectBox);
    });
}

export function cancelSearch(selectBox) {
  incrementSearch(selectBox);
  finishSearch(selectBox);
}

function debouncedSearchAttempt(selectBox, query) {
  debounce(attemptSearch, selectBox, query, selectBox.searchDelayTime);
}

function attemptSearch(selectBox, query) {
  query = `${query}`.trim();

  if (!queryOK(selectBox, query)) {
    return;
  }

  search(selectBox, query);
}

function handleSearch(selectBox, searchId, query, result, erred) {
  if (searchId < selectBox.searchId) {
    return;
  }

  if (erred) {
    searchFailed(selectBox, query, result);
  } else {
    searchSucceeded(selectBox, query, result);
  }
}

function startSearch(selectBox) {
  selectBox.isSearching = true;
  return incrementSearch(selectBox);
}

function finishSearch(selectBox) {
  selectBox.isSearching = false;
  selectBox.isSlowSearch = false;
}

function incrementSearch(selectBox) {
  return ++selectBox.searchId;
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

function runSearch(selectBox, query) {
  return selectBox.args.onSearch?.(query, selectBox.api);
}

function searchSucceeded(selectBox, query, result) {
  selectBox.args.onSearched?.(result, query, selectBox.api);
}

function searchFailed(selectBox, query, error) {
  selectBox.args.onSearchError?.(error, query, selectBox.api);
}
