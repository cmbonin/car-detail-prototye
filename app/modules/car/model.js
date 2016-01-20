import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  make: DS.attr('string'),
	model: DS.attr('string'),
	year: DS.attr('string'),
	price: DS.attr('string'),
	email: DS.attr('string'),
	contact: DS.attr('string'),
	phone: DS.attr('string'),
	comments: DS.attr(),
	enquiries: DS.attr()
});
