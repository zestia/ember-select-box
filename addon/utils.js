import { assert } from '@ember/debug';
import { containsString } from '@zestia/ember-select-box/-private/utils';
const { isArray } = Array;

export function filter(options) {
  assert('must be an array', isArray(options));

  let by;
  let query;
  let groups;
  let dropEmptyGroups;
  let using = containsString;

  const isGroup = (item) => {
    return item && isArray(item[groups]);
  };

  const filter = (array) => {
    return array
      .reduce((results, _) => {
        if (isGroup(_)) {
          results.push({ ..._, [groups]: filter(_[groups]) });
        } else if (
          (isArray(by) && by.some((by) => using(value(_, by), query))) ||
          (!isArray(by) && using(value(_, by), query))
        ) {
          results.push(_);
        }

        return results;
      }, [])
      .filter((_) => {
        if (isGroup(_) && _[groups].length < 1 && dropEmptyGroups) {
          return false;
        }

        return true;
      });
  };

  const value = (value, by) => {
    if (typeof by === 'function') {
      return by(value);
    } else if (typeof by === 'string') {
      return value ? value[by] : undefined;
    } else {
      return value;
    }
  };

  return {
    by(_) {
      by = _;
      return this;
    },

    using(_) {
      using = _;
      return this;
    },

    groups(_) {
      groups = _;
      return this;
    },

    query(_) {
      query = _;
      return this;
    },

    dropEmptyGroups() {
      dropEmptyGroups = true;
      return this;
    },

    run() {
      return filter(options);
    }
  };
}
