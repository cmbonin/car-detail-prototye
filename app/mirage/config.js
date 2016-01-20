
export default function() {

  //  define routes here for mirage to generate dummy
  //  content in it's factories
  this.get('/cars/:id');
  this.get('/cars');
}
