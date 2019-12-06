import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  redirect() {
    return this.transitionTo('native-single-select');
  }
}
