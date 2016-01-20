import Em from 'ember';

var EmailEnquiryComponent = Em.Component.extend({
	classNames: ['email-enquiry'],

	// do all required fields have content?
	// set to true to begin with
	formIsInValid: false,


	// input properties
	inputProperties: function() {
		// create object with name & required status
		return {
			'name':  {
				required: true,
				value: ''
			},
			'email':  {
				required: true,
				value: ''
			},
			'enquiry':  {
				required: false,
				value: ''
			}
		};
	}.property(),

	nameProperties: Em.computed.alias('inputProperties.name'),

	emailProperties: Em.computed.alias('inputProperties.email'),

	enquiryProperties: Em.computed.alias('inputProperties.enquiry'),

	/**
	 * Checks if required fields have content
	 * @return Boolean Required fields are complete
	 */
	validateForm: function() {
		var props = this.get('inputProperties'),
				inValid = false,
				inputProperties,
				inputValue;

		// loops through the properties & check for required values
		for (var key in props) {
			// don't bother checking if form is already invalid
	    if (!inValid && props.hasOwnProperty(key)){
	    	inputProperties = props[key];
	    		// required field, check for content
	    	if(inputProperties && inputProperties.required) {
	    		// fecth the value
	    		inputValue = Em.get(inputProperties, 'value');
	    		if(inputValue === "") {
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
		submitter: function() {
			// check if required fields have content
			var inValid = this.validateForm(),
					modelData;

			if(!inValid){
				// create a nicely structured object
				modelData = {
					name: this.get('nameProperties.value'),
					email:  this.get('emailProperties.value'),
					enquiry: this.get('enquiryProperties.value')
				};

				this.sendAction('submit', modelData);
			} else {
		  	this.set('formIsInValid', true);
			}
		}
	}
});
export default EmailEnquiryComponent;