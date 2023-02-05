/* eslint-disable array-callback-return */

import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('example1');
  this.route('example2');
  this.route('example3');
  this.route('example4');
  this.route('example5');
  this.route('example6');
  this.route('example7');
});
