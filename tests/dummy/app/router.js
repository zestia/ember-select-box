/* eslint-disable array-callback-return */

import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('native-single-select');
  this.route('native-multiple-select');
  this.route('native-simple-select');
  this.route('fast-native-single-select');
  this.route('single-select');
  this.route('simple-select');
  this.route('filter-select');
  this.route('search-select');
  this.route('tag-select');
  this.route('colour-select');
  this.route('backtrack-select');
});
