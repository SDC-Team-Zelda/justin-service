/* eslint-disable func-style */
const faker = require('faker');
const fs = require('fs');

const writeRentals = fs.createWriteStream('test.csv');
writeRentals.write('id,price,max_guests,numReviews,avgStars,cleaning_fee,service_fee,occupancy_fee,availability\n', 'utf8');

function writeTenMillionRentals(writer, encoding, callback) {
  let i = 10;
  let id = 0;
  function write() {
    let ok = true;
    do {
      const randomDate = () => {
        const randomMonth = Math.floor(Math.random() * 8) + 4;
        const randomDay = Math.floor(Math.random() * 31) + 1;
        return new Date(2020, randomMonth, randomDay);
      };
      let availabilityArr = [];
      let randDate, dateString;
      for (let j = 0; j < Math.floor(Math.random() * 100); j++) {
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
      i--;
      id++;
      const price = faker.random.number({ min: 80, max: 200 });
      const max_guests = faker.random.number({ min: 2, max: 6 });
      const numReviews = faker.random.number(20);
      const avgStars = Math.round(((Math.random() * 2) + 3) * 100) / 100;
      const cleaning_fee = faker.random.number({ min: 50, max: 99 });
      const service_fee = faker.random.number({ min: 50, max: 99 });
      const occupancy_fee = faker.random.number({ min: 50, max: 99 });
      const availability = availabilityArr;
      const data = `${id}:${price}:${max_guests}:${numReviews}:${avgStars}:${cleaning_fee}:${service_fee}:${occupancy_fee}:${availability}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}
writeTenMillionRentals(writeRentals, 'utf-8', () => {
  writeRentals.end();
});