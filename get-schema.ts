import { BigQuery } from '@google-cloud/bigquery';

async function checkSchema() {
  const bq = new BigQuery();

  try {
    const dataset = bq.dataset('aft3');

    console.log('--- Churches Table Schema ---');
    const [churchesTable] = await dataset.table('churches').getMetadata();
    console.log(JSON.stringify(churchesTable.schema.fields.map((f: any) => ({ name: f.name, type: f.type })), null, 2));

    console.log('\n--- New Believers Table Schema ---');
    const [newBelieversTable] = await dataset.table('new_believers').getMetadata();
    console.log(JSON.stringify(newBelieversTable.schema.fields.map((f: any) => ({ name: f.name, type: f.type })), null, 2));

  } catch (error) {
    console.error('Error fetching schema:', error);
  }
}

checkSchema();
