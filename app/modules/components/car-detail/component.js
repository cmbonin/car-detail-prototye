import Em from 'ember';

 var CarDetailComponent = Em.Component.extend({
	classNames: ['car-detail'],

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

	// hasComments:  Em.computed.lte('content.comments', 1),

	// commentCount:  Em.computed('content.comments.length'),
	//
	actions: {
		// opens detail view of car listing
		openDetail: function() {
			// send action to controller
			this.sendAction('opener');
		}
	}
});

export default CarDetailComponent;