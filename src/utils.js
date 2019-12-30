import { readable, derived } from "svelte/store";

var setupMq = function(queryString) {
  return function(set) {
    var query = window.matchMedia(queryString);
    var callback = function(e) {
      return set(e.matches);
    };
    query.addListener(callback);
    callback(query);
    return function() {
      return query.removeListener(callback);
    };
  };
};

var defaultQueries = {
  desktop: "screen and (min-width: 769px)",
  mobile: "screen and (max-width: 768px)"
};

var queryStores;
var media;

var setup = function(queries) {
  if (queries === void 0) queries = defaultQueries;

  queryStores = Object.entries(queries).reduce(function(acc, ref) {
    var mediaName = ref[0];
    var queryString = ref[1];

    return (acc[mediaName] = readable(false, setupMq(queryString))), acc;
  }, {});
  media = derived(Object.values(queryStores), function($queryStores) {
    return $queryStores.reduce(function(acc, q, i) {
      return (acc[Object.keys(queryStores)[i]] = q), acc;
    }, {});
  });
};

export { media, setup };
