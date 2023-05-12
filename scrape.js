const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.basketballreference.com';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the data you need using Cheerio selectors
    // ...

    // Convert the data to JSON
    const data = {
      // ...
    };
    const json = JSON.stringify(data);

    // Save the JSON data to a file
    fs.writeFileSync('data.json', json);

    console.log('Scraping completed!');
  })
  .catch(error => {
    console.error(error);
  });
