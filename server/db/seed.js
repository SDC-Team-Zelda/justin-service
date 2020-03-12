const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Rental = require("./Rental.js");

mongoose.connect("mongodb://localhost:27017/airbnb", { useNewUrlParser: true, useUnifiedTopology: true });

// generate random date in 2020
const randomDate = () => {
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 31) + 1;
  return new Date(2020, randomMonth, randomDay);
};

let rental, availabilityArr;
for(let i = 0; i < 100; i++) {
  let availabilityArr = [];

  let date;
  for(let j = 0; j < 250; j++) {
    date = randomDate();
    if(!availabilityArr.includes(date)) {
      availabilityArr.push(date);
    } else {
      while(availabilityArr.includes(date)) {
        date = randomDate();
      }
      availabilityArr.push(date);
    }
  }

  rental = new Rental({
    // generate rental ids of 1-100
    _id: i + 1,
    // generate prices of 100-199
    price: Math.floor(Math.random() * 100) + 100 ,
    // generate max # of guests from 2-5
    max_guests: Math.floor(Math.random() * 4) + 2,
    reviews: {
      // generate number of reviews from 3-20
      numReviews: Math.floor(Math.random() * 18) + 3,
      // generate average stars from 3.00 - 5.00 (rounded to two decimal places)
      avgStars: Math.round(((Math.random() * 2) + 3) * 100) / 100
    },
    fees: {
      // generate fees from 50-99
      cleaning_fee: Math.floor(Math.random() * 50) + 50,
      service_fee: Math.floor(Math.random() * 50) + 50,
      occupancy_fee: Math.floor(Math.random() * 50) + 50
    },
    availability: availabilityArr
  });
  rental.save();
}



