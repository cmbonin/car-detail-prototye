/**
 * Creates some random dummy data
 */

import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({

  name(i) { return `Person ${i}`; },
  make: function (){
    var makes = ['nissan', 'ford', 'subaru', 'holden', 'audi'];
    return makes[Math.floor(Math.random() * makes.length)];
  },
	model:  function (){
    var models = ['120Y', 'forester', 'outback', 'falcon'];
    return models[Math.floor(Math.random() * models.length)];
  },
	year: function (){
    var years = ['2015', '2010', '2000', '1995'];
    return years[Math.floor(Math.random() * 4 + 1)-1];
  },
	price: function (){
    return Math.floor(Math.random()*9000) + 10000;
  },
  phone: function(i) {
    return '(0' + i + ')' + faker.phone.phoneNumber();
  },
	email: function(i) {
    return 'person' + i + '@email.com';
  },
	comments: function() {
    var count = 2,
        comments = [];
      // don't give all comments
      if(!!Math.floor(Math.random() * 2)){
      // random generation of comments
        for (var i=0;i<count;i++){
          comments[i] = faker.lorem.sentences();
        }
        return comments;
      }
  }
});