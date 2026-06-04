import type { CollectionConfig } from 'payload';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { CHURCH_CSV_FILE_PATH } from '../services/church-csv-file';
import { parseChurchCsv } from '../services/parse-church-csv';

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
    staticDir: 'uploads/data',
    disableLocalStorage: true,
    mimeTypes: ['text/csv', 'application/vnd.ms-excel', 'text/plain'],
    imageSizes: [],
    adminThumbnail: undefined,
  },
  fields: [
    {
      name: 'results',
      type: 'json',
      admin: {
        hidden: true, // Don't show the massive JSON in the admin UI
      },
    }
  ],
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if ((operation === 'create' || operation === 'update') && req.file && req.file.data) {
          console.log(`[CSV-PROCESS] Parsing ${req.file.name} into JSON...`);
          
          try {
            const csvString = req.file.data.toString('utf8');
            const churches = parseChurchCsv(csvString);
            data.results = churches;
            console.log(`[CSV-PROCESS] Successfully parsed ${churches.length} churches.`);

            try {
              await mkdir(path.dirname(CHURCH_CSV_FILE_PATH), { recursive: true });
              await writeFile(CHURCH_CSV_FILE_PATH, req.file.data);
              console.log(`[CSV-PROCESS] Wrote ${req.file.name} to ${CHURCH_CSV_FILE_PATH}`);
            } catch (writeError) {
              console.warn(`[CSV-PROCESS] Could not write CSV file to ${CHURCH_CSV_FILE_PATH}:`, writeError);
            }
          } catch (err) {
            console.error('[CSV-PROCESS] Error parsing CSV:', err);
          }

          // Cleanup old records
          try {
            const existing = await req.payload.find({
              collection: 'data-uploads',
              limit: 5,
            });
            if (existing.totalDocs > 0) {
              await Promise.all(existing.docs.map(doc => 
                req.payload.delete({ collection: 'data-uploads', id: doc.id })
              ));
            }
          } catch (e) {
            console.error('[CSV-PROCESS] Error cleaning up old records:', e);
          }
        }
      }
    ],
    afterChange: [
      async ({ operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Trigger Next.js to revalidate the frontend pages
          try {
            revalidatePath('/', 'layout');
            revalidatePath('/churches', 'page');
            console.log('[CSV-UPLOAD] Cache cleared and revalidated');
          } catch (e) {
            console.warn('[CSV-UPLOAD] Revalidation failed:', e);
          }
        }
      }
    ]
  }
};
