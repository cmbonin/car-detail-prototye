import Ember from 'ember';

export default Ember.Route.extend({

	// model() {
 //    return this.store.findAll('tests');
 //  },

    model: function() {
        return this.store.findAll('test');
    }
});
