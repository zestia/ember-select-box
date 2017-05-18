import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import run from 'ember-runloop';
const { merge } = Ember;

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    const application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}
