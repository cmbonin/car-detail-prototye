"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('carsales/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTAdapter.extend({

		shouldReloadAll: function shouldReloadAll() {
			return true;
		},

		shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord() {
			return true;
		}

	});
});
define('carsales/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'carsales/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _carsalesConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _carsalesConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _carsalesConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default'],
    rootElement: '#carsales-app'
  });

  (0, _emberLoadInitializers['default'])(App, _carsalesConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('carsales/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'carsales/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _carsalesConfigEnvironment) {

  var name = _carsalesConfigEnvironment['default'].APP.name;
  var version = _carsalesConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('carsales/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('carsales/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('carsales/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('carsales/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('carsales/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'carsales/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _carsalesConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_carsalesConfigEnvironment['default'].APP.name, _carsalesConfigEnvironment['default'].APP.version)
  };
});
define('carsales/initializers/ember-cli-mirage', ['exports', 'ember-cli-mirage/utils/read-modules', 'carsales/config/environment', 'carsales/mirage/config', 'ember-cli-mirage/server'], function (exports, _emberCliMirageUtilsReadModules, _carsalesConfigEnvironment, _carsalesMirageConfig, _emberCliMirageServer) {
  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(application) {
      if (arguments.length > 1) {
        // Ember < 2.1
        var container = arguments[0],
            application = arguments[1];
      }
      var environment = _carsalesConfigEnvironment['default'].environment;

      if (_shouldUseMirage(environment, _carsalesConfigEnvironment['default']['ember-cli-mirage'])) {
        var modules = (0, _emberCliMirageUtilsReadModules['default'])(_carsalesConfigEnvironment['default'].modulePrefix);
        var options = _.assign(modules, { environment: environment, baseConfig: _carsalesMirageConfig['default'], testConfig: _carsalesMirageConfig.testConfig });

        new _emberCliMirageServer['default'](options);
      }
    }
  };

  function _shouldUseMirage(env, addonConfig) {
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
define('carsales/initializers/export-application-global', ['exports', 'ember', 'carsales/config/environment'], function (exports, _ember, _carsalesConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_carsalesConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _carsalesConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_carsalesConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('carsales/mirage/config', ['exports'], function (exports) {
  exports['default'] = function () {

    //  define routes here for mirage to generate dummy
    //  content in it's factories
    this.get('/cars/:id');
    this.get('/cars');
  };
});
define('carsales/mirage/factories/car', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage['default'].Factory.extend({

    name: function name(i) {
      return 'Person ' + i;
    },
    make: function make() {
      var makes = ['nissan', 'ford', 'subaru', 'holden', 'audi'];
      return makes[Math.floor(Math.random() * makes.length)];
    },
    model: function model() {
      var models = ['120Y', 'forester', 'outback', 'falcon'];
      return models[Math.floor(Math.random() * models.length)];
    },
    year: function year() {
      var years = ['2015', '2010', '2000', '1995'];
      return years[Math.floor(Math.random() * 4 + 1) - 1];
    },
    price: function price() {
      return Math.floor(Math.random() * 9000) + 10000;
    },
    phone: function phone(i) {
      return '(0' + i + ')' + _emberCliMirage.faker.phone.phoneNumber();
    },
    email: function email(i) {
      return 'person' + i + '@email.com';
    },
    comments: function comments() {
      var count = 2,
          comments = [];
      // don't give all comments
      if (!!Math.floor(Math.random() * 2)) {
        // random generation of comments
        for (var i = 0; i < count; i++) {
          comments[i] = _emberCliMirage.faker.lorem.sentences();
        }
        return comments;
      }
    }
  });
});
/**
 * Creates some random dummy data
 */
define('carsales/mirage/factories/contact', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage['default'].Factory.extend({
    // name: 'Pete',                         // strings
    // age: 20,                              // numbers
    // tall: true,                           // booleans

    // email: function(i) {                  // and functions
    //   return 'person' + i + '@test.com';
    // },

    // firstName: faker.name.firstName,       // using faker
    // lastName: faker.name.firstName,
    // zipCode: faker.address.zipCode
  });
});
/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
/*, {faker} */
define('carsales/mirage/scenarios/default', ['exports'], function (exports) {
	exports['default'] = function (server) {
		// this bit generates (x) car models
		server.createList('car', 10);
		server.loadFixtures();
	};
});
define("carsales/modules/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "carsales/modules/application/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "wrapper");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "id", "site-title");
        var el3 = dom.createTextNode("Car sales");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 3, 3);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('carsales/modules/car/model', ['exports', 'ember-data'], function (exports, _emberData) {
		exports['default'] = _emberData['default'].Model.extend({
				name: _emberData['default'].attr('string'),
				make: _emberData['default'].attr('string'),
				model: _emberData['default'].attr('string'),
				year: _emberData['default'].attr('string'),
				price: _emberData['default'].attr('string'),
				email: _emberData['default'].attr('string'),
				contact: _emberData['default'].attr('string'),
				phone: _emberData['default'].attr('string'),
				comments: _emberData['default'].attr(),
				enquiries: _emberData['default'].attr()
		});
});
define("carsales/modules/car/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 3
          }
        },
        "moduleName": "carsales/modules/car/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\ncar");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('carsales/modules/car-list/route', ['exports', 'ember'], function (exports, _ember) {
   exports['default'] = _ember['default'].Route.extend({

      // fetch car data
      setupController: function setupController(controller, model) {
         this._super.apply(this, arguments);
         this.store.findAll('car').then(function (result) {
            controller.set('content', result);
         }, function (error) {
            // handle the errors
         });
      }

   });
});
define("carsales/modules/car-list/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "carsales/modules/car-list/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "car-detail", [], ["content", ["subexpr", "@mut", [["get", "item", ["loc", [null, [3, 25], [3, 29]]]]], [], []]], ["loc", [null, [3, 4], [3, 31]]]]],
        locals: ["item"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "carsales/modules/car-list/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Car list");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [2, 8], [2, 13]]]]], [], 0, null, ["loc", [null, [2, 0], [4, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('carsales/modules/cars/controller', ['exports', 'ember'], function (exports, _ember) {

	var CarController = _ember['default'].Controller.extend({

		/**
   * Format car price nicely
   * @return String
   */
		carPrice: (function () {
			var price = this.get('model.price');

			if (price) {
				// add comma to price
				price = Number(price).toLocaleString();
				return '%@1%@2'.fmt('$', price);
			}
		}).property('model.price'),

		// comments: Em.computed.alias('model.comments'),
		// comments: Em.A([this.get('model.comments')]),
		comments: (function () {
			var comments;
			// create a nice ember array
			if (this.get('model.comments')) {
				comments = this.get('model.comments').toArray();
			} else {
				comments = _ember['default'].A([]);
			}
			return comments;
		}).property('model.comments'),

		commentCount: (function () {
			return this.get('comments.length');
		}).property('comments'),

		actions: {
			// add comment to store & updates page
			submitComment: function submitComment(comment) {
				var comments = this.get('comments'),
				    id = this.get('model.id');
				comments.pushObject(comment);
				this.store.findRecord('car', id).then(function (model) {
					model.set('comments', comments);
				});
			},

			/**
    * Handles enquiry submit
    *
    * - Storing email in car model.
    * - Just placeholder functionality for the test
    *
    * @return {[type]} [description]
    */
			submitEnquiry: function submitEnquiry(enquiry) {
				if (!enquiry) {
					return false;
				}

				var self = this,
				    enquiries = this.get('model.enquiries') || [],
				    id = this.get('model.id');

				enquiries.pushObject(enquiry);

				this.store.findRecord('car', id).then(function (model) {
					model.set('enquiries', enquiries);
					// go to thank you page
					self.transitionToRoute('thankyou');
				});
			}
		}

	});

	exports['default'] = CarController;
});
define("carsales/modules/cars/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 2
              },
              "end": {
                "line": 24,
                "column": 2
              }
            },
            "moduleName": "carsales/modules/cars/template.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    	");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "comment-detail", [], ["content", ["subexpr", "@mut", [["get", "item", ["loc", [null, [23, 30], [23, 34]]]]], [], []]], ["loc", [null, [23, 5], [23, 37]]]]],
          locals: ["item"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 27,
              "column": 0
            }
          },
          "moduleName": "carsales/modules/cars/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "comments");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "comment-count corner");
          var el3 = dom.createTextNode("Comment count: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["content", "commentCount", ["loc", [null, [21, 51], [21, 67]]]], ["block", "each", [["get", "comments", ["loc", [null, [22, 10], [22, 18]]]]], [], 0, null, ["loc", [null, [22, 2], [24, 11]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 32,
            "column": 40
          }
        },
        "moduleName": "carsales/modules/cars/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("span");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "right");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "detail");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "content");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "section");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h4");
        var el5 = dom.createTextNode("Car details");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			Price: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			Year: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "section");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h4");
        var el5 = dom.createTextNode("Contact details");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				Name: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				Email: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				Phone: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Add a new comment:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Ask a question");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(fragment, [4, 1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [3]);
        var morphs = new Array(11);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [0]), 0, 0);
        morphs[1] = dom.createMorphAt(element1, 2, 2);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createMorphAt(element3, 6, 6);
        morphs[5] = dom.createMorphAt(element4, 3, 3);
        morphs[6] = dom.createMorphAt(element4, 6, 6);
        morphs[7] = dom.createMorphAt(element4, 9, 9);
        morphs[8] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[9] = dom.createMorphAt(fragment, 9, 9, contextualElement);
        morphs[10] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "model.make", ["loc", [null, [1, 10], [1, 24]]]], ["content", "model.model", ["loc", [null, [1, 33], [1, 48]]]], ["inline", "link-to", ["Click here to return to the car list", "application"], [], ["loc", [null, [2, 19], [2, 84]]]], ["content", "carPrice", ["loc", [null, [7, 10], [7, 22]]]], ["content", "model.year", ["loc", [null, [8, 9], [8, 23]]]], ["content", "model.name", ["loc", [null, [12, 10], [12, 24]]]], ["content", "model.email", ["loc", [null, [13, 11], [13, 26]]]], ["content", "model.phone", ["loc", [null, [14, 11], [14, 26]]]], ["block", "if", ["comments"], [], 0, null, ["loc", [null, [19, 0], [27, 7]]]], ["inline", "add-comment", [], ["submit", "submitComment"], ["loc", [null, [29, 0], [29, 38]]]], ["inline", "email-enquiry", [], ["submit", "submitEnquiry"], ["loc", [null, [32, 0], [32, 40]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('carsales/modules/components/add-comment/component', ['exports', 'ember'], function (exports, _ember) {

	var AddCommentComponent = _ember['default'].Component.extend({
		classNames: ['add-comment'],
		newComment: '',

		refreshComment: function refreshComment() {
			this.set('newComment', '');
		},

		actions: {
			// sends comment to controller
			submitter: function submitter() {
				this.sendAction('submit', this.get('newComment'));
				this.refreshComment();
			}
		}
	});
	exports['default'] = AddCommentComponent;
});
define("carsales/modules/components/add-comment/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 46
          }
        },
        "moduleName": "carsales/modules/components/add-comment/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Submit");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createElementMorph(element0);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "textarea", [], ["value", ["subexpr", "@mut", [["get", "newComment", ["loc", [null, [1, 17], [1, 27]]]]], [], []], "cols", "80", "rows", "6"], ["loc", [null, [1, 0], [1, 48]]]], ["element", "action", ["submitter"], [], ["loc", [null, [2, 8], [2, 30]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('carsales/modules/components/car-detail/component', ['exports', 'ember'], function (exports, _ember) {

	var CarDetailComponent = _ember['default'].Component.extend({
		classNames: ['car-detail'],

		/**
   * Format car price nicely
   * @return String
   */
		carPrice: (function () {
			var price = this.get('content.price');

			if (price) {
				// add comma to price
				price = Number(price).toLocaleString();
				return '%@1%@2'.fmt('$', price);
			}
		}).property('content.price'),

		// hasComments:  Em.computed.lte('content.comments', 1),

		// commentCount:  Em.computed('content.comments.length'),
		//
		actions: {
			// opens detail view of car listing
			openDetail: function openDetail() {
				// send action to controller
				this.sendAction('opener');
			}
		}
	});

	exports['default'] = CarDetailComponent;
});
define("carsales/modules/components/car-detail/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "carsales/modules/components/car-detail/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          var el2 = dom.createElement("span");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(", ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]), 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          return morphs;
        },
        statements: [["content", "content.make", ["loc", [null, [4, 13], [4, 29]]]], ["content", "content.model", ["loc", [null, [4, 38], [4, 55]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "carsales/modules/components/car-detail/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "detail");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "strap");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "content");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "year corner");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "price");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["cars", ["get", "content.id", ["loc", [null, [3, 20], [3, 30]]]]], [], 0, null, ["loc", [null, [3, 2], [5, 14]]]], ["content", "content.year", ["loc", [null, [9, 3], [9, 19]]]], ["content", "carPrice", ["loc", [null, [12, 3], [12, 15]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('carsales/modules/components/comment-detail/component', ['exports', 'ember'], function (exports, _ember) {

  var CommentDetailComponent = _ember['default'].Component.extend({});
  exports['default'] = CommentDetailComponent;
});
define("carsales/modules/components/comment-detail/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 6
          }
        },
        "moduleName": "carsales/modules/components/comment-detail/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "detail");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "strap");
        var el3 = dom.createTextNode("\n		Comment\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "content");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]), 1, 1);
        return morphs;
      },
      statements: [["content", "content", ["loc", [null, [6, 2], [6, 13]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('carsales/modules/components/email-enquiry/component', ['exports', 'ember'], function (exports, _ember) {

	var EmailEnquiryComponent = _ember['default'].Component.extend({
		classNames: ['email-enquiry'],

		// do all required fields have content?
		// set to true to begin with
		formIsInValid: false,

		// input properties
		inputProperties: (function () {
			// create object with name & required status
			return {
				'name': {
					required: true,
					value: ''
				},
				'email': {
					required: true,
					value: ''
				},
				'enquiry': {
					required: false,
					value: ''
				}
			};
		}).property(),

		nameProperties: _ember['default'].computed.alias('inputProperties.name'),

		emailProperties: _ember['default'].computed.alias('inputProperties.email'),

		enquiryProperties: _ember['default'].computed.alias('inputProperties.enquiry'),

		/**
   * Checks if required fields have content
   * @return Boolean Required fields are complete
   */
		validateForm: function validateForm() {
			var props = this.get('inputProperties'),
			    inValid = false,
			    inputProperties,
			    inputValue;

			// loops through the properties & check for required values
			for (var key in props) {
				// don't bother checking if form is already invalid
				if (!inValid && props.hasOwnProperty(key)) {
					inputProperties = props[key];
					// required field, check for content
					if (inputProperties && inputProperties.required) {
						// fecth the value
						inputValue = _ember['default'].get(inputProperties, 'value');
						if (inputValue === "") {
							// empty, is not valid
							inValid = true;
						}
					}
				}
			}
			return inValid;
		},

		actions: {
			// sends comment to controller
			submitter: function submitter() {
				// check if required fields have content
				var inValid = this.validateForm(),
				    modelData;

				if (!inValid) {
					// create a nicely structured object
					modelData = {
						name: this.get('nameProperties.value'),
						email: this.get('emailProperties.value'),
						enquiry: this.get('enquiryProperties.value')
					};

					this.sendAction('submit', modelData);
				} else {
					this.set('formIsInValid', true);
				}
			}
		}
	});
	exports['default'] = EmailEnquiryComponent;
});
define("carsales/modules/components/email-enquiry/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "carsales/modules/components/email-enquiry/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert");
          var el2 = dom.createTextNode("Name and email are required fields");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 7
          }
        },
        "moduleName": "carsales/modules/components/email-enquiry/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("label");
        var el2 = dom.createTextNode("Enter name");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createTextNode("Enter email");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createTextNode(" Enter enquiry");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Submit");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [4]);
        var element2 = dom.childAt(fragment, [8]);
        var element3 = dom.childAt(fragment, [12]);
        var morphs = new Array(8);
        morphs[0] = dom.createAttrMorph(element0, 'for');
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createAttrMorph(element1, 'for');
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[4] = dom.createAttrMorph(element2, 'for');
        morphs[5] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[6] = dom.createElementMorph(element3);
        morphs[7] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "for", ["get", "userName", ["loc", [null, [1, 13], [1, 21]]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "nameProperties.value", ["loc", [null, [2, 14], [2, 34]]]]], [], []], "name", "userName"], ["loc", [null, [2, 0], [2, 52]]]], ["attribute", "for", ["get", "userEmail", ["loc", [null, [3, 13], [3, 22]]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "emailProperties.value", ["loc", [null, [4, 14], [4, 35]]]]], [], []], "name", "userEmail"], ["loc", [null, [4, 0], [4, 54]]]], ["attribute", "for", ["get", "userEnquiry", ["loc", [null, [5, 13], [5, 24]]]]], ["inline", "textarea", [], ["value", ["subexpr", "@mut", [["get", "enquiryProperties.value", ["loc", [null, [6, 17], [6, 40]]]]], [], []], "cols", "80", "rows", "6", "name", "userEnquiry"], ["loc", [null, [6, 0], [6, 80]]]], ["element", "action", ["submitter"], [], ["loc", [null, [7, 8], [7, 30]]]], ["block", "if", [["get", "formIsInValid", ["loc", [null, [9, 6], [9, 19]]]]], [], 0, null, ["loc", [null, [9, 0], [11, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("carsales/modules/thankyou/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 90
          }
        },
        "moduleName": "carsales/modules/thankyou/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Thank you");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\nThanks for completing an enquiry\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "right");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        return morphs;
      },
      statements: [["inline", "link-to", ["Click here to return to the car list", "application"], [], ["loc", [null, [5, 19], [5, 84]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('carsales/router', ['exports', 'ember', 'carsales/config/environment'], function (exports, _ember, _carsalesConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _carsalesConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('car-list', { path: '/' }, function () {});

    this.route('cars', { path: 'cars/:car_id' });
    this.route('thankyou');
  });

  exports['default'] = Router;
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('carsales/config/environment', ['ember'], function(Ember) {
  var prefix = 'carsales';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("carsales/app")["default"].create({"name":"carsales","version":"0.0.0+9b9ea276"});
}

/* jshint ignore:end */
//# sourceMappingURL=carsales.map