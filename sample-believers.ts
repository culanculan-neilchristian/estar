import { BigQuery } from '@google-cloud/bigquery';

async function sampleBelievers() {
  const bq = new BigQuery();

  try {
    const dataset = bq.dataset('aft3');
    const table = dataset.table('new_believers');
    const [rows] = await table.getRows({ maxResults: 3 });
    console.log(JSON.stringify(rows, null, 2));
  } catch (error) {
    console.error('Error fetching sample using getRows:', error);
  }
}

sampleBelievers();
