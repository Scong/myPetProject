const faker = require('faker')
const {AnimalClassifications} = require("./constants")
const fs = require('fs');

const NUM_PETS = 1000
const NUM_OWNERS = 30
let owners = []
let animals = []

const genId = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

const fillOwners = () => {
  for( let i = 0; i < NUM_OWNERS; i++) {
    owners.push({
      id: genId(),
      firstName: faker.name.firstName(),
      jobTitle: faker.name.jobTitle(),
      lastName: faker.name.lastName()
    })
  }
}

const fillAnimals = () => {
  const ownerIds = owners.map(({id}) => id)
  for( let i = 0; i < NUM_PETS; i++) {
    animals.push({
      id: genId(),
      name: faker.name.firstName(),
      classification: faker.random.arrayElement(AnimalClassifications),
      age: faker.random.number({min: 0, max: 10}),
      owner_id: faker.random.arrayElement(ownerIds.concat([undefined, undefined, undefined]))
    })
  }
}

const createDataFiles = () => {
  fs.writeFile(__dirname + '/animals.json', JSON.stringify(animals, null, 2), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Animals saved!');
  })

  fs.writeFile(__dirname + '/owners.json', JSON.stringify(owners, null, 2), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Owners saved!');
  })
}

const seed = () => {
  fillOwners()
  fillAnimals()
  createDataFiles()
}

seed()







