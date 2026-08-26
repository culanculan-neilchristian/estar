import { BigQuery } from '@google-cloud/bigquery';

async function sampleBelievers() {
  const bq = new BigQuery();

  try {
    const query = `
      SELECT Q9, Q10
      FROM \`kaptrack.aft3.new_believers\` 
      WHERE Q9 IS NOT NULL OR Q10 IS NOT NULL
      LIMIT 5
    `;
    console.log('Fetching sample from new_believers for Q9 and Q10...');
    const [rows] = await bq.query(query);
    console.log(JSON.stringify(rows, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

sampleBelievers();
