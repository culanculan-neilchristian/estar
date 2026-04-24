import type { CollectionConfig } from 'payload';
import path from 'path';
import fs from 'fs';
import { CsvDataService } from '../services/csv-data-service';

export const DataUploads: CollectionConfig = {
  slug: 'data-uploads',
  labels: {
    singular: 'CSV Upload',
    plural: 'CSV Uploads',
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Upload the latest estar-data.csv file here to update the dashboard instantly.',
  },
  upload: {
    staticDir: '../public/media',
    mimeTypes: ['text/csv'],
    imageSizes: [],
    adminThumbnail: false,
  },
  fields: [],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Intercept exactly when the file is uploaded
        if (operation === 'create' && req.file?.data) {
          try {
            console.log('Intercepted CSV Upload in Payload hook. Overwriting src/data...');
            
            // Overwrite the primary service target file with the buffer payload gives us
            const targetPath = path.join(process.cwd(), 'src/data/estar-data.csv');
            fs.writeFileSync(targetPath, req.file.data);

            // Command the service to clear its parsed cache
            CsvDataService.clearCache();
            console.log('✅ CSV cache cleared successfully.');
          } catch (error) {
            console.error('❌ Error overwriting static CSV from Payload afterChange:', error);
          }
        }
        return doc;
      }
    ]
  }
};
