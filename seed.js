const db = require('./models');

const cities = [
  {
    name: 'San Francisco',
    description: 'City by the Bay',
    image: 'https://qtxasset.com/2016-05/sanfrancisco1.jpg?d03luT2_JZoz7SlHPz83.SRgx2rFOaA5'
  },
  {
    name: 'New York',
    description: 'The Big Apple',
    image: 'https://pix10.agoda.net/geo/city/318/1_318_02.jpg?s=1920x822'
  },
  {
    name: 'Paris',
    description: 'City of Romance',
    image: 'https://www.riotgames.com/darkroom/1440/b2b587d91d3c5d2922953ac62fbb2cb8:dfd0d5c2d07f981fb8cda29623b5e54e/paris.jpg'
  },
  {
    name: 'London',
    description: 'Home of Big Ben',
    image: 'https://metro.co.uk/wp-content/uploads/2016/07/ad_212177409.jpg?quality=80&strip=all'
  },
];


// Delete All Cities
console.log('Deleting all cities...');

db.City.deleteMany({}, (err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  // result = {n: number-of-matching-results, ok: 0 or 1, deletedCount: number-of-records-deleted}
  console.log(`Successfully deleted ${result.deletedCount} cities.`);

  // Create New Cities
  console.log('Creating new cities...');

  db.City.create(cities, (err, newCities) => {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log(`Successfully created ${newCities.length} cities.`);
    process.exit();
  });
});