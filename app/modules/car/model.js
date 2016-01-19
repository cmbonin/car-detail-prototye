import DS from 'ember-data';

export default DS.Model.extend({
  make: DS.attr('string'),
	model: DS.attr('string'),
	year: DS.attr('string'),
	price: DS.attr('string'),
	email: DS.attr('string'),
	contact: DS.attr('string'),
	phone: DS.attr('string'),
	comments: DS.attr('string')
});
