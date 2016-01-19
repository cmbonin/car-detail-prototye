import Ember from 'ember';

export default Ember.Route.extend({

	// find the car id & load the data from the store
  // model(param){
  // 	if(param && param.car_id){
  //     return this.store.findRecord('car', param.car_id);
  // 	}
  // }

  // fetch car data
   setupController: function(controller, model) {
    this._super.apply(this, arguments);
    this.store.findRecord('car', 1).then(function(result){
       controller.set('content', result);
    }, function(error) {
       // handle the errors
    });
  }
});
