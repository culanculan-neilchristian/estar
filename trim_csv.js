const fs = require('fs');
const Papa = require('papaparse');

const content = fs.readFileSync('src/data/estar-data.csv', 'utf8');

const parsed = Papa.parse(content, {
  header: true,
  skipEmptyLines: true,
});

const newData = [];
let otherCount = 0;

parsed.data.forEach(row => {
  const prov = (row['province'] || '').trim();
  
  // Keep all Nakhon Sawan rows (which are exactly the 124 we filtered earlier)
  if (prov.includes('นครสวรรค์')) {
    newData.push(row);
  } else {
    // Keep first 2000 rows of other provinces
    if (otherCount < 2000) {
      newData.push(row);
      otherCount++;
    }
  }
});

const newCsv = Papa.unparse(newData, {
  header: true,
});

fs.writeFileSync('src/data/estar-data.csv', newCsv);
console.log(`Saved CSV with ${newData.length} total rows (${newData.length - otherCount} for Nakhon Sawan, ${otherCount} other)`);
