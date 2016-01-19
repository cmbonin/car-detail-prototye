
export default function() {
  this.get('/cars/:id');
  this.get('/cars');

//   //single data
// this.get('/cars/:id', function(db, request) {
//   let id = request.params.id;

//   return {
//     data: {
//       type: 'cars',
//       id: id,
//       attributes: db.posts.find(id)
//     }
//   };
// });

  // this.get('/tests', function() {
  //   return {
  //     data: [{
  //       type: 'tests',
  //       id: 1,
  //       attributes: {
  //         title: 'Grand Old Mansion',
  //         owner: 'Veruca Salt',
  //         city: 'San Francisco',
  //         type: 'Estate',
  //         bedrooms: 15,
  //         image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
  //       }
  //     }, {
  //       type: 'tests',
  //       id: 2,
  //       attributes: {
  //         title: 'Urban Living',
  //         owner: 'Mike Teavee',
  //         city: 'Seattle',
  //         type: 'Condo',
  //         bedrooms: 1,
  //         image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
  //       }
  //     }, {
  //       type: 'tests',
  //       id: 3,
  //       attributes: {
  //         title: 'Downtown Charm',
  //         owner: 'Violet Beauregarde',
  //         city: 'Portland',
  //         type: 'Apartment',
  //         bedrooms: 3,
  //         image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
  //       }
  //     }]
  //   }
  // });
}


/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
