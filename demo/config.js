const ENV = {
  modulePrefix: 'demo',
  environment: import.meta.env.DEV ? 'development' : 'production',
  rootURL: '/',
  locationType: 'history',
  EmberENV: {
    EXTEND_PROTOTYPES: false,
    FEATURES: {
      // Here you can enable experimental features on an ember canary build
      // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
    }
  },
  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  }
};

export default ENV;
