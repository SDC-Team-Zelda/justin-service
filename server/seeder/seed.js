/* eslint-disable func-style */
const faker = require('faker');
const fs = require('fs');

const writeRentals = fs.createWriteStream('rentals.csv'); // make sure to rename file when creating multiple
writeRentals.write('id,price,max_guests,numReviews,avgStars,cleaning_fee,service_fee,occupancy_fee,availability\n', 'utf8');

function writeTenMillionRentals(writer, encoding, callback) {
  // let i = 0; // switch to this to create first csv file
  let i = 10000000; // switch to this to create second csv file
  // let id = 0; // switch to this to create first csv file
  let id = 5000002; // switch to this to create second csv file
  function write() {
    let ok = true;
    do {
      const randomDate = () => {
        const randomMonth = Math.floor(Math.random() * 12);
        const randomDay = Math.floor(Math.random() * 31) + 1;
        return new Date(2020, randomMonth, randomDay);
      };

      let availabilityArr = [];

      let randDate, dateString;
      for (let j = 0; j < Math.floor(Math.random() * 150); j++) {
        randDate = randomDate();
        dateString = `${randDate.getMonth() + 1}/${randDate.getDate()}/${randDate.getFullYear()}`;

        if (!availabilityArr.includes(dateString)) {
          availabilityArr.push(dateString);
        } else {
          while (availabilityArr.includes(dateString)) {
            randDate = randomDate();
            dateString = `${randDate.getMonth() + 1}/${randDate.getDate()}/${randDate.getFullYear()}`;
          }
          availabilityArr.push(dateString);
        }
      }
      i -= 1;
      id += 1;
      const price = faker.random.number({ min: 80, max: 200 });
      const max_guests = faker.random.number({ min: 2, max: 6 });
      const numReviews = faker.random.number(20);
      const avgStars = Math.round(((Math.random() * 2) + 3) * 100) / 100;
      const cleaning_fee = faker.random.number({ min: 50, max: 99 });
      const service_fee = faker.random.number({ min: 50, max: 99 });
      const occupancy_fee = faker.random.number({ min: 50, max: 99 });
      const availability = availabilityArr;
      const data = `${id},${price},${max_guests},${numReviews},${avgStars},${cleaning_fee},${service_fee},${occupancy_fee},${availability}\n`;
      // if (i === 0) { // switch to this when creating first csv file
      if (i === 5000002) { // switch to this when creating second csv file
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    // } while (i > 0 && ok); // switch to this to create first csv file
    } while (i > 5000002 && ok); // switch to this to create second csv file
    // if (i > 0) { // switch to this to create first csv file
    if (i > 5000002) { // switch to this to create second csv file
      writer.once('drain', write);
    }
  }
  write();
}
writeTenMillionRentals(writeRentals, 'utf-8', () => {
  writeRentals.end();
});