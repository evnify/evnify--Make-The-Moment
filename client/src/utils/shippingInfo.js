const fs = require('fs');

const districtsJson = fs.readFileSync('districts.json', 'utf8');
const prices = JSON.parse(districtsJson);

module.exports = prices;
