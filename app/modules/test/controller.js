import Em from 'ember';

var TestController = Em.Controller.extend({

 	init: function (){
 		console.log(this.get('model'));
 	}

});

export default TestController;