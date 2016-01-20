import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('car-list', {path: '/'}, function () {
  });

  this.route('cars', {path: 'cars/:car_id'});
  this.route('thankyou');
});

export default Router;