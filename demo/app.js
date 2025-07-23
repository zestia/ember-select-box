import Application from '@ember/application';
import Resolver from 'ember-resolver';
import config from './config.js';
import * as Router from './router.js';
import * as IndexRoute from './routes/index.js';
import * as ApplicationTemplate from './templates/application.gjs';
import * as DropdownTemplate from './templates/dropdown.gjs';
import * as Example1Template from './templates/example1.gjs';
import * as Example2Template from './templates/example2.gjs';
import * as Example3Template from './templates/example3.gjs';
import * as Example4Template from './templates/example4.gjs';
import * as Example5Template from './templates/example5.gjs';
import * as Example6Template from './templates/example6.gjs';
import * as Example7Template from './templates/example7.gjs';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  Resolver = Resolver.withModules({
    'demo/router': Router,
    'demo/routes/index': IndexRoute,
    'demo/templates/application': ApplicationTemplate,
    'demo/templates/dropdown': DropdownTemplate,
    'demo/templates/example1': Example1Template,
    'demo/templates/example2': Example2Template,
    'demo/templates/example3': Example3Template,
    'demo/templates/example4': Example4Template,
    'demo/templates/example5': Example5Template,
    'demo/templates/example6': Example6Template,
    'demo/templates/example7': Example7Template
  });
}
