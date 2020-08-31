import invokeAction from '../component/invoke-action';
import { debounce } from '@ember/runloop';

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

export async function search(selectBox, query) {
  const searchID = startSearch(selectBox);

  setTimeout(() => checkSlowSearch(selectBox), selectBox.searchSlowTime);

  try {
    const result = await runSearch(selectBox, query);
    handleSearch(selectBox, searchID, query, result, false);
  } catch (error) {
    handleSearch(selectBox, searchID, query, error, true);
  }

  finishSearch(selectBox);
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

function handleSearch(selectBox, searchID, query, result, erred) {
  if (searchID < selectBox.searchID) {
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
  return ++selectBox.searchID;
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
  return invokeAction(selectBox, 'onSearch', query, selectBox.api);
}

function searchSucceeded(selectBox, query, result) {
  invokeAction(selectBox, 'onSearched', result, query, selectBox.api);
}

function searchFailed(selectBox, query, error) {
  invokeAction(selectBox, 'onSearchError', error, query, selectBox.api);
}
