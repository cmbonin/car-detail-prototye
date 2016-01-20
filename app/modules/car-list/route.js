import Em from 'ember';

export default Em.Route.extend({

  	// fetch car data
   setupController: function(controller, model) {
    this._super.apply(this, arguments);
    this.store.findAll('car').then(function(result){
       controller.set('content', result);
    }, function(error) {
       // handle the errors
    });
  }


});
