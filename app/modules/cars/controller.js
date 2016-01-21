
import Em from 'ember';

var CarController = Em.Controller.extend({



	/**
	 * Format car price nicely
	 * @return String
	 */
	carPrice: function() {
		var price = this.get('model.price');

		if(price){
			// add comma to price
			price = Number(price).toLocaleString();
			return '%@1%@2'.fmt('$', price);
		}
	}.property('model.price'),


	comments: function () {
		var comments;
		// create a nice ember array
		if(this.get('model.comments')){
			comments  = this.get('model.comments').toArray();
		} else {
			comments = Em.A([]);
		}
		return comments;
	}.property('model.comments'),

	commentCount:  function(){
		return this.get('comments.length');
	}.property('comments'),

	actions: {
		// add comment to store & updates page
		submitComment: function(comment) {
			var comments = this.get('comments'),
					id = this.get('model.id');
			comments.pushObject(comment);
			this.store.findRecord('car', id).then(function(model) {
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
		submitEnquiry: function(enquiry) {
			if (!enquiry) { return false;}

			var	self = this,
					enquiries = this.get('model.enquiries')||[],
					id = this.get('model.id');

			enquiries.pushObject(enquiry);

			this.store.findRecord('car', id).then(function(model) {
			  model.set('enquiries', enquiries);
			  // go to thank you page
			  self.transitionToRoute('thankyou');
			});
		}
	}

});

export default CarController;