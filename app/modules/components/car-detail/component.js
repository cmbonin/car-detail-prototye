import Em from 'ember';

 var CarDetailComponent = Em.Component.extend({
	classNames: ['car-detail'],

	didInsertElement: function(){
		// console.log(this.get('content'))
	},

	/**
	 * Format car price nicely
	 * @return String
	 */
	carPrice: function() {
		var price = this.get('content.price');

		if(price){
			// add comma to price
			price = Number(price).toLocaleString();
			return '%@1%@2'.fmt('$', price);
		}
	}.property('content.price'),

	// hasComments:  Ember.computed.lte('content.comments', 1),

	// commentCount:  Ember.computed('content.comments.length'),

});

export default CarDetailComponent;